import type Stripe from "stripe";
import { NextResponse } from "next/server";

import { getStripeClient, getStripeWebhookSecret } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function unixToIso(value?: number | null) {
  if (!value) return null;
  return new Date(value * 1000).toISOString();
}

export async function POST(request: Request) {
  const stripe = getStripeClient();
  const admin = createSupabaseAdminClient();

  try {
    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json({ ok: false, error: "Missing stripe-signature header" }, { status: 400 });
    }

    const rawBody = await request.text();
    const event = stripe.webhooks.constructEvent(rawBody, signature, getStripeWebhookSecret());

    if (event.type === "checkout.session.completed") {
      const checkout = event.data.object as Stripe.Checkout.Session;
      const subscriptionId = typeof checkout.subscription === "string" ? checkout.subscription : null;
      const customerId = typeof checkout.customer === "string" ? checkout.customer : null;
      const orgId = checkout.metadata?.org_id;

      if (subscriptionId && customerId && orgId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        await admin.from("subscriptions").upsert(
          {
            org_id: orgId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            plan_key: checkout.metadata?.tier ?? "starter",
            active_modules: (checkout.metadata?.modules ?? "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
            current_period_start: unixToIso(subscription.current_period_start),
            current_period_end: unixToIso(subscription.current_period_end),
            cancel_at_period_end: subscription.cancel_at_period_end,
            metadata: {
              builder_session_id: checkout.metadata?.builder_session_id ?? null,
              user_id: checkout.metadata?.user_id ?? null,
            },
          },
          { onConflict: "stripe_subscription_id" },
        );
      }
    }

    if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      let orgId: string | null = subscription.metadata?.org_id ?? null;

      if (!orgId) {
        const { data: existing } = await admin
          .from("subscriptions")
          .select("org_id")
          .eq("stripe_subscription_id", subscription.id)
          .maybeSingle<{ org_id: string }>();
        orgId = (existing?.org_id ?? null) as string | null;
      }

      if (!orgId) {
        return NextResponse.json({ ok: true, eventType: event.type, skipped: true }, { status: 200 });
      }

      await admin.from("subscriptions").upsert(
        {
          org_id: orgId,
          stripe_customer_id: String(subscription.customer),
          stripe_subscription_id: subscription.id,
          status: subscription.status,
          plan_key: subscription.metadata?.tier ?? "starter",
          active_modules: (subscription.metadata?.modules ?? "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          current_period_start: unixToIso(subscription.current_period_start),
          current_period_end: unixToIso(subscription.current_period_end),
          cancel_at_period_end: subscription.cancel_at_period_end,
          canceled_at: unixToIso(subscription.canceled_at),
          metadata: {
            builder_session_id: subscription.metadata?.builder_session_id ?? null,
            user_id: subscription.metadata?.user_id ?? null,
          },
        },
        { onConflict: "stripe_subscription_id" },
      );
    }

    return NextResponse.json({ ok: true, eventType: event.type }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

