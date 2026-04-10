import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { readTwilioForm, validateTwilioRequest, xml } from "@/lib/twilio/validate";

type CareRecipient = {
  id: string;
  full_name: string;
  phone: string;
  confirmation_keywords: string[];
  help_keywords: string[];
};

type CareCheckin = {
  id: string;
  recipient_id: string;
  status: string;
  metadata: Record<string, unknown> | null;
};

type CareIncident = {
  id: string;
  check_in_id: string;
  recipient_id: string;
  status: string;
  started_at: string;
  metadata: Record<string, unknown> | null;
};

type EscalationContact = {
  id: string;
  recipient_id: string;
  name: string;
  phone: string;
  can_acknowledge: boolean;
  is_active: boolean;
};

type ConsentStatus = "opted_in" | "opted_out" | "help_requested" | "pending";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, serviceRole);
}

function normalize(input: string) {
  return input.trim().toLowerCase();
}

function twiml(message: string) {
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, { headers: { "Content-Type": "text/xml" } });`, { headers: { "Content-Type": "text/xml" } });
}

function isKeywordMatch(input: string, keywords: string[]) {
  const normalized = normalize(input);
  return keywords.some((keyword) => normalized.includes(normalize(keyword)));
}

function parseAckCommand(input: string) {
  const trimmed = input.trim();
  const match = trimmed.match(/^ack(?:\s+([a-zA-Z0-9\-_]+))?$/i);

  if (!match) {
    return null;
  }

  return {
    incidentId: match[1] || "",
  };
}

function getSystemKeyword(input: string) {
  const normalized = normalize(input);

  if (["stop", "unsubscribe", "cancel", "end", "quit"].includes(normalized)) {
    return "stop";
  }

  if (["start", "unstop"].includes(normalized)) {
    return "start";
  }

  if (normalized === "help") {
    return "help";
  }

  return "";
}

async function upsertConsentLog(args: {
  supabase: ReturnType<typeof getSupabaseAdmin>;
  phone: string;
  status: ConsentStatus;
  consentText: string;
  source: "inbound_sms";
  channel?: "sms" | "voice" | "both";
  fullName?: string;
  email?: string;
  metadata?: Record<string, unknown>;
  userAgent?: string;
  formPath?: string;
  referrer?: string;
}) {
  const {
    supabase,
    phone,
    status,
    consentText,
    source,
    channel = "sms",
    fullName,
    email,
    metadata = {},
    userAgent,
    formPath,
    referrer,
  } = args;

  const existingQuery = await supabase
    .from("message_consent_logs")
    .select("id, metadata")
    .eq("phone_e164", phone)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingQuery.error) {
    throw existingQuery.error;
  }

  const payload = {
    phone_e164: phone,
    email: email || null,
    full_name: fullName || null,
    source,
    status,
    channel,
    consent_text: consentText,
    consent_version: "v1",
    consent_url: process.env.APP_URL ? process.env.APP_URL + "/beta" : null,
    user_agent: userAgent || null,
    form_path: formPath || "/api/twilio/sms/inbound",
    referrer: referrer || null,
    metadata,
    updated_at: new Date().toISOString(),
  };

  if (existingQuery.data?.id) {
    const updateResult = await supabase
      .from("message_consent_logs")
      .update(payload)
      .eq("id", existingQuery.data.id);

    if (updateResult.error) {
      throw updateResult.error;
    }

    return existingQuery.data.id as string;
  }

  const insertResult = await supabase
    .from("message_consent_logs")
    .insert({
      ...payload,
      created_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (insertResult.error) {
    throw insertResult.error;
  }

  return insertResult.data.id as string;
}

async function getLatestConsentStatus(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  phone: string
): Promise<ConsentStatus | null> {
  const query = await supabase
    .from("message_consent_logs")
    .select("status")
    .eq("phone_e164", phone)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (query.error) {
    throw query.error;
  }

  return (query.data?.status as ConsentStatus | undefined) || null;
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
    console.error("[twilio:sms:inbound:event:error]", error);
  }
}

async function acknowledgeIncidentFromContact(args: {
  supabase: ReturnType<typeof getSupabaseAdmin>;
  phone: string;
  bodyRaw: string;
  nowIso: string;
}) {
  const { supabase, phone, bodyRaw, nowIso } = args;

  const ack = parseAckCommand(bodyRaw);
  if (!ack) {
    return null;
  }

  const contactQuery = await supabase
    .from("care_escalation_contacts")
    .select("*")
    .eq("phone", phone)
    .eq("is_active", true)
    .maybeSingle();

  if (contactQuery.error) {
    throw contactQuery.error;
  }

  const contact = contactQuery.data as EscalationContact | null;

  if (!contact) {
    return twiml("LifeSignal could not find an active escalation contact for this number.");
  }

  if (!contact.can_acknowledge) {
    return twiml("This contact is not authorized to acknowledge LifeSignal incidents.");
  }

  let incidentQuery = supabase
    .from("care_incidents")
    .select("*")
    .eq("recipient_id", contact.recipient_id)
    .eq("status", "open")
    .order("started_at", { ascending: false })
    .limit(1);

  if (ack.incidentId) {
    incidentQuery = supabase
      .from("care_incidents")
      .select("*")
      .eq("id", ack.incidentId)
      .eq("recipient_id", contact.recipient_id)
      .eq("status", "open")
      .limit(1);
  }

  const incidentResult = await incidentQuery.maybeSingle();

  if (incidentResult.error) {
    throw incidentResult.error;
  }

  const incident = incidentResult.data as CareIncident | null;

  if (!incident) {
    return twiml(
      ack.incidentId
        ? "No open LifeSignal incident was found with that ID for this contact."
        : "No open LifeSignal incident was found to acknowledge."
    );
  }

  const updateIncident = await supabase
    .from("care_incidents")
    .update({
      status: "acknowledged",
      acknowledged_at: nowIso,
      acknowledged_by_contact_id: contact.id,
      updated_at: nowIso,
      metadata: {
        ...(incident.metadata || {}),
        acknowledged_via: "sms",
        acknowledged_phone: phone,
        acknowledged_message: bodyRaw,
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
    channel: "escalation_sms",
    metadata: {
      contact_id: contact.id,
      contact_name: contact.name,
      contact_phone: contact.phone,
      acknowledged_message: bodyRaw,
    },
  });

  const checkinQuery = await supabase
    .from("care_checkins")
    .select("id, recipient_id, status, metadata")
    .eq("id", incident.check_in_id)
    .maybeSingle();

  if (checkinQuery.error) {
    throw checkinQuery.error;
  }

  const checkin = checkinQuery.data as CareCheckin | null;

  if (checkin) {
    const updateCheckin = await supabase
      .from("care_checkins")
      .update({
        updated_at: nowIso,
        metadata: {
          ...(checkin.metadata || {}),
          escalation_acknowledged_at: nowIso,
          escalation_acknowledged_by_contact_id: contact.id,
          escalation_acknowledged_via: "sms",
        },
      })
      .eq("id", checkin.id);

    if (updateCheckin.error) {
      throw updateCheckin.error;
    }
  }

  return twiml("LifeSignal incident acknowledged.");
}

async function handleRecipientMessage(args: {
  supabase: ReturnType<typeof getSupabaseAdmin>;
  phone: string;
  bodyRaw: string;
  nowIso: string;
}) {
  const { supabase, phone, bodyRaw, nowIso } = args;

  const recipientQuery = await supabase
    .from("care_recipients")
    .select("*")
    .eq("phone", phone)
    .maybeSingle();

  if (recipientQuery.error) {
    throw recipientQuery.error;
  }

  const recipient = recipientQuery.data as CareRecipient | null;

  if (!recipient) {
    return twiml("You are not registered with LifeSignal.");
  }

  const latestConsentStatus = await getLatestConsentStatus(supabase, phone);
  if (latestConsentStatus === "opted_out") {
    return twiml("LifeSignal messaging is currently disabled for this number. Reply START to re-enable.");
  }

  const checkinQuery = await supabase
    .from("care_checkins")
    .select("*")
    .eq("recipient_id", recipient.id)
    .in("status", ["pending", "escalating"])
    .order("scheduled_for", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (checkinQuery.error) {
    throw checkinQuery.error;
  }

  const checkin = checkinQuery.data as CareCheckin | null;

  if (!checkin) {
    return twiml("No active check-in was found. You are all set.");
  }

  if (isKeywordMatch(bodyRaw, recipient.help_keywords || [])) {
    await upsertConsentLog({
      supabase,
      phone,
      status: "help_requested",
      consentText: bodyRaw,
      source: "inbound_sms",
      fullName: recipient.full_name,
      metadata: {
        reason: "recipient_help_requested",
        recipient_id: recipient.id,
        checkin_id: checkin.id,
      },
    });

    const updateCheckin = await supabase
      .from("care_checkins")
      .update({
        status: "help_requested",
        help_requested_at: nowIso,
        updated_at: nowIso,
      })
      .eq("id", checkin.id);

    if (updateCheckin.error) {
      throw updateCheckin.error;
    }

    const existingIncident = await supabase
      .from("care_incidents")
      .select("id")
      .eq("check_in_id", checkin.id)
      .limit(1)
      .maybeSingle();

    if (existingIncident.error) {
      throw existingIncident.error;
    }

    let incidentId = existingIncident.data?.id as string | undefined;

    if (!incidentId) {
      incidentId = crypto.randomUUID();

      const createIncident = await supabase.from("care_incidents").insert({
        id: incidentId,
        check_in_id: checkin.id,
        recipient_id: recipient.id,
        status: "open",
        started_at: nowIso,
        metadata: {
          source: "twilio.sms.inbound",
          reason: "recipient_help_requested",
        },
      });

      if (createIncident.error) {
        throw createIncident.error;
      }
    }

    await insertEvent(supabase, {
      type: "checkin_help_requested",
      check_in_id: checkin.id,
      recipient_id: recipient.id,
      incident_id: incidentId,
      occurred_at: nowIso,
      channel: "sms",
      metadata: {
        message: bodyRaw,
      },
    });

    return twiml("Help request received. LifeSignal is notifying your contacts now.");
  }

  if (isKeywordMatch(bodyRaw, recipient.confirmation_keywords || [])) {
    const updateCheckin = await supabase
      .from("care_checkins")
      .update({
        status: "confirmed",
        confirmed_at: nowIso,
        updated_at: nowIso,
      })
      .eq("id", checkin.id);

    if (updateCheckin.error) {
      throw updateCheckin.error;
    }

    await insertEvent(supabase, {
      type: "checkin_confirmed",
      check_in_id: checkin.id,
      recipient_id: recipient.id,
      occurred_at: nowIso,
      channel: "sms",
      metadata: {
        message: bodyRaw,
      },
    });

    return twiml("Thank you. Your LifeSignal check-in has been recorded.");
  }

  await insertEvent(supabase, {
    type: "checkin_ignored_message",
    check_in_id: checkin.id,
    recipient_id: recipient.id,
    occurred_at: nowIso,
    channel: "sms",
    metadata: {
      message: bodyRaw,
    },
  });

  return twiml("Reply YES to confirm you are okay, HELP for assistance, or ACK INCIDENT_ID if you are an escalation contact.");
}

export async function POST(req: NextRequest) {
  try {
    const data = await readTwilioForm(req);
    const valid = await validateTwilioRequest(req, data);

    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid Twilio signature" }, { status: 403 });
    }

    const phone = data.From || "";
    const bodyRaw = data.Body || "";
    const nowIso = new Date().toISOString();
    const userAgent = req.headers.get("user-agent") || "";
    const referrer = req.headers.get("referer") || "";
    const supabase = getSupabaseAdmin();

    console.log("[twilio:sms:inbound]", {
      from: phone,
      body: bodyRaw,
      messageSid: data.MessageSid || "",
      raw: data,
    });

    const systemKeyword = getSystemKeyword(bodyRaw);

    if (systemKeyword === "stop") {
      await upsertConsentLog({
        supabase,
        phone,
        status: "opted_out",
        consentText: bodyRaw,
        source: "inbound_sms",
        userAgent,
        referrer,
        metadata: {
          keyword: "stop",
          message_sid: data.MessageSid || "",
        },
      });

      return twiml("You have been unsubscribed from LifeSignal messages. Reply START to re-subscribe.");
    }

    if (systemKeyword === "start") {
      await upsertConsentLog({
        supabase,
        phone,
        status: "opted_in",
        consentText: bodyRaw,
        source: "inbound_sms",
        userAgent,
        referrer,
        metadata: {
          keyword: "start",
          message_sid: data.MessageSid || "",
        },
      });

      return twiml("LifeSignal messaging has been re-enabled. Reply YES when prompted to confirm your status.");
    }

    if (systemKeyword === "help") {
      const latestConsentStatus = await getLatestConsentStatus(supabase, phone);

      if (latestConsentStatus === "opted_out") {
        return twiml("LifeSignal messaging is disabled for this number. Reply START to re-enable.");
      }

      await upsertConsentLog({
        supabase,
        phone,
        status: "help_requested",
        consentText: bodyRaw,
        source: "inbound_sms",
        userAgent,
        referrer,
        metadata: {
          keyword: "help",
          message_sid: data.MessageSid || "",
        },
      });

      return twiml("LifeSignal support: reply YES to confirm you are okay, ACK INCIDENT_ID to acknowledge an incident, or email support@lifesignal.app.");
    }

    const latestConsentStatus = await getLatestConsentStatus(supabase, phone);
    if (latestConsentStatus === "opted_out") {
      return twiml("LifeSignal messaging is currently disabled for this number. Reply START to re-enable.");
    }

    const ackResponse = await acknowledgeIncidentFromContact({
      supabase,
      phone,
      bodyRaw,
      nowIso,
    });

    if (ackResponse) {
      return ackResponse;
    }

    const response = await handleRecipientMessage({
      supabase,
      phone,
      bodyRaw,
      nowIso,
    });

    return response;
  } catch (error) {
    console.error("[twilio:sms:inbound:error]", error);
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, { headers: { "Content-Type": "text/xml" } });`, { headers: { "Content-Type": "text/xml" } });
  }
}











