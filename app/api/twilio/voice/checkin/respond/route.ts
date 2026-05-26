import { NextRequest, NextResponse } from "next/server";
import { resolveCheckin } from "@/lib/lifesignal/resolve-checkin";

function xml(body: string) {
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function say(message: string) {
  return `<?xml version="1.0" encoding="UTF-8"?><Response><Say>${message}</Say></Response>`;
}

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryCheckinId = url.searchParams.get("checkinId") || "";
    const form = await req.formData();
    const digits = String(form.get("Digits") ?? "");
    const speech = String(form.get("SpeechResult") ?? "").toLowerCase();
    const callSid = String(form.get("CallSid") ?? "");
    const from = String(form.get("From") ?? "");

    let resolution: "safe" | "needs_help" | null = null;
    if (digits === "1" || speech.includes("ok") || speech.includes("safe")) resolution = "safe";
    if (digits === "2" || speech.includes("help") || speech.includes("emergency")) resolution = "needs_help";

    if (!queryCheckinId) return xml(say("We could not match this call to a check-in. Goodbye."));
    if (!resolution) return xml(say("Sorry, we could not understand your response. Goodbye."));

    await resolveCheckin({
      checkinId: queryCheckinId,
      resolution,
      source: "voice",
      providerSid: callSid || null,
      digits: digits || null,
      speechResult: speech || null,
      from: from || null,
    });

    return xml(
      say(
        resolution === "safe"
          ? "Thank you. Your LifeSignal check-in is marked safe. Goodbye."
          : "Thank you. We marked this as needing help and will notify your guardian. Goodbye.",
      ),
    );
  } catch {
    return xml(say("We could not process your response right now. Goodbye."));
  }
}
