import { NextResponse } from "next/server";
import { z } from "zod";

import { env } from "@/lib/env";
import { getStripeClient } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

const checkoutSchema = z.object({
  sessionId: z.string().uuid(),
});

export async function POST(request: Request) {
  try {
    const { sessionId } = checkoutSchema.parse(await request.json());
    const supabase = await createClient();
    const stripe = getStripeClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { data: membership, error: membershipError } = await supabase
      .from("organization_members")
      .select("org_id")
      .eq("user_id", user.id)
      .eq("status", "active")
      .limit(1)
      .maybeSingle<{ org_id: string }>();

    if (membershipError || !membership) {
      return NextResponse.json({ ok: false, error: "No active organization membership found" }, { status: 403 });
    }

    const { data: builderSession, error: builderError } = await supabase
      .from("builder_sessions")
      .select("id, org_id, assigned_tier, selected_modules, pricing_snapshot")
      .eq("id", sessionId)
      .eq("org_id", membership.org_id)
      .maybeSingle<{
        id: string;
        org_id: string;
        assigned_tier: string | null;
        selected_modules: string[] | null;
        pricing_snapshot: { monthly?: number } | null;
      }>();

    if (builderError || !builderSession) {
      return NextResponse.json({ ok: false, error: "Builder session not found" }, { status: 404 });
    }

    const monthlyAmount = Math.max(
      1,
      Math.round(Number(builderSession.pricing_snapshot?.monthly ?? 0)),
    );

    const orgId = builderSession.org_id;
    const modules = (builderSession.selected_modules ?? []).join(",");
    const tier = builderSession.assigned_tier ?? "starter";

    const checkout = await stripe.checkout.sessions.create({
      mode: "subscription",
      success_url: `${env.NEXT_PUBLIC_APP_URL}/billing?success=1`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/billing?cancel=1`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            recurring: { interval: "month" },
            product_data: {
              name: `ChurchOS ${tier} plan`,
              description: modules.length > 0 ? `Modules: ${modules}` : "Base subscription",
            },
            unit_amount: monthlyAmount * 100,
          },
          quantity: 1,
        },
      ],
      customer_email: user.email ?? undefined,
      metadata: {
        org_id: orgId,
        modules,
        tier,
        builder_session_id: builderSession.id,
        user_id: user.id,
      },
      subscription_data: {
        metadata: {
          org_id: orgId,
          modules,
          tier,
          builder_session_id: builderSession.id,
          user_id: user.id,
        },
      },
    });

    if (!checkout.url) {
      return NextResponse.json({ ok: false, error: "Failed to create checkout session" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, url: checkout.url, checkoutSessionId: checkout.id }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid request payload",
          issues: error.issues,
        },
        { status: 400 },
      );
    }

    const message = error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
