import { NextResponse } from "next/server";
import { DateTime } from "luxon";
import { env } from "@/lib/env";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendSms, getTwilioClient, getTwilioFromNumber } from "@/lib/twilio";

type Body = {
  seniorId?: string;
  channel?: "sms" | "voice" | "both";
};

export async function POST(req: Request) {
  // Must be logged in
  const sb = await supabaseServer();
  const {
    data: { user },
    error: userErr,
  } = await sb.auth.getUser();

  if (userErr || !user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as Body;
  const seniorId = String(body.seniorId || "");
  const channel = (body.channel || "both") as "sms" | "voice" | "both";

  if (!seniorId) {
    return NextResponse.json({ error: "Missing seniorId" }, { status: 400 });
  }

  // Load loved one and verify ownership (server-side, no guessing)
  const { data: s, error: sErr } = await supabaseAdmin
    .from("seniors")
    .select("*")
    .eq("id", seniorId)
    .maybeSingle();

  if (sErr || !s) {
    return NextResponse.json({ error: "Loved one not found" }, { status: 404 });
  }
  if (String(s.owner_user_id) !== String(user.id)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  if (!s.phone_e164) {
    return NextResponse.json({ error: "Loved one is missing phone number" }, { status: 400 });
  }

  if (!env.APP_BASE_URL) {
    return NextResponse.json({ error: "APP_BASE_URL is not set" }, { status: 500 });
  }

  const msgBody = "LifeSignal TEST: Reply YES if you're okay. (This is a test check-in)";

  // Create a checkin record (so the dashboard has a paper trail)
  const scheduledUtcIso = DateTime.utc().toISO()!;
  const { data: checkin, error: ciErr } = await supabaseAdmin
    .from("checkins")
    .insert({
      senior_id: s.id,
      scheduled_for: scheduledUtcIso,
      status: "pending",
    })
    .select("*")
    .single();

  if (ciErr || !checkin) {
    return NextResponse.json({ error: ciErr?.message || "Failed to create checkin" }, { status: 500 });
  }

  try {
    const TWILIO_FROM = getTwilioFromNumber();
    const twilioClient = getTwilioClient();

    let smsSid: string | null = null;
    let callSid: string | null = null;

    if (channel === "sms" || channel === "both") {
      const sms = await sendSms(s.phone_e164, msgBody);
      smsSid = sms.sid;

      await supabaseAdmin.from("checkin_attempts").insert({
        checkin_id: checkin.id,
        attempt_type: "sms",
        twilio_sid: sms.sid,
        status: "sent",
      });

      await supabaseAdmin.from("messages").insert({
        senior_id: s.id,
        direction: "out",
        from_e164: TWILIO_FROM,
        to_e164: s.phone_e164,
        body: msgBody,
        twilio_sid: sms.sid,
        raw_payload: { type: "test_checkin_sms" },
      });
    }

    if (channel === "voice" || channel === "both") {
      const call = await twilioClient.calls.create({
        from: TWILIO_FROM,
        to: s.phone_e164,
        url: `${env.APP_BASE_URL}/api/twilio/voice`,
        method: "POST",
      });
      callSid = call.sid;

      await supabaseAdmin.from("checkin_attempts").insert({
        checkin_id: checkin.id,
        attempt_type: "voice",
        twilio_sid: call.sid,
        status: "sent",
      });
    }

    await supabaseAdmin.from("audit_logs").insert({
      actor_user_id: user.id,
      senior_id: s.id,
      action: "test_checkin_sent",
      metadata: { checkin_id: checkin.id, channel, smsSid, callSid },
    });

    return NextResponse.json({ ok: true, checkinId: checkin.id, smsSid, callSid });
  } catch (e: any) {
    await supabaseAdmin.from("checkin_attempts").insert({
      checkin_id: checkin.id,
      attempt_type: "sms",
      status: "failed",
      error: e?.message ?? "unknown error",
    });

    return NextResponse.json(
      { error: e?.message ?? "send failed", checkinId: checkin.id },
      { status: 500 }
    );
  }
}
