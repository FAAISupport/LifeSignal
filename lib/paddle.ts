import "server-only";
import { createHmac, timingSafeEqual as nodeTimingSafeEqual } from "node:crypto";
import { env, requirePaddle } from "@/lib/env";

const API_BASE = "https://api.paddle.com";

export type PlanTier = "checkin" | "assurance" | "facility";
export type PlanCadence = "monthly" | "annual";

const priceMap: Record<`${PlanTier}_${PlanCadence}`, string | undefined> = {
  checkin_monthly: env.PADDLE_PRICE_CHECKIN_MONTHLY,
  checkin_annual: env.PADDLE_PRICE_CHECKIN_ANNUAL,
  assurance_monthly: env.PADDLE_PRICE_ASSURANCE_MONTHLY,
  assurance_annual: env.PADDLE_PRICE_ASSURANCE_ANNUAL,
  facility_monthly: env.PADDLE_PRICE_FACILITY_MONTHLY,
  facility_annual: env.PADDLE_PRICE_FACILITY_ANNUAL,
};

export function paddlePriceId(tier: PlanTier, cadence: PlanCadence) {
  const key = `${tier}_${cadence}` as const;
  const id = priceMap[key];
  if (!id) throw new Error(`Missing Paddle price id for ${key}`);
  return id;
}

export async function paddleCreateTransaction(args: {
  priceId: string;
  quantity?: number;
  customerEmail: string;
  customData: Record<string, any>;
}): Promise<{ id: string; raw: any }> {
  // Enforce required Paddle config at runtime
  requirePaddle();

  const res = await fetch(`${API_BASE}/transactions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.PADDLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [{ price_id: args.priceId, quantity: args.quantity ?? 1 }],
      collection_mode: "automatic",
      customer: { email: args.customerEmail },
      custom_data: args.customData,
    }),
  });

  const rawText = await res.text();

  if (!res.ok) {
    throw new Error(`Paddle create transaction failed: ${res.status} ${rawText}`);
  }

  const json = rawText ? JSON.parse(rawText) : {};

  // Normalize transaction id across response shapes
  const id =
    json?.data?.id ??
    json?.id ??
    json?.data?.transaction?.id ??
    json?.transaction?.id;

  if (!id || typeof id !== "string") {
    throw new Error("Paddle response missing transaction id");
  }

  return { id, raw: json };
}

export function timingSafeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return nodeTimingSafeEqual(ab, bb);
}

/**
 * Paddle signature verification (manual)
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
  const parts = signatureHeader.split(";").map((p) => p.trim());
  const tsPart = parts.find((p) => p.startsWith("ts="));
  const h1Part = parts.find((p) => p.startsWith("h1="));

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
  return ok ? { ok: true as const } : { ok: false as const, reason: "Signature mismatch" };
}
