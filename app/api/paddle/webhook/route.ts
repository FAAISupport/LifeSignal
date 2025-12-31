import { NextResponse } from "next/server";
import { verifyPaddleWebhookSignature } from "@/lib/paddle";
import { env } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function toStatus(paddleStatus: string) {
  const s = String(paddleStatus ?? "").toLowerCase();
  if (["active"].includes(s)) return "active";
  if (["trialing"].includes(s)) return "trialing";
  if (["past_due"].includes(s)) return "past_due";
  if (["paused"].includes(s)) return "paused";
  if (["canceled", "cancelled"].includes(s)) return "canceled";
  return "inactive";
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("paddle-signature");

  const verified = verifyPaddleWebhookSignature({
    rawBody,
    signatureHeader: signature,
    secret: env.PADDLE_WEBHOOK_SECRET
  });

  if (!verified.ok) {
    return NextResponse.json({ error: "Invalid signature", reason: verified.reason }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const eventType = event?.event_type;
  const data = event?.data;

  // Persist an audit log (best-effort)
  try {
    await supabaseAdmin.from("audit_logs").insert({
      actor: "paddle",
      action: eventType ?? "webhook",
      meta: event
    });
  } catch {}

  // Pull custom_data.user_id when present (transactions and many entities)
  const userId = data?.custom_data?.user_id ?? data?.custom_data?.userId ?? null;

  // Handle subscription lifecycle
  if (userId && String(eventType).startsWith("subscription.")) {
    const subId = data?.id; // sub_...
    const status = toStatus(data?.status);
    const cadence = data?.items?.[0]?.price?.billing_cycle?.interval ?? null; // depends on include config
    const paddleCustomerId = data?.customer_id ?? null;

    await supabaseAdmin
      .from("subscriptions")
      .upsert({
        user_id: userId,
        provider: "paddle",
        status,
        paddle_subscription_id: subId,
        paddle_customer_id: paddleCustomerId,
        current_period_end: data?.current_billing_period?.ends_at ?? null,
        plan_tier: data?.custom_data?.plan_tier ?? null,
        plan_cadence: data?.custom_data?.plan_cadence ?? null
      }, { onConflict: "user_id" });

    return NextResponse.json({ ok: true });
  }

  // Handle transaction completion (initial checkout)
  if (userId && eventType === "transaction.completed") {
    const transactionId = data?.id; // txn_...
    const status = "active";

    await supabaseAdmin
      .from("subscriptions")
      .upsert({
        user_id: userId,
        provider: "paddle",
        status,
        paddle_last_transaction_id: transactionId,
        plan_tier: data?.custom_data?.plan_tier ?? null,
        plan_cadence: data?.custom_data?.plan_cadence ?? null
      }, { onConflict: "user_id" });

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
