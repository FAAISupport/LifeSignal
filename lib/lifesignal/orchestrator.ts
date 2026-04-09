import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createTwilioClient, getTwilioFromNumber } from "@/lib/twilio/server";

type CareRecipientRow = {
  id: string;
  full_name: string;
  phone: string;
  timezone: string;
  preferred_channels: Array<"sms" | "voice">;
  confirmation_keywords: string[];
  help_keywords: string[];
  quiet_hours_start: string | null;
  quiet_hours_end: string | null;
  is_active: boolean;
  metadata: Record<string, unknown>;
};

type CareCheckinRow = {
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
  created_at: string;
  updated_at: string;
};

type EscalationContactRow = {
  id: string;
  recipient_id: string;
  name: string;
  phone: string;
  role: string;
  priority: number;
  can_acknowledge: boolean;
  is_active: boolean;
  metadata: Record<string, unknown>;
};

type CareIncidentRow = {
  id: string;
  check_in_id: string;
  recipient_id: string;
  status: "open" | "acknowledged" | "resolved";
  started_at: string;
  acknowledged_at: string | null;
  acknowledged_by_contact_id: string | null;
  steps: unknown[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

type RunOptions = {
  now?: Date;
  limit?: number;
};

type RunStats = {
  dueCheckinsScanned: number;
  checkinsSent: number;
  retriesSent: number;
  escalationsStarted: number;
  escalationStepsSent: number;
  incidentsOpened: number;
  errors: string[];
};

function isoNow(input?: Date) {
  return (input ?? new Date()).toISOString();
}

function addMinutes(dateLike: string | Date, minutes: number) {
  const base = typeof dateLike === "string" ? new Date(dateLike) : new Date(dateLike);
  return new Date(base.getTime() + minutes * 60 * 1000);
}

function isPast(dateLike: string | Date, now: Date) {
  const value = typeof dateLike === "string" ? new Date(dateLike) : dateLike;
  return value.getTime() <= now.getTime();
}

function normalizePhone(phone: string) {
  return phone.trim();
}

function pickChannel(checkin: CareCheckinRow, recipient: CareRecipientRow, attemptNumber: number): "sms" | "voice" {
  const allowedByCheckin = (checkin.channels ?? []).filter((item): item is "sms" | "voice" => item === "sms" || item === "voice");
  const allowedByRecipient = (recipient.preferred_channels ?? []).filter((item): item is "sms" | "voice" => item === "sms" || item === "voice");
  const allowed = allowedByCheckin.filter((item) => allowedByRecipient.includes(item));

  if (allowed.length === 0) return "sms";
  if (allowed.length === 1) return allowed[0];

  return attemptNumber % 2 === 1 ? allowed[0] : allowed[1];
}

function buildCheckinSmsBody(recipient: CareRecipientRow) {
  return `LifeSignal check-in for ${recipient.full_name}: Reply YES to confirm you are safe, or HELP if you need assistance.`;
}

function buildEscalationSmsBody(recipient: CareRecipientRow, contact: EscalationContactRow, checkinId: string) {
  return `LifeSignal alert: ${recipient.full_name} missed a safety check-in. Please reply ACK if you are taking responsibility. Ref: ${checkinId}.`;
}

async function sendSms(to: string, body: string) {
  const client = createTwilioClient();
  const from = getTwilioFromNumber();

  const message = await client.messages.create({
    to: normalizePhone(to),
    from,
    body,
  });

  return {
    sid: message.sid,
    status: message.status,
    to: message.to,
    from: message.from,
  };
}

async function sendVoice(to: string, messageText: string) {
  const client = createTwilioClient();
  const from = getTwilioFromNumber();
  const twiml = `
<Response>
  <Say voice="alice">${messageText}</Say>
</Response>`.trim();

  const call = await client.calls.create({
    to: normalizePhone(to),
    from,
    twiml,
  });

  return {
    sid: call.sid,
    status: call.status,
    to: call.to,
    from: call.from,
  };
}

async function createEvent(input: {
  type:
    | "checkin_sent"
    | "checkin_retry_sent"
    | "checkin_confirmed"
    | "checkin_help_requested"
    | "checkin_ignored_message"
    | "escalation_started"
    | "escalation_step_sent"
    | "escalation_acknowledged"
    | "incident_resolved"
    | "orchestrator_error";
  checkInId: string;
  recipientId: string;
  incidentId?: string | null;
  stepNumber?: number | null;
  channel?: "sms" | "voice" | "escalation_sms" | "escalation_voice" | null;
  occurredAt?: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from("care_events").insert({
    type: input.type,
    check_in_id: input.checkInId,
    recipient_id: input.recipientId,
    incident_id: input.incidentId ?? null,
    step_number: input.stepNumber ?? null,
    channel: input.channel ?? null,
    occurred_at: input.occurredAt ?? new Date().toISOString(),
    metadata: input.metadata ?? {},
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function getOpenIncidentForCheckin(checkInId: string) {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("care_incidents")
    .select("*")
    .eq("check_in_id", checkInId)
    .in("status", ["open", "acknowledged"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<CareIncidentRow>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function openIncident(checkin: CareCheckinRow) {
  const supabase = createSupabaseAdminClient();
  const existing = await getOpenIncidentForCheckin(checkin.id);

  if (existing) {
    return existing;
  }

  const incidentId = `inc_${crypto.randomUUID().replace(/-/g, "").slice(0, 20)}`;
  const startedAt = new Date().toISOString();

  const { data, error } = await supabase
    .from("care_incidents")
    .insert({
      id: incidentId,
      check_in_id: checkin.id,
      recipient_id: checkin.recipient_id,
      status: "open",
      started_at: startedAt,
      steps: [],
      metadata: {
        source: "orchestrator",
        previous_status: checkin.status,
      },
    })
    .select()
    .single<CareIncidentRow>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function updateCheckin(checkinId: string, patch: Record<string, unknown>) {
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase
    .from("care_checkins")
    .update({
      ...patch,
      updated_at: new Date().toISOString(),
    })
    .eq("id", checkinId);

  if (error) {
    throw new Error(error.message);
  }
}

async function getDuePendingCheckins(now: Date, limit: number) {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("care_checkins")
    .select("*")
    .eq("status", "pending")
    .lte("window_start", now.toISOString())
    .order("scheduled_for", { ascending: true })
    .limit(limit)
    .returns<CareCheckinRow[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

async function getEscalationCandidates(now: Date, limit: number) {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("care_checkins")
    .select("*")
    .in("status", ["pending", "missed", "escalating"])
    .lte("window_end", now.toISOString())
    .order("window_end", { ascending: true })
    .limit(limit)
    .returns<CareCheckinRow[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

async function getRecipientsByIds(recipientIds: string[]) {
  if (recipientIds.length === 0) return new Map<string, CareRecipientRow>();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("care_recipients")
    .select("*")
    .in("id", recipientIds)
    .returns<CareRecipientRow[]>();

  if (error) {
    throw new Error(error.message);
  }

  return new Map((data ?? []).map((row) => [row.id, row]));
}

async function getEscalationContacts(recipientId: string) {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("care_escalation_contacts")
    .select("*")
    .eq("recipient_id", recipientId)
    .eq("is_active", true)
    .order("priority", { ascending: true })
    .returns<EscalationContactRow[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

async function processInitialSend(checkin: CareCheckinRow, recipient: CareRecipientRow, now: Date, stats: RunStats) {
  const attemptNumber = (checkin.attempts_made ?? 0) + 1;
  const channel = pickChannel(checkin, recipient, attemptNumber);

  const result =
    channel === "sms"
      ? await sendSms(recipient.phone, buildCheckinSmsBody(recipient))
      : await sendVoice(
          recipient.phone,
          `Hello ${recipient.full_name}. This is your LifeSignal safety check-in. If you are safe, please respond to the text message or return this call.`
        );

  await updateCheckin(checkin.id, {
    attempts_made: attemptNumber,
    last_attempt_at: isoNow(now),
    metadata: {
      ...(checkin.metadata ?? {}),
      last_delivery: result,
    },
  });

  await createEvent({
    type: attemptNumber > 1 ? "checkin_retry_sent" : "checkin_sent",
    checkInId: checkin.id,
    recipientId: recipient.id,
    channel: channel,
    occurredAt: isoNow(now),
    metadata: {
      attemptNumber,
      delivery: result,
      orchestrator: true,
    },
  });

  if (attemptNumber > 1) {
    stats.retriesSent += 1;
  } else {
    stats.checkinsSent += 1;
  }
}

async function processEscalation(checkin: CareCheckinRow, recipient: CareRecipientRow, now: Date, stats: RunStats) {
  const lastAttemptAt = checkin.last_attempt_at ? new Date(checkin.last_attempt_at) : new Date(checkin.window_end);
  const readyForEscalationAt = addMinutes(lastAttemptAt, checkin.escalation_delay_minutes ?? 10);

  if (!isPast(readyForEscalationAt, now)) {
    return;
  }

  const incident = await openIncident(checkin);

  if (!checkin.escalation_started_at) {
    await updateCheckin(checkin.id, {
      status: "escalating",
      escalation_started_at: isoNow(now),
    });

    await createEvent({
      type: "escalation_started",
      checkInId: checkin.id,
      recipientId: recipient.id,
      incidentId: incident.id,
      occurredAt: isoNow(now),
      metadata: {
        orchestrator: true,
      },
    });

    stats.escalationsStarted += 1;
  }

  const contacts = await getEscalationContacts(recipient.id);
  if (contacts.length === 0) {
    await createEvent({
      type: "orchestrator_error",
      checkInId: checkin.id,
      recipientId: recipient.id,
      incidentId: incident.id,
      occurredAt: isoNow(now),
      metadata: {
        error: "No active escalation contacts found.",
      },
    });
    stats.errors.push(`No escalation contacts for recipient ${recipient.id}`);
    return;
  }

  const stepsAlreadySent = Array.isArray(incident.steps) ? incident.steps.length : 0;
  const nextContact = contacts[stepsAlreadySent];

  if (!nextContact) {
    await updateCheckin(checkin.id, {
      status: "missed",
    });
    return;
  }

  const delivery = await sendSms(
    nextContact.phone,
    buildEscalationSmsBody(recipient, nextContact, checkin.id)
  );

  const nextStepNumber = stepsAlreadySent + 1;
  const updatedSteps = [
    ...(Array.isArray(incident.steps) ? incident.steps : []),
    {
      step_number: nextStepNumber,
      contact_id: nextContact.id,
      contact_name: nextContact.name,
      contact_phone: nextContact.phone,
      role: nextContact.role,
      priority: nextContact.priority,
      sent_at: isoNow(now),
      delivery,
    },
  ];

  const supabase = createSupabaseAdminClient();

  const { error: incidentUpdateError } = await supabase
    .from("care_incidents")
    .update({
      steps: updatedSteps,
      updated_at: isoNow(now),
    })
    .eq("id", incident.id);

  if (incidentUpdateError) {
    throw new Error(incidentUpdateError.message);
  }

  await createEvent({
    type: "escalation_step_sent",
    checkInId: checkin.id,
    recipientId: recipient.id,
    incidentId: incident.id,
    stepNumber: nextStepNumber,
    channel: "escalation_sms",
    occurredAt: isoNow(now),
    metadata: {
      contact_id: nextContact.id,
      contact_name: nextContact.name,
      contact_phone: nextContact.phone,
      delivery,
      orchestrator: true,
    },
  });

  stats.escalationStepsSent += 1;
  if (stepsAlreadySent === 0) {
    stats.incidentsOpened += 1;
  }
}

export async function runCareOrchestrator(options?: RunOptions) {
  const now = options?.now ?? new Date();
  const limit = options?.limit ?? 100;

  const stats: RunStats = {
    dueCheckinsScanned: 0,
    checkinsSent: 0,
    retriesSent: 0,
    escalationsStarted: 0,
    escalationStepsSent: 0,
    incidentsOpened: 0,
    errors: [],
  };

  const dueCheckins = await getDuePendingCheckins(now, limit);
  const escalationCandidates = await getEscalationCandidates(now, limit);

  const allRecipientIds = Array.from(
    new Set([...dueCheckins, ...escalationCandidates].map((item) => item.recipient_id))
  );

  const recipientsById = await getRecipientsByIds(allRecipientIds);

  for (const checkin of dueCheckins) {
    stats.dueCheckinsScanned += 1;

    const recipient = recipientsById.get(checkin.recipient_id);
    if (!recipient || !recipient.is_active) {
      stats.errors.push(`Recipient missing or inactive for checkin ${checkin.id}`);
      continue;
    }

    try {
      const attemptsMade = checkin.attempts_made ?? 0;
      const canSendInitial = attemptsMade === 0;
      const lastAttemptAt = checkin.last_attempt_at ? new Date(checkin.last_attempt_at) : null;
      const retryReady =
        attemptsMade > 0 &&
        attemptsMade < (checkin.max_attempts ?? 3) &&
        lastAttemptAt &&
        isPast(addMinutes(lastAttemptAt, checkin.retry_delay_minutes ?? 15), now);

      if (canSendInitial || retryReady) {
        await processInitialSend(checkin, recipient, now, stats);
      } else if (
        attemptsMade >= (checkin.max_attempts ?? 3) &&
        isPast(checkin.window_end, now)
      ) {
        await updateCheckin(checkin.id, {
          status: "missed",
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : `Unknown orchestrator error for checkin ${checkin.id}`;
      stats.errors.push(message);

      try {
        await createEvent({
          type: "orchestrator_error",
          checkInId: checkin.id,
          recipientId: checkin.recipient_id,
          occurredAt: isoNow(now),
          metadata: {
            error: message,
            phase: "send_or_retry",
          },
        });
      } catch {}
    }
  }

  for (const checkin of escalationCandidates) {
    if (!(checkin.status === "missed" || checkin.status === "escalating" || (checkin.status === "pending" && isPast(checkin.window_end, now)))) {
      continue;
    }

    const recipient = recipientsById.get(checkin.recipient_id);
    if (!recipient || !recipient.is_active) {
      stats.errors.push(`Recipient missing or inactive for escalation on checkin ${checkin.id}`);
      continue;
    }

    try {
      if (checkin.status === "pending") {
        await updateCheckin(checkin.id, {
          status: "missed",
        });
        checkin.status = "missed";
      }

      await processEscalation(checkin, recipient, now, stats);
    } catch (error) {
      const message = error instanceof Error ? error.message : `Unknown escalation error for checkin ${checkin.id}`;
      stats.errors.push(message);

      try {
        await createEvent({
          type: "orchestrator_error",
          checkInId: checkin.id,
          recipientId: checkin.recipient_id,
          occurredAt: isoNow(now),
          metadata: {
            error: message,
            phase: "escalation",
          },
        });
      } catch {}
    }
  }

  return {
    ok: true,
    now: isoNow(now),
    stats,
  };
}
