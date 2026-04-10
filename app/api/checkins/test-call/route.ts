import { NextRequest, NextResponse } from "next/server";
import { placeLifeSignalCall } from "@/lib/twilio/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const phone = String(body.phone || "").trim();

    if (!phone) {
      return NextResponse.json({ ok: false, error: "Missing phone" }, { status: 400 });
    }

    const appUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;

    const result = await placeLifeSignalCall({
      to: phone,
      url: `${appUrl}/api/twilio/voice/checkin`,
      statusCallback: `${appUrl}/api/twilio/voice/status`,
    });

    return NextResponse.json({
      ok: true,
      sid: result.sid,
      status: result.status,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
