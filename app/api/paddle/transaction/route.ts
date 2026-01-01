import { NextResponse } from "next/server";
import { env, requirePaddle } from "@/lib/env";
import { supabaseServer } from "@/lib/supabase/server";
import { paddleCreateTransaction } from "@/lib/paddle";

/**
 * Paddle transaction creation endpoint
 * Creates a transaction ID for Paddle Checkout
 */
export const runtime = "nodejs";

export async function POST(req: Request) {
  // Ensure Paddle is configured
  try {
    requirePaddle();
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "Paddle not configured" },
      { status: 500 }
    );
  }

  const sb = await supabaseServer();
  const {
    data: { user },
    error: authError,
  } = await sb.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { tier, cadence } = body as {
    tier?: "checkin" | "assurance" | "facility";
    cadence?: "monthly" | "annual";
  };

  if (!tier || !cadence) {
    return NextResponse.json(
      { error: "Missing tier or cadence" },
      { status: 400 }
    );
  }

  // Resolve Paddle price ID
  const priceMap: Record<string, string | undefined> = {
    checkin_monthly: env.PADDLE_PRICE_CHECKIN_MONTHLY,
    checkin_annual: env.PADDLE_PRICE_CHECKIN_ANNUAL,
    assurance_monthly: env.PADDLE_PRICE_ASSURANCE_MONTHLY,
    assurance_annual: env.PADDLE_PRICE_ASSURANCE_ANNUAL,
    facility_monthly: env.PADDLE_PRICE_FACILITY_MONTHLY,
    facility_annual: env.PADDLE_PRICE_FACILITY_ANNUAL,
  };

  const priceKey = `${tier}_${cadence}`;
  const priceId = priceMap[priceKey];

  if (!priceId) {
    return NextResponse.json(
      { error: `Invalid price configuration for ${priceKey}` },
      { status: 500 }
    );
  }

  try {
    const tx = await paddleCreateTransaction({
      priceId,
      customerEmail: user.email ?? "",
      customData: {
        app: "lifesignal",
        user_id: user.id,
        tier,
        cadence,
      },
    });

    return NextResponse.json({
      transactionId: tx.id,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Failed to create Paddle transaction" },
      { status: 500 }
    );
  }
}
