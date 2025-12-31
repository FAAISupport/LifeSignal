import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "missing signature" }, { status: 400 });

  const raw = await req.text();

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const type = event.type;

  if (type === "checkout.session.completed") {
    const session = event.data.object as any;
    const customerId = session.customer as string;

    const customer = (await stripe.customers.retrieve(customerId)) as any;
    const userId = session.metadata?.supabase_user_id || customer?.metadata?.supabase_user_id;

    const planTier = session.metadata?.plan_tier ?? null;
    const planCadence = session.metadata?.plan_cadence ?? null;

    if (userId) {
      await supabaseAdmin.from("subscriptions").upsert({
        user_id: userId,
        stripe_customer_id: customerId,
        status: "active",
        plan_tier: planTier,
        plan_cadence: planCadence
      });
    }
  }

  if (type === "customer.subscription.updated" || type === "customer.subscription.deleted") {
    const sub = event.data.object as any;
    const customerId = sub.customer as string;

    const { data: row } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("stripe_customer_id", customerId)
      .maybeSingle();

    const planTier = sub.metadata?.plan_tier ?? row?.plan_tier ?? null;
    const planCadence = sub.metadata?.plan_cadence ?? row?.plan_cadence ?? null;

    if (row?.user_id) {
      await supabaseAdmin.from("subscriptions").upsert({
        user_id: row.user_id,
        stripe_customer_id: customerId,
        stripe_subscription_id: sub.id,
        status: sub.status,
        plan_tier: planTier,
        plan_cadence: planCadence,
        current_period_end: sub.current_period_end
          ? new Date(sub.current_period_end * 1000).toISOString()
          : null
      });
    }
  }

  return NextResponse.json({ received: true });
}
