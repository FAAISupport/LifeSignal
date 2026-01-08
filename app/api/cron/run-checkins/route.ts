import { NextResponse } from "next/server";
import { DateTime } from "luxon";
import { env, requireCronToken } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendSms, getTwilioClient, getTwilioFromNumber } from "@/lib/twilio";

function authCron(req: Request) {
  const token =
    req.headers.get("x-cron-token") ||
    new URL(req.url).searchParams.get("token") ||
    "";

  return token === requireCronToken();
}

async function subscriptionActive(ownerUserId: string) {
  const { data: sub } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("user_id", ownerUserId)
    .maybeSingle();

  if (!sub) return false;
  return ["active", "trialing"].includes(String(sub.status));
}

function computeScheduledForUtc(tz: string, hhmm: string) {
  const [hh, mm] = hhmm.split(":").map(Number);
  const nowLocal = DateTime.now().setZone(tz);
  const scheduledLocal = nowLocal.set({
    hour: hh,
    minute: mm,
    second: 0,
    millisecond: 0,
  });

  return {
    nowLocal,
    scheduledLocal,
    scheduledUtcIso: scheduledLocal.toUTC().toISO()!,
  };
}

function isDueWithinWindow(
  nowLocal: DateTime,
  scheduledLocal: DateTime,
  windowMinutes: number
) {
  const diff = nowLocal.diff(scheduledLocal, "minutes").minutes;
  return diff >= 0 && diff < windowMinutes;
}

export async function GET(req: Request) {
  if (!authCron(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data: seniors } = await supabaseAdmin
    .from("seniors")
    .select("*")
    .eq("enabled", true)
    .eq("messaging_enabled", true);

  const results: any[] = [];

  for (const s of seniors ?? []) {
    const allowed =
      s.beta_override || (await subscriptionActive(s.owner_user_id));
    if (!allowed) continue;

    const { nowLocal, scheduledLocal, scheduledUtcIso } =
      computeScheduledForUtc(s.timezone, s.checkin_time);

    // Runs every 5 minutes
    if (!isDueWithinWindow(nowLocal, scheduledLocal, 5)) continue;

    // Prevent duplicate check-ins for the same day
    const dayStartUtc = scheduledLocal.startOf("day").toUTC().toISO()!;
    const dayEndUtc = scheduledLocal.endOf("day").toUTC().toISO()!;

    const { data: existing } = await supabaseAdmin
      .from("checkins")
      .select("id")
      .eq("senior_id", s.id)
      .gte("scheduled_for", dayStartUtc)
      .lte("scheduled_for", dayEndUtc)
      .limit(1);

    if (existing && existing.length > 0) continue;

    const { data: checkin, error: ciErr } = await supabaseAdmin
      .from("checkins")
      .insert({
        senior_id: s.id,
        scheduled_for: scheduledUtcIso,
        status: "pending",
      })
      .select("*")
      .single();

    if (ciErr) {
      results.push({ senior: s.id, error: ciErr.message });
      continue;
    }

    const msgBody =
      "LifeSignal check-in: Reply YES if you're okay. Reply STOP to stop.";

    try {
      const TWILIO_FROM = getTwilioFromNumber();
      const twilioClient = getTwilioClient();

      if (s.channel_pref === "sms" || s.channel_pref === "both") {
        const sms = await sendSms(s.phone_e164, msgBody);

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
          raw_payload: { type: "checkin_sms" },
        });
      }

      if (s.channel_pref === "voice" || s.channel_pref === "both") {
        const call = await twilioClient.calls.create({
          from: TWILIO_FROM,
          to: s.phone_e164,
          url: `${env.APP_BASE_URL}/api/twilio/voice`,
          method: "POST",
        });

        await supabaseAdmin.from("checkin_attempts").insert({
          checkin_id: checkin.id,
          attempt_type: "voice",
          twilio_sid: call.sid,
          status: "sent",
        });
      }

      await supabaseAdmin.from("audit_logs").insert({
        actor_user_id: null,
        senior_id: s.id,
        action: "checkin_sent",
        metadata: {
          checkin_id: checkin.id,
          channel_pref: s.channel_pref,
        },
      });

      results.push({ senior: s.id, checkin: checkin.id, ok: true });
    } catch (e: any) {
      await supabaseAdmin.from("checkin_attempts").insert({
        checkin_id: checkin.id,
        attempt_type: "sms",
        status: "failed",
        error: e?.message ?? "unknown error",
      });

      results.push({
        senior: s.id,
        checkin: checkin.id,
        error: e?.message ?? "send failed",
      });
    }
  }

  return NextResponse.json({ ok: true, results });
}
