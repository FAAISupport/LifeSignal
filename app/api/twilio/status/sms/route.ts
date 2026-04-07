import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const payload = {
    messageSid: String(form.get("MessageSid") ?? ""),
    messageStatus: String(form.get("MessageStatus") ?? ""),
    to: String(form.get("To") ?? ""),
    errorCode: String(form.get("ErrorCode") ?? ""),
    errorMessage: String(form.get("ErrorMessage") ?? ""),
  };

  console.log("Twilio SMS status callback", payload);

  return NextResponse.json({ ok: true });
}
