import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { requireUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { priceIdFor, type PlanCadence, type PlanTier } from "@/lib/plans";

function parseTier(value: string | null): PlanTier {
  const v = (value ?? "checkin").toLowerCase();
  if (v === "checkin" || v === "assurance" || v === "facility") return v;
  return "checkin";
}

function parseCadence(value: string | null): PlanCadence {
  const v = (value ?? "monthly").toLowerCase();
  if (v === "annual" || v === "yearly") return "annual";
  return "monthly";
}

export async function GET(req: Request) {
  const user = await requireUser();
  const url = new URL(req.url);
  const tier = parseTier(url.searchParams.get("tier"));
  const cadence = parseCadence(url.searchParams.get("cadence"));

  const priceId = priceIdFor(tier, cadence);

  const { data: row } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  let customerId = row?.stripe_customer_id ?? null;

  if (!customerId) {
    const customer = await stripe.customers.create({ metadata: { supabase_user_id: user.id } });
    customerId = customer.id;
    await supabaseAdmin.from("subscriptions").upsert({
      user_id: user.id,
      stripe_customer_id: customerId,
      status: "inactive",
      plan_tier: tier,
      plan_cadence: cadence
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${env.APP_BASE_URL}/dashboard?billing=success`,
    cancel_url: `${env.APP_BASE_URL}/pricing?billing=cancel`,
    allow_promotion_codes: true,
    metadata: {
      supabase_user_id: user.id,
      plan_tier: tier,
      plan_cadence: cadence
    },
    subscription_data: {
      metadata: {
        supabase_user_id: user.id,
        plan_tier: tier,
        plan_cadence: cadence
      }
    }
  });

  return NextResponse.redirect(session.url!);
}
