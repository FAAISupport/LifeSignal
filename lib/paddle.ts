import { env } from "@/lib/env";
import { createHmac, timingSafeEqual as nodeTimingSafeEqual } from "node:crypto";

const API_BASE = "https://api.paddle.com";

export type PlanTier = "checkin" | "assurance" | "facility";
export type PlanCadence = "monthly" | "annual";

export function paddlePriceId(tier: PlanTier, cadence: PlanCadence) {
  const c = cadence === "annual" ? "ANNUAL" : "MONTHLY";
  const t = tier.toUpperCase();
  const key = `PADDLE_PRICE_${t}_${c}` as const;
  // @ts-expect-error - indexed env
  return env[key] as string;
}

export async function paddleCreateTransaction(args: {
  priceId: string;
  quantity?: number;
  customerEmail: string;
  customData: Record<string, any>;
}) {
  const res = await fetch(`${API_BASE}/transactions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.PADDLE_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      items: [{ price_id: args.priceId, quantity: args.quantity ?? 1 }],
      collection_mode: "automatic",
      customer: { email: args.customerEmail },
      custom_data: args.customData
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Paddle create transaction failed: ${res.status} ${text}`);
  }

  const json = await res.json();
  return json;
}

export function timingSafeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return nodeTimingSafeEqual(ab, bb);
}

/**
 * Paddle signature verification (manual)
 * https://developer.paddle.com/webhooks/signature-verification
 */
export function verifyPaddleWebhookSignature(args: {
  rawBody: string;
  signatureHeader: string | null;
  secret: string;
  toleranceSeconds?: number;
}) {
  const { rawBody, signatureHeader, secret } = args;
  const toleranceSeconds = args.toleranceSeconds ?? 300;

  if (!signatureHeader) return { ok: false, reason: "Missing Paddle-Signature header" };

  // Header format: "ts=1700000000;h1=abcdef..."
  const parts = signatureHeader.split(";").map(p => p.trim());
  const tsPart = parts.find(p => p.startsWith("ts="));
  const h1Part = parts.find(p => p.startsWith("h1="));

  if (!tsPart || !h1Part) return { ok: false, reason: "Malformed Paddle-Signature header" };

  const ts = tsPart.replace("ts=", "");
  const sig = h1Part.replace("h1=", "");

  const tsNum = Number(ts);
  if (!Number.isFinite(tsNum)) return { ok: false, reason: "Invalid timestamp" };

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - tsNum) > toleranceSeconds) {
    return { ok: false, reason: "Timestamp outside tolerance" };
  }

  const payload = `${ts}:${rawBody}`;

  const computed = createHmac("sha256", secret).update(payload).digest("hex");

  const ok = timingSafeEqual(computed, sig);
  return ok ? { ok: true } : { ok: false, reason: "Signature mismatch" };
}
