import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const payload = {
    messageSid: String(form.get("MessageSid") || ""),
    messageStatus: String(form.get("MessageStatus") || ""),
    to: String(form.get("To") || ""),
    from: String(form.get("From") || ""),
    errorCode: String(form.get("ErrorCode") || ""),
    errorMessage: String(form.get("ErrorMessage") || ""),
    raw: Object.fromEntries(Array.from(form.entries()).map(([k, v]) => [k, String(v)])),
  };

  console.log("TWILIO STATUS CALLBACK", payload);

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/twilio/status" });
}
