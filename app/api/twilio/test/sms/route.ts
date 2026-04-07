import { NextRequest, NextResponse } from "next/server";
import { requireBearerToken } from "@/lib/api/route-auth";
import { sendTestSms } from "@/lib/lifesignal/operations";

type SmsTestBody = {
  to?: string;
  phone?: string;
  body?: string;
};

export async function POST(req: NextRequest) {
  const auth = requireBearerToken(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = (await req.json()) as SmsTestBody;
    const to = body.to || body.phone;

    if (!to) {
      return NextResponse.json({ ok: false, error: "Missing phone number." }, { status: 400 });
    }

    const result = await sendTestSms({
      to,
      body: body.body,
    });

    return NextResponse.json({
      ok: true,
      message: "Test SMS queued successfully.",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Failed to queue test SMS." },
      { status: 500 }
    );
  }
}
