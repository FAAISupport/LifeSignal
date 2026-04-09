import { NextRequest, NextResponse } from "next/server";
import {
  getBaseUrl,
  getTestToNumber,
  getTwilioClient,
  getTwilioFromNumber,
} from "@/lib/twilio/client";
import { getSupabaseAdmin } from "@/lib/lifesignal/admin";

function isAuthorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET || "";
  const auth = req.headers.get("authorization") || "";
  return secret !== "" && auth === "Bearer " + secret;
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const person =
      typeof body.person === "string" && body.person.trim()
        ? body.person.trim()
        : "Judd";

    const client = getTwilioClient();
    const from = getTwilioFromNumber();
    const to = getTestToNumber();
    const baseUrl = getBaseUrl();
    const supabase = getSupabaseAdmin();

    const monitoredPersonId =
      typeof body.monitoredPersonId === "string" && body.monitoredPersonId.trim()
        ? body.monitoredPersonId.trim()
        : null;

    const scheduleId =
      typeof body.scheduleId === "string" && body.scheduleId.trim()
        ? body.scheduleId.trim()
        : null;

    const now = Date.now();
    const dedupeKey = "manual-test:" + String(now);

    const insertPayload = {
      monitored_person_id: monitoredPersonId,
      schedule_id: scheduleId,
      status: "pending",
      channel: "both",
      due_at: new Date(now).toISOString(),
      response_deadline_at: new Date(now + 30 * 60 * 1000).toISOString(),
      retry_after_at: new Date(now + 10 * 60 * 1000).toISOString(),
      escalate_after_at: new Date(now + 45 * 60 * 1000).toISOString(),
      dedupe_key: dedupeKey,
      metadata: {
        manual_test: true,
        person: person,
      },
    };

    const { data: checkin, error: checkinError } = await supabase
      .from("checkins")
      .insert(insertPayload)
      .select("id")
      .single();

    if (checkinError || !checkin) {
      return NextResponse.json(
        {
          ok: false,
          error: checkinError?.message || "Failed to create test check-in",
        },
        { status: 500 }
      );
    }

    const sms = await client.messages.create({
      from: from,
      to: to,
      body:
        "LifeSignal test check-in for " +
        person +
        ": Reply YES if you are okay, or HELP if you need assistance.",
      statusCallback:
        baseUrl +
        "/api/twilio/status/sms?checkinId=" +
        encodeURIComponent(checkin.id),
    });

    const call = await client.calls.create({
      from: from,
      to: to,
      url:
        baseUrl +
        "/api/twilio/voice/checkin?person=" +
        encodeURIComponent(person) +
        "&checkinId=" +
        encodeURIComponent(checkin.id),
      method: "POST",
      statusCallback:
        baseUrl +
        "/api/twilio/status/voice?checkinId=" +
        encodeURIComponent(checkin.id),
      statusCallbackMethod: "POST",
    });

    await supabase.from("checkin_attempts").insert([
      {
        checkin_id: checkin.id,
        attempt_number: 1,
        channel: "sms",
        provider: "twilio",
        provider_sid: sms.sid,
        status: "queued",
        sent_at: new Date().toISOString(),
      },
      {
        checkin_id: checkin.id,
        attempt_number: 1,
        channel: "voice",
        provider: "twilio",
        provider_sid: call.sid,
        status: "queued",
        sent_at: new Date().toISOString(),
      },
    ]);

    return NextResponse.json({
      ok: true,
      checkinId: checkin.id,
      smsSid: sms.sid,
      callSid: call.sid,
      to: to,
      person: person,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
