import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export const dynamic = "force-dynamic";

function getBaseUrl(req: NextRequest) {
  const explicit =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "";

  if (explicit) return explicit.replace(/\/$/, "");

  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  const proto = req.headers.get("x-forwarded-proto") || "http";

  return host ? `${proto}://${host}` : "";
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const expected =
      process.env.INTERNAL_API_TOKEN ||
      process.env.CRON_SECRET ||
      "";

    if (expected && authHeader !== `Bearer ${expected}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const to = String(body.to || "").trim();
    const messageBody = String(body.body || "").trim();
    const kind = String(body.kind || "general").trim();

    if (!to) {
      return NextResponse.json({ ok: false, error: "Missing to" }, { status: 400 });
    }

    if (!messageBody) {
      return NextResponse.json({ ok: false, error: "Missing body" }, { status: 400 });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
    const authToken = process.env.TWILIO_AUTH_TOKEN || "";
    const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID || "";
    const from = process.env.TWILIO_PHONE_NUMBER || "";

    if (!accountSid || !authToken) {
      return NextResponse.json({ ok: false, error: "Missing Twilio credentials" }, { status: 500 });
    }

    if (!messagingServiceSid && !from) {
      return NextResponse.json({ ok: false, error: "Missing TWILIO_MESSAGING_SERVICE_SID or TWILIO_PHONE_NUMBER" }, { status: 500 });
    }

    const client = twilio(accountSid, authToken);
    const baseUrl = getBaseUrl(req);
    const statusCallback =
      process.env.TWILIO_STATUS_CALLBACK_URL ||
      (baseUrl ? `${baseUrl}/api/twilio/status` : undefined);

    const message = await client.messages.create({
      to,
      body: messageBody,
      ...(messagingServiceSid ? { messagingServiceSid } : { from }),
      ...(statusCallback ? { statusCallback } : {}),
    });

    return NextResponse.json({
      ok: true,
      sid: message.sid,
      to: message.to,
      status: message.status,
      kind,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to send SMS",
      },
      { status: 500 }
    );
  }
}

