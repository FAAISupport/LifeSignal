import { NextResponse } from "next/server";
import { env, requirePaddle } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { verifyPaddleWebhookSignature } from "@/lib/paddle";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // Ensure Paddle is configured (includes webhook secret)
  try {
    requirePaddle();
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Paddle not configured" },
      { status: 500 }
    );
  }

  const rawBody = await req.text();
  const signature = req.headers.get("paddle-signature");

  if (!env.PADDLE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "PADDLE_WEBHOOK_SECRET is not set" },
      { status: 500 }
    );
  }

  const verified = verifyPaddleWebhookSignature({
    rawBody,
    signatureHeader: signature,
    secret: env.PADDLE_WEBHOOK_SECRET,
  });

  if (!verified.ok) {
    return NextResponse.json(
      { error: "invalid_signature", reason: (verified as any).reason },
      { status: 401 }
    );
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Paddle event types vary by config; we handle common ones safely
  const eventType =
    event?.event_type ?? event?.type ?? event?.data?.type ?? "unknown";

  const data = event?.data ?? event;

  // Attempt to extract user_id from custom_data
  const userId =
    data?.custom_data?.user_id ??
    data?.custom_data?.userId ??
    data?.customer?.custom_data?.user_id ??
    null;

  const tier = data?.custom_data?.tier ?? null;
  const cadence = data?.custom_data?.cadence ?? null;

  // Extract subscription / transaction identifiers
  const subscriptionId =
    data?.subscription_id ?? data?.subscription?.id ?? null;

  const transactionId =
    data?.id ?? data?.transaction_id ?? data?.transaction?.id ?? null;

  // Map paddle events to internal subscription statuses (conservative)
  let newStatus: string | null = null;

  const t = String(eventType).toLowerCase();

  if (t.includes("subscription") && (t.includes("canceled") || t.includes("cancelled"))) {
    newStatus = "canceled";
  } else if (t.includes("subscription") && (t.includes("activated") || t.includes("created"))) {
    newStatus = "active";
  } else if (t.includes("transaction") && t.includes("completed")) {
    newStatus = "active";
  }

  // If we can identify a user, update subscription state
  if (userId && newStatus) {
    await supabaseAdmin
      .from("subscriptions")
      .upsert(
        {
          user_id: userId,
          provider: "paddle",
          status: newStatus,
          paddle_subscription_id: subscriptionId,
          metadata: {
            last_event_type: eventType,
            transaction_id: transactionId,
            tier,
            cadence,
          },
        } as any,
        { onConflict: "user_id" }
      );
  }

  // Always log the event for audit/debug
  await supabaseAdmin.from("audit_logs").insert({
    actor_user_id: null,
    senior_id: null,
    action: "paddle_webhook",
    metadata: {
      event_type: eventType,
      user_id: userId,
      subscription_id: subscriptionId,
      transaction_id: transactionId,
      tier,
      cadence,
    },
  });

  return NextResponse.json({ ok: true });
}
