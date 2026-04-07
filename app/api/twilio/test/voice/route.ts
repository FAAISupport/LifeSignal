import { NextRequest, NextResponse } from "next/server";
import { requireBearerToken } from "@/lib/api/route-auth";
import { sendTestVoice } from "@/lib/lifesignal/operations";

type VoiceTestBody = {
  to?: string;
  phone?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  const auth = requireBearerToken(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = (await req.json()) as VoiceTestBody;
    const to = body.to || body.phone;

    if (!to) {
      return NextResponse.json({ ok: false, error: "Missing phone number." }, { status: 400 });
    }

    const result = await sendTestVoice({
      to,
      message: body.message,
    });

    return NextResponse.json({
      ok: true,
      message: "Test voice fallback triggered successfully.",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Failed to trigger test voice fallback." },
      { status: 500 }
    );
  }
}
