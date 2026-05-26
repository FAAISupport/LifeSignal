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

type CareRecipientRow = {
  id: string;
  full_name: string;
  phone: string;
};

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, serviceRole);
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/""/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/ ' /g, "&apos;");
}

function getAppUrl() {
  const appUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "";
  return appUrl.replace(/\/$/, "");
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

async function findRecipientName(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  recipientId: string
) {
  const query = await supabase
    .from("care_recipients")
    .select("id, full_name, phone")
    .eq("id", recipientId)
    .maybeSingle();

  if (query.error) {
    throw query.error;
  }

  const recipient = query.data as CareRecipientRow | null;
  return recipient?.full_name || "your contact";
}

function buildRecipientTwiml(args: {
  actionUrl: string;
  recipientName: string;
}) {
  const { actionUrl, recipientName } = args;

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, { headers: { "Content-Type": "text/xml" } });
}

function buildEscalationTwiml(args: {
  actionUrl: string;
  recipientName: string;
}) {
  const { actionUrl, recipientName } = args;

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, { headers: { "Content-Type": "text/xml" } });
}

function buildGenericTwiml(args: {
  actionUrl: string;
}) {
  const { actionUrl } = args;

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, { headers: { "Content-Type": "text/xml" } });
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
    const to = data.To || "";
    const from = data.From || "";

    console.log("[twilio:voice:incoming]", {
      callSid,
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

    const appUrl = getAppUrl();
    const baseActionUrl = appUrl
      ? appUrl + "/api/twilio/voice/status"
      : "/api/twilio/voice/status";

    if (!event) {
      return buildGenericTwiml({ actionUrl: baseActionUrl });
    }

    const recipientName = await findRecipientName(supabase, event.recipient_id);
    const isEscalation = event.channel === "escalation_voice" || event.type === "escalation_step_sent";

    if (isEscalation) {
      const actionUrl = baseActionUrl + "?mode=escalation";
      return buildEscalationTwiml({
          actionUrl,
          recipientName,
        });
    }

    const actionUrl = baseActionUrl + "?mode=recipient";
    return buildRecipientTwiml({
        actionUrl,
        recipientName,
      });
  } catch (error) {
    console.error("[twilio:voice:incoming:error]", error);
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, { headers: { "Content-Type": "text/xml" } });
  }
}





