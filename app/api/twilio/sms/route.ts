import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type SmsIntent = "confirm" | "help" | "stop" | "unknown";

type CareRecipient = {
  id: string;
  full_name: string;
  phone: string;
  confirmation_keywords?: string[] | null;
  help_keywords?: string[] | null;
  is_active?: boolean | null;
};

type CareCheckin = {
  id: string;
  recipient_id: string;
  status: string;
  metadata?: Record<string, unknown> | null;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

function getSupabase() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase env");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function xml(body: string, status = 200) {
  return new NextResponse(body, {
    status,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function twiml(message: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escapeXml(message)}</Message>
</Response>`;
}

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return value.startsWith("+") ? `+${digits}` : `+${digits}`;
}

function normalizeBody(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function parseIntent(body: string, recipient?: CareRecipient | null): SmsIntent {
  const normalized = normalizeBody(body);
  if (!normalized) return "unknown";

  const confirmTerms = new Set(
    (recipient?.confirmation_keywords?.length
      ? recipient.confirmation_keywords
      : ["yes", "ok", "okay", "1", "y", "safe"]
    ).map((x) => x.toLowerCase())
  );

  const helpTerms = new Set(
    (recipient?.help_keywords?.length
      ? recipient.help_keywords
      : ["help", "sos", "911", "emergency", "urgent"]
    ).map((x) => x.toLowerCase())
  );

  const stopTerms = new Set(["stop", "stopall", "unsubscribe", "cancel", "end", "quit"]);

  if (confirmTerms.has(normalized)) return "confirm";
  if (stopTerms.has(normalized)) return "stop";

  for (const term of helpTerms) {
    if (normalized.includes(term)) return "help";
  }

  if (["im ok", "i'm ok", "i am ok", "im okay", "i'm okay", "i am okay", "all good", "good"].includes(normalized)) {
    return "confirm";
  }

  return "unknown";
}

function buildIncidentId(checkInId: string) {
  return `incident_${checkInId}`;
}

async function getRecipientByPhone(phone: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("care_recipients")
    .select("id, full_name, phone, confirmation_keywords, help_keywords, is_active")
    .eq("phone", phone)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw error;
  return (data as CareRecipient | null) ?? null;
}

async function getLatestOpenCheckin(recipientId: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("care_checkins")
    .select("id, recipient_id, status, metadata")
    .eq("recipient_id", recipientId)
    .in("status", ["pending", "help_requested", "escalating"])
    .order("scheduled_for", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return (data as CareCheckin | null) ?? null;
}

async function insertCareEvent(args: {
  type:
    | "checkin_confirmed"
    | "checkin_help_requested"
    | "checkin_ignored_message"
    | "escalation_started";
  checkInId: string;
  recipientId: string;
  incidentId?: string | null;
  channel?: "sms" | "voice" | "escalation_sms" | "escalation_voice";
  metadata?: Record<string, unknown>;
}) {
  const supabase = getSupabase();

  const { error } = await supabase.from("care_events").insert({
    type: args.type,
    check_in_id: args.checkInId,
    recipient_id: args.recipientId,
    incident_id: args.incidentId ?? null,
    channel: args.channel ?? "sms",
    occurred_at: new Date().toISOString(),
    metadata: args.metadata ?? {},
  });

  if (error) throw error;
}

async function updateCheckinConfirmed(checkInId: string, body: string, messageSid: string) {
  const supabase = getSupabase();

  const { error } = await supabase
    .from("care_checkins")
    .update({
      status: "confirmed",
      confirmed_at: new Date().toISOString(),
      metadata: {
        inbound_response: body,
        inbound_message_sid: messageSid,
        inbound_channel: "sms",
      },
      updated_at: new Date().toISOString(),
    })
    .eq("id", checkInId);

  if (error) throw error;
}

async function updateCheckinHelpRequested(checkInId: string, body: string, messageSid: string) {
  const supabase = getSupabase();

  const { error } = await supabase
    .from("care_checkins")
    .update({
      status: "help_requested",
      help_requested_at: new Date().toISOString(),
      escalation_started_at: new Date().toISOString(),
      metadata: {
        inbound_response: body,
        inbound_message_sid: messageSid,
        inbound_channel: "sms",
      },
      updated_at: new Date().toISOString(),
    })
    .eq("id", checkInId);

  if (error) throw error;
}

async function ensureIncident(checkInId: string, recipientId: string, body: string) {
  const supabase = getSupabase();
  const incidentId = buildIncidentId(checkInId);

  const { data: existing, error: fetchError } = await supabase
    .from("care_incidents")
    .select("id")
    .eq("id", incidentId)
    .maybeSingle();

  if (fetchError) throw fetchError;

  if (existing?.id) return incidentId;

  const { error: insertError } = await supabase.from("care_incidents").insert({
    id: incidentId,
    check_in_id: checkInId,
    recipient_id: recipientId,
    status: "open",
    started_at: new Date().toISOString(),
    steps: [],
    metadata: {
      source: "inbound_sms",
      body,
    },
  });

  if (insertError) throw insertError;

  return incidentId;
}

async function insertConsentLog(args: {
  phone: string;
  fullName?: string | null;
  status: "opted_out" | "help_requested";
  body: string;
  req: NextRequest;
}) {
  const supabase = getSupabase();

  const { error } = await supabase.from("message_consent_logs").insert({
    phone_e164: args.phone,
    full_name: args.fullName ?? null,
    source: "inbound_sms",
    status: args.status,
    channel: "sms",
    consent_text: args.body,
    consent_version: "v1",
    form_path: "/api/twilio/sms",
    user_agent: args.req.headers.get("user-agent"),
    referrer: args.req.headers.get("referer"),
    metadata: {},
  });

  if (error) throw error;
}

async function handleInbound(req: NextRequest) {
  const form = await req.formData();

  const from = normalizePhone(String(form.get("From") || ""));
  const to = normalizePhone(String(form.get("To") || ""));
  const body = String(form.get("Body") || "");
  const normalizedBody = normalizeBody(body);
  const messageSid = String(form.get("MessageSid") || "");
  const accountSid = String(form.get("AccountSid") || "");

  if (!from) {
    return xml(twiml("LifeSignal received your message, but we could not identify the sender."), 400);
  }

  const recipient = await getRecipientByPhone(from);
  const intent = parseIntent(body, recipient);

  if (!recipient) {
    return xml(
      twiml("LifeSignal received your message, but this number is not enrolled. Reply HELP if this is urgent."),
      200
    );
  }

  const checkin = await getLatestOpenCheckin(recipient.id);

  if (!checkin) {
    if (intent === "stop") {
      await insertConsentLog({
        phone: from,
        fullName: recipient.full_name,
        status: "opted_out",
        body,
        req,
      });

      return xml(
        twiml("You have been unsubscribed from LifeSignal text messages. Reply START to re-subscribe."),
        200
      );
    }

    return xml(
      twiml("LifeSignal received your message, but there is no active check-in for this number right now."),
      200
    );
  }

  const baseMetadata = {
    from,
    to,
    body,
    normalizedBody,
    messageSid,
    accountSid,
  };

  if (intent === "confirm") {
    await updateCheckinConfirmed(checkin.id, body, messageSid);
    await insertCareEvent({
      type: "checkin_confirmed",
      checkInId: checkin.id,
      recipientId: recipient.id,
      channel: "sms",
      metadata: baseMetadata,
    });

    return xml(
      twiml(`Thank you, ${recipient.full_name}. Your LifeSignal check-in has been marked safe.`),
      200
    );
  }

  if (intent === "help") {
    await updateCheckinHelpRequested(checkin.id, body, messageSid);
    const incidentId = await ensureIncident(checkin.id, recipient.id, body);

    await insertCareEvent({
      type: "checkin_help_requested",
      checkInId: checkin.id,
      recipientId: recipient.id,
      incidentId,
      channel: "sms",
      metadata: baseMetadata,
    });

    await insertCareEvent({
      type: "escalation_started",
      checkInId: checkin.id,
      recipientId: recipient.id,
      incidentId,
      channel: "escalation_sms",
      metadata: baseMetadata,
    });

    await insertConsentLog({
      phone: from,
      fullName: recipient.full_name,
      status: "help_requested",
      body,
      req,
    });

    return xml(
      twiml("We received your request for help. LifeSignal is escalating now."),
      200
    );
  }

  if (intent === "stop") {
    await insertConsentLog({
      phone: from,
      fullName: recipient.full_name,
      status: "opted_out",
      body,
      req,
    });

    await insertCareEvent({
      type: "checkin_ignored_message",
      checkInId: checkin.id,
      recipientId: recipient.id,
      channel: "sms",
      metadata: {
        ...baseMetadata,
        reason: "stop_keyword_received",
      },
    });

    return xml(
      twiml("You have been unsubscribed from LifeSignal text messages. Reply START to re-subscribe."),
      200
    );
  }

  await insertCareEvent({
    type: "checkin_ignored_message",
    checkInId: checkin.id,
    recipientId: recipient.id,
    channel: "sms",
    metadata: {
      ...baseMetadata,
      reason: "unrecognized_inbound_reply",
    },
  });

  return xml(
    twiml("LifeSignal received your message. Reply YES if safe or HELP if you need assistance."),
    200
  );
}

export async function POST(req: NextRequest) {
  try {
    return await handleInbound(req);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Twilio inbound handler error:", message);

    return xml(
      twiml("LifeSignal received your message but hit an internal error. Please try again shortly."),
      500
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "/api/twilio/sms",
    purpose: "Twilio inbound SMS webhook for LifeSignal",
  });
}

