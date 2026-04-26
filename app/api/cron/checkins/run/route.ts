import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { placeLifeSignalCall, sendLifeSignalSms } from "@/lib/twilio/client";

type CareRecipient = {
  id: string;
  full_name: string;
  phone: string;
  timezone: string;
  preferred_channels: string[];
  confirmation_keywords: string[];
  help_keywords: string[];
  is_active: boolean;
  metadata: Record<string, unknown>;
};

type CareCheckin = {
  id: string;
  recipient_id: string;
  scheduled_for: string;
  window_start: string;
  window_end: string;
  channels: string[];
  attempts_made: number;
  max_attempts: number;
  retry_delay_minutes: number;
  escalation_delay_minutes: number;
  status: "pending" | "confirmed" | "missed" | "help_requested" | "escalating" | "resolved";
  confirmed_at: string | null;
  help_requested_at: string | null;
  last_attempt_at: string | null;
  escalation_started_at: string | null;
  metadata: Record<string, unknown>;
};

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, serviceRole);
}

function getBearerToken(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

function isVercelCronRequest(req: NextRequest) {
  const vercelCronHeader = req.headers.get("x-vercel-cron");
  return Boolean(vercelCronHeader);
}

function isAuthorized(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret) {
    const bearerToken = getBearerToken(req);
    if (bearerToken && bearerToken === cronSecret) {
      return true;
    }
  }

  if (isVercelCronRequest(req)) {
    return true;
  }

  if (!cronSecret && !isVercelCronRequest(req)) {
    throw new Error("Missing CRON_SECRET");
  }

  return false;
}

function minutesAgoIso(minutes: number) {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString();
}

function safeArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

function buildCheckinMessage(recipient: CareRecipient) {
  return [
    "LifeSignal Check-In:",
    "Hi " + recipient.full_name + ", are you okay?",
    "Reply YES to confirm or HELP for assistance.",
    "Reply STOP to unsubscribe."
  ].join(" ");
}

function buildRetryMessage(recipient: CareRecipient) {
  return [
    "LifeSignal Reminder:",
    "We have not heard from you yet, " + recipient.full_name + ".",
    "Reply YES to confirm you are okay or HELP for assistance.",
    "Reply STOP to unsubscribe."
  ].join(" ");
}

function shouldUseVoice(checkin: CareCheckin, recipient: CareRecipient) {
  const checkinChannels = safeArray(checkin.channels);
  const preferredChannels = safeArray(recipient.preferred_channels);

  return checkinChannels.includes("voice") && preferredChannels.includes("voice");
}

function shouldUseSms(checkin: CareCheckin, recipient: CareRecipient) {
  const checkinChannels = safeArray(checkin.channels);
  const preferredChannels = safeArray(recipient.preferred_channels);

  return checkinChannels.includes("sms") &&
    preferredChannels.includes("sms");
}

async function insertEvent(supabase: ReturnType<typeof getSupabaseAdmin>, values: {
  type: string;
  check_in_id: string;
  recipient_id: string;
  incident_id?: string;
  step_number?: number;
  channel?: string;
  occurred_at: string;
  metadata?: Record<string, unknown>;
}) {
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
    console.error("[cron:checkins:event:error]", error);
  }
}

async function ensureIncidentForEscalation(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  checkin: CareCheckin,
  occurredAt: string
) {
  const existing = await supabase
    .from("care_incidents")
    .select("id")
    .eq("check_in_id", checkin.id)
    .limit(1)
    .maybeSingle();

  if (existing.error) {
    throw existing.error;
  }

  if (existing.data?.id) {
    return existing.data.id as string;
  }

  const incidentId = crypto.randomUUID();

  const { error } = await supabase.from("care_incidents").insert({
    id: incidentId,
    check_in_id: checkin.id,
    recipient_id: checkin.recipient_id,
    status: "open",
    started_at: occurredAt,
    metadata: {
      source: "cron.checkins.run",
      reason: "missed_checkin_escalation",
    },
  });

  if (error) {
    throw error;
  }

  return incidentId;
}

export async function GET(req: NextRequest) {
  return POST(req);
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    const nowIso = new Date().toISOString();

    const dueQuery = await supabase
      .from("care_checkins")
      .select("*")
      .eq("status", "pending")
      .lte("window_start", nowIso)
      .lt("attempts_made", 3)
      .or("last_attempt_at.is.null,last_attempt_at.lte." + minutesAgoIso(10))
      .order("scheduled_for", { ascending: true })
      .limit(50);

    if (dueQuery.error) {
      throw dueQuery.error;
    }

    const dueCheckins = (dueQuery.data || []) as CareCheckin[];

    const recipientIds = Array.from(new Set(dueCheckins.map(item => item.recipient_id)));

    let recipientsById = new Map<string, CareRecipient>();

    if (recipientIds.length > 0) {
      const recipientsQuery = await supabase
        .from("care_recipients")
        .select("*")
        .in("id", recipientIds)
        .eq("is_active", true);

      if (recipientsQuery.error) {
        throw recipientsQuery.error;
      }

      recipientsById = new Map(
        ((recipientsQuery.data || []) as CareRecipient[]).map(recipient => [recipient.id, recipient])
      );
    }

    let smsSent = 0;
    let voiceCallsPlaced = 0;
    let escalationsStarted = 0;
    let skipped = 0;
    const processed: Array<Record<string, unknown>> = [];

    for (const checkin of dueCheckins) {
      const recipient = recipientsById.get(checkin.recipient_id);

      if (!recipient || !recipient.phone) {
        skipped += 1;
        processed.push({
          checkinId: checkin.id,
          recipientId: checkin.recipient_id,
          action: "skipped_missing_recipient",
        });
        continue;
      }

      const currentAttempts = Number(checkin.attempts_made || 0);
      const maxAttempts = Number(checkin.max_attempts || 3);
      const retryDelayMinutes = Number(checkin.retry_delay_minutes || 15);

      if (
        checkin.last_attempt_at &&
        new Date(checkin.last_attempt_at).getTime() > Date.now() - retryDelayMinutes * 60 * 1000
      ) {
        skipped += 1;
        processed.push({
          checkinId: checkin.id,
          recipientId: recipient.id,
          action: "skipped_retry_window",
        });
        continue;
      }

      const nextAttemptNumber = currentAttempts + 1;
      const useVoice = shouldUseVoice(checkin, recipient);
      const useSms = shouldUseSms(checkin, recipient);

      if (!useVoice && !useSms) {
        skipped += 1;
        processed.push({
          checkinId: checkin.id,
          recipientId: recipient.id,
          action: "skipped_no_eligible_channel",
        });
        continue;
      }

      let channelUsed = "sms";
      let providerSid = "";

      if (useVoice) {
        const call = await placeLifeSignalCall({
          to: recipient.phone,
        });

        channelUsed = "voice";
        providerSid = call.sid;
        voiceCallsPlaced += 1;
      } else {
        const message = nextAttemptNumber === 1
          ? buildCheckinMessage(recipient)
          : buildRetryMessage(recipient);

        const sms = await sendLifeSignalSms({
          to: recipient.phone,
          body: message,
        });

        channelUsed = "sms";
        providerSid = sms.sid;
        smsSent += 1;
      }

      const updateResult = await supabase
        .from("care_checkins")
        .update({
          attempts_made: nextAttemptNumber,
          last_attempt_at: nowIso,
          updated_at: nowIso,
          metadata: {
            ...(checkin.metadata || {}),
            last_outbound_channel: channelUsed,
            last_provider_sid: providerSid,
            last_cron_run_at: nowIso,
          },
        })
        .eq("id", checkin.id);

      if (updateResult.error) {
        throw updateResult.error;
      }

      await insertEvent(supabase, {
        type: nextAttemptNumber === 1 ? "checkin_sent" : "checkin_retry_sent",
        check_in_id: checkin.id,
        recipient_id: recipient.id,
        occurred_at: nowIso,
        channel: channelUsed,
        metadata: {
          attempt_number: nextAttemptNumber,
          provider_sid: providerSid,
        },
      });

      processed.push({
        checkinId: checkin.id,
        recipientId: recipient.id,
        action: channelUsed === "voice" ? "voice_call_placed" : "sms_sent",
        attemptNumber: nextAttemptNumber,
        providerSid,
      });

      const windowEndMs = new Date(checkin.window_end).getTime();
      const escalationAtMs =
        windowEndMs + Number(checkin.escalation_delay_minutes || 10) * 60 * 1000;

      if (nextAttemptNumber >= maxAttempts && Date.now() >= escalationAtMs) {
        const incidentId = await ensureIncidentForEscalation(supabase, checkin, nowIso);

        const escalationUpdate = await supabase
          .from("care_checkins")
          .update({
            status: "escalating",
            escalation_started_at: nowIso,
            updated_at: nowIso,
            metadata: {
              ...(checkin.metadata || {}),
              escalation_started_by: "cron.checkins.run",
              escalation_incident_id: incidentId,
            },
          })
          .eq("id", checkin.id)
          .is("escalation_started_at", null);

        if (escalationUpdate.error) {
          throw escalationUpdate.error;
        }

        await insertEvent(supabase, {
          type: "escalation_started",
          check_in_id: checkin.id,
          recipient_id: recipient.id,
          incident_id: incidentId,
          occurred_at: nowIso,
          metadata: {
            reason: "max_attempts_reached_after_window",
            attempts_made: nextAttemptNumber,
          },
        });

        escalationsStarted += 1;
      }
    }

    const stalePendingQuery = await supabase
      .from("care_checkins")
      .select("*")
      .eq("status", "pending")
      .is("escalation_started_at", null)
      .lt("window_end", nowIso)
      .limit(50);

    if (stalePendingQuery.error) {
      throw stalePendingQuery.error;
    }

    for (const raw of (stalePendingQuery.data || []) as CareCheckin[]) {
      const escalationAtMs =
        new Date(raw.window_end).getTime() + Number(raw.escalation_delay_minutes || 10) * 60 * 1000;

      if (Date.now() < escalationAtMs) {
        continue;
      }

      const incidentId = await ensureIncidentForEscalation(supabase, raw, nowIso);

      const escalationUpdate = await supabase
        .from("care_checkins")
        .update({
          status: "escalating",
          escalation_started_at: nowIso,
          updated_at: nowIso,
          metadata: {
            ...(raw.metadata || {}),
            escalation_started_by: "cron.checkins.run.stale",
            escalation_incident_id: incidentId,
          },
        })
        .eq("id", raw.id)
        .is("escalation_started_at", null);

      if (escalationUpdate.error) {
        throw escalationUpdate.error;
      }

      await insertEvent(supabase, {
        type: "escalation_started",
        check_in_id: raw.id,
        recipient_id: raw.recipient_id,
        incident_id: incidentId,
        occurred_at: nowIso,
        metadata: {
          reason: "window_elapsed_without_confirmation",
          attempts_made: raw.attempts_made,
        },
      });

      escalationsStarted += 1;
      processed.push({
        checkinId: raw.id,
        recipientId: raw.recipient_id,
        action: "escalation_started",
        incidentId,
      });
    }

    return NextResponse.json({
      ok: true,
      now: nowIso,
      totals: {
        dueFound: dueCheckins.length,
        smsSent,
        voiceCallsPlaced,
        escalationsStarted,
        skipped,
        processed: processed.length,
      },
      processed,
    });
  } catch (error) {
    console.error("[cron:checkins:run:error]", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
