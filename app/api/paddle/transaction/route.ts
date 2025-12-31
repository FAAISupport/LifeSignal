import { NextResponse } from "next/server";
import { getUserAndProfile } from "@/lib/auth";
import { paddleCreateTransaction, paddlePriceId, type PlanTier, type PlanCadence } from "@/lib/paddle";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  const { user } = await getUserAndProfile();

  const body = await req.json().catch(() => ({} as any));
  const tier = String(body?.tier ?? "checkin").toLowerCase() as PlanTier;
  const cadenceRaw = String(body?.cadence ?? "monthly").toLowerCase();
  const cadence = (cadenceRaw === "yearly" ? "annual" : cadenceRaw) as PlanCadence;

  const allowedTiers: PlanTier[] = ["checkin", "assurance", "facility"];
  const allowedCadences: PlanCadence[] = ["monthly", "annual"];

  if (!allowedTiers.includes(tier)) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }
  if (!allowedCadences.includes(cadence)) {
    return NextResponse.json({ error: "Invalid cadence" }, { status: 400 });
  }

  const priceId = paddlePriceId(tier, cadence);

  // attach metadata so webhooks can link back to our user and plan
  const tx = await paddleCreateTransaction({
    priceId,
    customerEmail: user.email ?? "",
    customData: {
      app: "lifesignal",
      user_id: user.id,
      plan_tier: tier,
      plan_cadence: cadence
    }
  });

  const transactionId = tx?.data?.id;
  if (!transactionId) {
    return NextResponse.json({ error: "Missing transaction id from Paddle" }, { status: 502 });
  }

  return NextResponse.json({
    transactionId,
    environment: env.NEXT_PUBLIC_PADDLE_ENV
  });
}
