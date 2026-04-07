import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const payload = {
    callSid: String(form.get("CallSid") ?? ""),
    callStatus: String(form.get("CallStatus") ?? ""),
    to: String(form.get("To") ?? ""),
    from: String(form.get("From") ?? ""),
    answeredBy: String(form.get("AnsweredBy") ?? ""),
    callDuration: String(form.get("CallDuration") ?? ""),
  };

  console.log("Twilio Voice status callback", payload);

  return NextResponse.json({ ok: true });
}
