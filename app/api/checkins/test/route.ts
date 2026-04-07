import { NextRequest, NextResponse } from "next/server";
import {
  getBaseUrl,
  getTestToNumber,
  getTwilioClient,
  getTwilioFromNumber,
} from "@/lib/twilio/client";

function isAuthorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET || "";
  const auth = req.headers.get("authorization") || "";
  return secret && auth === Bearer ;
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const person = typeof body.person === "string" && body.person.trim() ? body.person.trim() : "Judd";

    const client = getTwilioClient();
    const from = getTwilioFromNumber();
    const to = getTestToNumber();
    const baseUrl = getBaseUrl();

    const sms = await client.messages.create({
      from,
      to,
      body:
        LifeSignal test check-in for :  +
        Reply YES if you are okay, or HELP if you need assistance.,
      statusCallback: ${baseUrl}/api/twilio/status/sms,
    });

    const call = await client.calls.create({
      from,
      to,
      url: ${baseUrl}/api/twilio/voice/checkin?person=,
      method: "POST",
      statusCallback: ${baseUrl}/api/twilio/status/voice,
      statusCallbackMethod: "POST",
    });

    return NextResponse.json({
      ok: true,
      smsSid: sms.sid,
      callSid: call.sid,
      to,
      person,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
