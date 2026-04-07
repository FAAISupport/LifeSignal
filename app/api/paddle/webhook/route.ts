import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PADDLE_WEBHOOK_SECRET } from "@/lib/paddle/config";
import { verifyPaddleWebhookSignature } from "@/lib/paddle/verify-webhook";

type PaddleEvent = {
  event_id: string;
  event_type: string;
  occurred_at: string;
  data?: Record<string, unknown>;
};

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase admin env vars");
  }

  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("Paddle-Signature");

  if (!signature || !PADDLE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { ok: false, error: "Missing webhook signature or secret" },
      { status: 400 }
    );
  }

  const verified = verifyPaddleWebhookSignature(
    rawBody,
    signature,
    PADDLE_WEBHOOK_SECRET
  );

  if (!verified) {
    return NextResponse.json(
      { ok: false, error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  const payload = JSON.parse(rawBody) as PaddleEvent;
  const supabase = getSupabaseAdmin();

  const { error: eventError } = await supabase.from("billing_events").upsert(
    {
      event_id: payload.event_id,
      event_type: payload.event_type,
      occurred_at: payload.occurred_at,
      payload_json: payload,
      processed_at: new Date().toISOString(),
    },
    { onConflict: "event_id" }
  );

  if (eventError) {
    console.error("Failed to store billing event", eventError);
  }

  const entity = payload.data ?? {};
  const customerId =
    typeof entity.customer_id === "string"
      ? entity.customer_id
      : typeof (entity.customer as { id?: unknown } | undefined)?.id === "string"
      ? ((entity.customer as { id?: string }).id ?? null)
      : null;

  if (
    payload.event_type.startsWith("subscription.") &&
    typeof entity.id === "string"
  ) {
    const items =
      Array.isArray(entity.items) && entity.items.length > 0
        ? entity.items
        : [];

    const firstItem = items[0] as
      | {
          price?: {
            id?: string;
            product?: { id?: string; name?: string };
          };
        }
      | undefined;

    const { error: subscriptionError } = await supabase
      .from("subscriptions")
      .upsert(
        {
          paddle_subscription_id: entity.id,
          paddle_customer_id: customerId,
          status:
            typeof entity.status === "string" ? entity.status : "unknown",
          price_id:
            typeof firstItem?.price?.id === "string"
              ? firstItem.price.id
              : null,
          product_id:
            typeof firstItem?.price?.product?.id === "string"
              ? firstItem.price.product.id
              : null,
          product_name:
            typeof firstItem?.price?.product?.name === "string"
              ? firstItem.price.product.name
              : null,
          current_billing_period_starts_at:
            typeof (entity.current_billing_period as { starts_at?: unknown } | undefined)?.starts_at === "string"
              ? ((entity.current_billing_period as { starts_at?: string }).starts_at ?? null)
              : null,
          current_billing_period_ends_at:
            typeof (entity.current_billing_period as { ends_at?: unknown } | undefined)?.ends_at === "string"
              ? ((entity.current_billing_period as { ends_at?: string }).ends_at ?? null)
              : null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "paddle_subscription_id" }
      );

    if (subscriptionError) {
      console.error("Failed to upsert subscription", subscriptionError);
    }
  }

  if (customerId) {
    const email =
      typeof (entity.customer as { email?: unknown } | undefined)?.email === "string"
        ? ((entity.customer as { email?: string }).email ?? null)
        : typeof entity.email === "string"
        ? entity.email
        : null;

    const { error: customerError } = await supabase
      .from("billing_customers")
      .upsert(
        {
          paddle_customer_id: customerId,
          email,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "paddle_customer_id" }
      );

    if (customerError) {
      console.error("Failed to upsert billing customer", customerError);
    }
  }

  return NextResponse.json({ ok: true });
}

