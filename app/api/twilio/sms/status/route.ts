import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { readTwilioForm, validateTwilioRequest } from "@/lib/twilio/validate";

type CareEventRow = {
  id: string;
  type: string;
  metadata: Record<string, unknown> | null;
  occurred_at: string;
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

function isFinalStatus(status: string) {
  return [
    "delivered",
    "undelivered",
    "failed",
    "sent",
    "read",
    "received"
  ].includes(normalizeStatus(status));
}

async function findMatchingEvent(args: {
  supabase: ReturnType<typeof getSupabaseAdmin>;
  providerSid: string;
  to: string;
  from: string;
}) {
  const { supabase, providerSid, to, from } = args;

  const directQuery = await supabase
    .from("care_events")
    .select("id, type, metadata, occurred_at")
    .or("type.eq.checkin_sent,type.eq.checkin_retry_sent,type.eq.escalation_step_sent")
    .order("occurred_at", { ascending: false })
    .limit(100);

  if (directQuery.error) {
    throw directQuery.error;
  }

  const rows = (directQuery.data || []) as CareEventRow[];

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

export async function POST(req: NextRequest) {
  try {
    const data = await readTwilioForm(req);
    const valid = await validateTwilioRequest(req, data);

    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid Twilio signature" }, { status: 403 });
    }

    const supabase = getSupabaseAdmin();

    const messageSid = data.MessageSid || "";
    const messageStatus = data.MessageStatus || "";
    const errorCode = data.ErrorCode || "";
    const errorMessage = data.ErrorMessage || "";
    const to = data.To || "";
    const from = data.From || "";
    const apiVersion = data.ApiVersion || "";
    const accountSid = data.AccountSid || "";
    const raw = data;

    console.log("[twilio:sms:status]", {
      messageSid,
      messageStatus,
      errorCode,
      errorMessage,
      to,
      from,
      raw,
    });

    const event = await findMatchingEvent({
      supabase,
      providerSid: messageSid,
      to,
      from,
    });

    if (!event) {
      return NextResponse.json({
        ok: true,
        matched: false,
        message: "No matching care_event found for this status callback.",
      });
    }

    const existingMetadata = event.metadata || {};
    const previousStatuses = Array.isArray(existingMetadata.twilio_status_history)
      ? existingMetadata.twilio_status_history
      : [];

    const statusEntry = {
      status: normalizeStatus(messageStatus),
      error_code: errorCode || null,
      error_message: errorMessage || null,
      at: new Date().toISOString(),
      raw: {
        MessageSid: messageSid,
        MessageStatus: messageStatus,
        To: to,
        From: from,
      },
    };

    const nextMetadata: Record<string, unknown> = {
      ...existingMetadata,
      provider_sid: messageSid || existingMetadata.provider_sid || "",
      to: to || existingMetadata.to || "",
      from: from || existingMetadata.from || "",
      twilio_account_sid: accountSid || existingMetadata.twilio_account_sid || "",
      twilio_api_version: apiVersion || existingMetadata.twilio_api_version || "",
      twilio_last_status: normalizeStatus(messageStatus),
      twilio_last_error_code: errorCode || null,
      twilio_last_error_message: errorMessage || null,
      twilio_last_status_at: new Date().toISOString(),
      twilio_status_history: [...previousStatuses, statusEntry],
    };

    if (isFinalStatus(messageStatus)) {
      nextMetadata.delivery_final = true;
      nextMetadata.delivery_final_status = normalizeStatus(messageStatus);
      nextMetadata.delivery_final_at = new Date().toISOString();
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

    return NextResponse.json({
      ok: true,
      matched: true,
      eventId: event.id,
      messageSid,
      messageStatus: normalizeStatus(messageStatus),
    });
  } catch (error) {
    console.error("[twilio:sms:status:error]", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to process status callback",
      },
      { status: 500 }
    );
  }
}
