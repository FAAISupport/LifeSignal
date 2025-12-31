import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase/admin";
import twilio from "twilio";

function buildTwiML(actionUrl: string) {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say({ voice: "alice" }, "Hello. This is your LifeSignal check in.");
  const gather = twiml.gather({ numDigits: 1, action: actionUrl, method: "POST", timeout: 8 });
  gather.say({ voice: "alice" }, "Press 1 if you are okay. Press 2 if you need help.");
  twiml.say({ voice: "alice" }, "We did not receive an input. Goodbye.");
  twiml.hangup();
  return twiml.toString();
}

export async function POST(req: Request) {
  const form = await req.formData();
  const from = String(form.get("From") ?? "");
  const callSid = String(form.get("CallSid") ?? "");
  const digits = String(form.get("Digits") ?? "");

  if (digits) {
    const { data: senior } = await supabaseAdmin.from("seniors").select("*").eq("phone_e164", from).maybeSingle();
    if (senior) {
      const { data: checkin } = await supabaseAdmin
        .from("checkins")
        .select("*")
        .eq("senior_id", senior.id)
        .eq("status", "pending")
        .order("scheduled_for", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (checkin) {
        const help = digits.trim() === "2";
        await supabaseAdmin.from("checkins").update({
          status: help ? "responded_help" : "responded_ok",
          responded_at: new Date().toISOString(),
          response_type: help ? "voice_2_help" : "voice_1_ok",
          channel: "voice"
        }).eq("id", checkin.id);

        await supabaseAdmin.from("checkin_attempts").insert({
          checkin_id: checkin.id,
          attempt_type: "voice",
          twilio_sid: callSid,
          status: "received"
        });

        await supabaseAdmin.from("audit_logs").insert({
          actor_user_id: null,
          senior_id: senior.id,
          action: help ? "checkin_responded_help" : "checkin_responded_ok",
          metadata: { via: "voice", digits, callSid }
        });
      }
    }

    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say({ voice: "alice" }, "Thank you. Goodbye.");
    twiml.hangup();
    return new NextResponse(twiml.toString(), { headers: { "Content-Type": "text/xml" } });
  }

  const actionUrl = `${env.APP_BASE_URL}/api/twilio/voice`;
  const xml = buildTwiML(actionUrl);
  return new NextResponse(xml, { headers: { "Content-Type": "text/xml" } });
}
