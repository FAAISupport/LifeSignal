import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { readTwilioForm, validateTwilioRequest, xml } from "@/lib/twilio/validate";

type CareEventRow = {
  id: string;
  type: string;
  check_in_id: string;
  recipient_id: string;
  incident_id?: string | null;
  channel?: string | null;
  metadata: Record<string, unknown> | null;
  occurred_at: string;
};

type CareIncidentRow = {
  id: string;
  check_in_id: string;
  recipient_id: string;
  status: string;
  metadata: Record<string, unknown> | null;
};

type CareCheckinRow = {
  id: string;
  recipient_id: string;
  status: string;
  metadata: Record<string, unknown> | null;
};

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, serviceRole);
}

function normalizeStatus(input: string) {
  return (input || "").trim().toLowerCase();
}

function isFinalCallStatus(status: string) {
  return [
    "completed",
    "busy",
    "failed",
    "no-answer",
    "canceled"
  ].includes(normalizeStatus(status));
}

async function insertEvent(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  values: {
    type: string;
    check_in_id: string;
    recipient_id: string;
    incident_id?: string;
    step_number?: number;
    channel?: string;
    occurred_at: string;
    metadata?: Record<string, unknown>;
  }
) {
  const payload: Record<string, unknown> = {
    type: values.type,
    check_in_id: values.check_in_id,
    recipient_id: values.recipient_id,
    occurred_at: values.occurred_at,
    metadata: values.metadata || {},
  };

  if (values.incident_id) payload.incident_id = values.incident_id;
  if (typeof values.step_number === "number") payload.step_number = values.step_number;
  if (values.channel) payload.channel = values.channel;

  const { error } = await supabase.from("care_events").insert(payload);

  if (error) {
    throw error;
  }
}

async function findMatchingEvent(args: {
  supabase: ReturnType<typeof getSupabaseAdmin>;
  providerSid: string;
  to: string;
  from: string;
}) {
  const { supabase, providerSid, to, from } = args;

  const query = await supabase
    .from("care_events")
    .select("id, type, check_in_id, recipient_id, incident_id, channel, metadata, occurred_at")
    .or("channel.eq.voice,channel.eq.escalation_voice")
    .order("occurred_at", { ascending: false })
    .limit(100);

  if (query.error) {
    throw query.error;
  }

  const rows = (query.data || []) as CareEventRow[];

  const bySid = rows.find((row) => {
    const metadata = row.metadata || {};
    return String(metadata.provider_sid || "") === providerSid;
  });

  if (bySid) {
    return bySid;
  }

  const byPhonePair = rows.find((row) => {
    const metadata = row.metadata || {};
    return (
      String(metadata.to || "") === to &&
      String(metadata.from || "") === from
    );
  });

  return byPhonePair || null;
}

async function ensureIncidentForHelpRequest(args: {
  supabase: ReturnType<typeof getSupabaseAdmin>;
  checkinId: string;
  recipientId: string;
  nowIso: string;
}) {
  const { supabase, checkinId, recipientId, nowIso } = args;

  const existing = await supabase
    .from("care_incidents")
    .select("id")
    .eq("check_in_id", checkinId)
    .limit(1)
    .maybeSingle();

  if (existing.error) {
    throw existing.error;
  }

  if (existing.data?.id) {
    return existing.data.id as string;
  }

  const incidentId = crypto.randomUUID();

  const createResult = await supabase.from("care_incidents").insert({
    id: incidentId,
    check_in_id: checkinId,
    recipient_id: recipientId,
    status: "open",
    started_at: nowIso,
    metadata: {
      source: "twilio.voice.status",
      reason: "recipient_help_requested",
    },
  });

  if (createResult.error) {
    throw createResult.error;
  }

  return incidentId;
}

async function handleRecipientDigits(args: {
  supabase: ReturnType<typeof getSupabaseAdmin>;
  event: CareEventRow;
  digits: string;
  callSid: string;
  nowIso: string;
}) {
  const { supabase, event, digits, callSid, nowIso } = args;

  const checkinQuery = await supabase
    .from("care_checkins")
    .select("id, recipient_id, status, metadata")
    .eq("id", event.check_in_id)
    .maybeSingle();

  if (checkinQuery.error) {
    throw checkinQuery.error;
  }

  const checkin = checkinQuery.data as CareCheckinRow | null;

  if (!checkin) {
    return null;
  }

  if (digits === "1") {
    const updateCheckin = await supabase
      .from("care_checkins")
      .update({
        status: "confirmed",
        confirmed_at: nowIso,
        updated_at: nowIso,
        metadata: {
          ...(checkin.metadata || {}),
          confirmed_via: "voice",
          confirmed_call_sid: callSid,
        },
      })
      .eq("id", checkin.id);

    if (updateCheckin.error) {
      throw updateCheckin.error;
    }

    await insertEvent(supabase, {
      type: "checkin_confirmed",
      check_in_id: checkin.id,
      recipient_id: checkin.recipient_id,
      occurred_at: nowIso,
      channel: "voice",
      metadata: {
        digits,
        provider_sid: callSid,
        source_event_id: event.id,
      },
    });

    return new Response(`return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, { headers: { "Content-Type": "text/xml" } });`, { headers: { "Content-Type": "text/xml" } });
  }

  if (digits === "2") {
    const incidentId = await ensureIncidentForHelpRequest({
      supabase,
      checkinId: checkin.id,
      recipientId: checkin.recipient_id,
      nowIso,
    });

    const updateCheckin = await supabase
      .from("care_checkins")
      .update({
        status: "help_requested",
        help_requested_at: nowIso,
        updated_at: nowIso,
        metadata: {
          ...(checkin.metadata || {}),
          help_requested_via: "voice",
          help_requested_call_sid: callSid,
          help_requested_incident_id: incidentId,
        },
      })
      .eq("id", checkin.id);

    if (updateCheckin.error) {
      throw updateCheckin.error;
    }

    await insertEvent(supabase, {
      type: "checkin_help_requested",
      check_in_id: checkin.id,
      recipient_id: checkin.recipient_id,
      incident_id: incidentId,
      occurred_at: nowIso,
      channel: "voice",
      metadata: {
        digits,
        provider_sid: callSid,
        source_event_id: event.id,
      },
    });

    return new Response(`return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, { headers: { "Content-Type": "text/xml" } });`, { headers: { "Content-Type": "text/xml" } });
  }

  return null;
}

async function acknowledgeIncidentFromVoiceDigits(args: {
  supabase: ReturnType<typeof getSupabaseAdmin>;
  event: CareEventRow;
  digits: string;
  callSid: string;
  nowIso: string;
}) {
  const { supabase, event, digits, callSid, nowIso } = args;
  const metadata = event.metadata || {};

  if (digits !== "2") {
    return null;
  }

  const incidentId = String(event.incident_id || metadata.incident_id || "");
  const contactId = String(metadata.contact_id || "");

  if (!incidentId || !contactId) {
    return null;
  }

  const incidentQuery = await supabase
    .from("care_incidents")
    .select("id, check_in_id, recipient_id, status, metadata")
    .eq("id", incidentId)
    .eq("status", "open")
    .maybeSingle();

  if (incidentQuery.error) {
    throw incidentQuery.error;
  }

  const incident = incidentQuery.data as CareIncidentRow | null;

  if (!incident) {
    return new Response(`return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, { headers: { "Content-Type": "text/xml" } });`, { headers: { "Content-Type": "text/xml" } });
  }

  const updateIncident = await supabase
    .from("care_incidents")
    .update({
      status: "acknowledged",
      acknowledged_at: nowIso,
      acknowledged_by_contact_id: contactId,
      updated_at: nowIso,
      metadata: {
        ...(incident.metadata || {}),
        acknowledged_via: "voice",
        acknowledged_call_sid: callSid,
        acknowledged_digits: digits,
      },
    })
    .eq("id", incident.id)
    .eq("status", "open");

  if (updateIncident.error) {
    throw updateIncident.error;
  }

  await insertEvent(supabase, {
    type: "escalation_acknowledged",
    check_in_id: incident.check_in_id,
    recipient_id: incident.recipient_id,
    incident_id: incident.id,
    occurred_at: nowIso,
    channel: "escalation_voice",
    metadata: {
      contact_id: contactId,
      provider_sid: callSid,
      digits,
      source_event_id: event.id,
    },
  });

  const existingCheckinMetadata =
    (await supabase.from("care_checkins").select("metadata").eq("id", incident.check_in_id).maybeSingle()).data?.metadata || {};

  const checkinUpdate = await supabase
    .from("care_checkins")
    .update({
      updated_at: nowIso,
      metadata: {
        ...(existingCheckinMetadata as Record<string, unknown>),
        escalation_acknowledged_at: nowIso,
        escalation_acknowledged_by_contact_id: contactId,
        escalation_acknowledged_via: "voice",
        escalation_acknowledged_call_sid: callSid,
      },
    })
    .eq("id", incident.check_in_id);

  if (checkinUpdate.error) {
    throw checkinUpdate.error;
  }

  return new Response(`return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, { headers: { "Content-Type": "text/xml" } });`, { headers: { "Content-Type": "text/xml" } });
}

export async function POST(req: NextRequest) {
  try {
    const data = await readTwilioForm(req);
    const valid = await validateTwilioRequest(req, data);

    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid Twilio signature" }, { status: 403 });
    }

    const supabase = getSupabaseAdmin();

    const callSid = data.CallSid || "";
    const callStatus = data.CallStatus || "";
    const callDuration = data.CallDuration || "";
    const to = data.To || "";
    const from = data.From || "";
    const digits = (data.Digits || "").trim();
    const answeredBy = data.AnsweredBy || "";
    const apiVersion = data.ApiVersion || "";
    const accountSid = data.AccountSid || "";
    const nowIso = new Date().toISOString();

    console.log("[twilio:voice:status]", {
      callSid,
      callStatus,
      callDuration,
      digits,
      answeredBy,
      to,
      from,
      raw: data,
    });

    const event = await findMatchingEvent({
      supabase,
      providerSid: callSid,
      to,
      from,
    });

    if (!event) {
      if (digits === "1") {
        return new Response(`return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, { headers: { "Content-Type": "text/xml" } });`, { headers: { "Content-Type": "text/xml" } });
      }

      if (digits === "2") {
        return new Response(`return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, { headers: { "Content-Type": "text/xml" } });`, { headers: { "Content-Type": "text/xml" } });
      }

      return NextResponse.json({
        ok: true,
        matched: false,
        message: "No matching care_event found for this voice callback.",
      });
    }

    const existingMetadata = event.metadata || {};
    const previousStatuses = Array.isArray(existingMetadata.twilio_voice_status_history)
      ? existingMetadata.twilio_voice_status_history
      : [];

    const statusEntry = {
      status: normalizeStatus(callStatus),
      duration: callDuration || null,
      digits: digits || null,
      answered_by: answeredBy || null,
      at: nowIso,
      raw: {
        CallSid: callSid,
        CallStatus: callStatus,
        CallDuration: callDuration,
        To: to,
        From: from,
      },
    };

    const nextMetadata: Record<string, unknown> = {
      ...existingMetadata,
      provider_sid: callSid || existingMetadata.provider_sid || "",
      to: to || existingMetadata.to || "",
      from: from || existingMetadata.from || "",
      twilio_account_sid: accountSid || existingMetadata.twilio_account_sid || "",
      twilio_api_version: apiVersion || existingMetadata.twilio_api_version || "",
      twilio_voice_last_status: normalizeStatus(callStatus),
      twilio_voice_last_duration: callDuration || null,
      twilio_voice_last_digits: digits || null,
      twilio_voice_answered_by: answeredBy || null,
      twilio_voice_last_status_at: nowIso,
      twilio_voice_status_history: [...previousStatuses, statusEntry],
    };

    if (isFinalCallStatus(callStatus)) {
      nextMetadata.voice_final = true;
      nextMetadata.voice_final_status = normalizeStatus(callStatus);
      nextMetadata.voice_final_at = nowIso;
    }

    const updateResult = await supabase
      .from("care_events")
      .update({
        metadata: nextMetadata,
      })
      .eq("id", event.id);

    if (updateResult.error) {
      throw updateResult.error;
    }

    const isEscalation = event.channel === "escalation_voice" || event.type === "escalation_step_sent";

    if (digits) {
      if (isEscalation) {
        const escalationResponse = await acknowledgeIncidentFromVoiceDigits({
          supabase,
          event,
          digits,
          callSid,
          nowIso,
        });

        if (escalationResponse) {
          return escalationResponse;
        }
      } else {
        const recipientResponse = await handleRecipientDigits({
          supabase,
          event,
          digits,
          callSid,
          nowIso,
        });

        if (recipientResponse) {
          return recipientResponse;
        }
      }
    }

    return NextResponse.json({
      ok: true,
      matched: true,
      eventId: event.id,
      callSid,
      callStatus: normalizeStatus(callStatus),
      digits: digits || null,
    });
  } catch (error) {
    console.error("[twilio:voice:status:error]", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to process voice callback",
      },
      { status: 500 }
    );
  }
}









