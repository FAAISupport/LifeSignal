import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  containsKeyword,
  generateWebhookReceiptId,
  getE164Candidates,
  matchKeyword,
  normalizeInboundText,
  parseTwilioFormBody,
} from "@/lib/twilio/webhook";

type CareRecipientRow = {
  id: string;
  full_name: string;
  phone: string;
  confirmation_keywords: string[];
  help_keywords: string[];
  is_active: boolean;
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
};

type CareCheckinRow = {
  id: string;
  recipient_id: string;
  status: "pending" | "confirmed" | "missed" | "help_requested" | "escalating" | "resolved";
  scheduled_for: string;
  confirmed_at: string | null;
  help_requested_at: string | null;
  metadata: Record<string, unknown>;
};

type CareIncidentRow = {
  id: string;
  check_in_id: string;
  recipient_id: string;
  status: "open" | "acknowledged" | "resolved";
  acknowledged_by_contact_id: string | null;
  steps: Array<Record<string, unknown>>;
  metadata: Record<string, unknown>;
};

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
    occurred_at: new Date().toISOString(),
    metadata: input.metadata ?? {},
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function findRecipientByPhone(fromPhone: string) {
  const supabase = createSupabaseAdminClient();
  const candidates = getE164Candidates(fromPhone);

  for (const candidate of candidates) {
    const { data, error } = await supabase
      .from("care_recipients")
      .select("id, full_name, phone, confirmation_keywords, help_keywords, is_active")
      .eq("phone", candidate)
      .eq("is_active", true)
      .limit(1)
      .maybeSingle<CareRecipientRow>();

    if (error) {
      throw new Error(error.message);
    }

    if (data) {
      return data;
    }
  }

  return null;
}

async function findEscalationContactByPhone(fromPhone: string) {
  const supabase = createSupabaseAdminClient();
  const candidates = getE164Candidates(fromPhone);

  for (const candidate of candidates) {
    const { data, error } = await supabase
      .from("care_escalation_contacts")
      .select("id, recipient_id, name, phone, role, priority, can_acknowledge, is_active")
      .eq("phone", candidate)
      .eq("is_active", true)
      .limit(1)
      .maybeSingle<EscalationContactRow>();

    if (error) {
      throw new Error(error.message);
    }

    if (data) {
      return data;
    }
  }

  return null;
}

async function findLatestActionableCheckin(recipientId: string) {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("care_checkins")
    .select("id, recipient_id, status, scheduled_for, confirmed_at, help_requested_at, metadata")
    .eq("recipient_id", recipientId)
    .in("status", ["pending", "missed", "escalating"])
    .order("scheduled_for", { ascending: false })
    .limit(1)
    .maybeSingle<CareCheckinRow>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function findLatestOpenIncidentForRecipient(recipientId: string) {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("care_incidents")
    .select("id, check_in_id, recipient_id, status, acknowledged_by_contact_id, steps, metadata")
    .eq("recipient_id", recipientId)
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<CareIncidentRow>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function findLatestOpenIncidentForCheckin(checkInId: string) {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("care_incidents")
    .select("id, check_in_id, recipient_id, status, acknowledged_by_contact_id, steps, metadata")
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

async function updateCheckinConfirmed(checkin: CareCheckinRow, inbound: Record<string, string>) {
  const supabase = createSupabaseAdminClient();
  const now = new Date().toISOString();

  const { error } = await supabase
    .from("care_checkins")
    .update({
      status: "confirmed",
      confirmed_at: now,
      updated_at: now,
      metadata: {
        ...(checkin.metadata ?? {}),
        inbound_confirmation: {
          received_at: now,
          body: inbound.Body ?? "",
          from: inbound.From ?? "",
          message_sid: inbound.MessageSid ?? null,
        },
      },
    })
    .eq("id", checkin.id);

  if (error) {
    throw new Error(error.message);
  }
}

async function updateCheckinHelpRequested(checkin: CareCheckinRow, inbound: Record<string, string>) {
  const supabase = createSupabaseAdminClient();
  const now = new Date().toISOString();

  const { error } = await supabase
    .from("care_checkins")
    .update({
      status: "help_requested",
      help_requested_at: now,
      updated_at: now,
      metadata: {
        ...(checkin.metadata ?? {}),
        inbound_help: {
          received_at: now,
          body: inbound.Body ?? "",
          from: inbound.From ?? "",
          message_sid: inbound.MessageSid ?? null,
        },
      },
    })
    .eq("id", checkin.id);

  if (error) {
    throw new Error(error.message);
  }
}

async function resolveIncident(incident: CareIncidentRow, resolution: string) {
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase
    .from("care_incidents")
    .update({
      status: "resolved",
      updated_at: new Date().toISOString(),
      metadata: {
        ...(incident.metadata ?? {}),
        resolution,
      },
    })
    .eq("id", incident.id);

  if (error) {
    throw new Error(error.message);
  }
}

async function acknowledgeIncidentByEscalationContact(
  incident: CareIncidentRow,
  contact: EscalationContactRow,
  inbound: Record<string, string>
) {
  const supabase = createSupabaseAdminClient();
  const now = new Date().toISOString();
  const existingSteps = Array.isArray(incident.steps) ? incident.steps : [];

  const { error } = await supabase
    .from("care_incidents")
    .update({
      status: "acknowledged",
      acknowledged_at: now,
      acknowledged_by_contact_id: contact.id,
      updated_at: now,
      metadata: {
        ...(incident.metadata ?? {}),
        acknowledged_via: "inbound_sms",
        acknowledged_from: inbound.From ?? "",
        acknowledged_message_sid: inbound.MessageSid ?? null,
        acknowledged_contact_name: contact.name,
        acknowledged_contact_role: contact.role,
      },
      steps: existingSteps,
    })
    .eq("id", incident.id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.text();
    const inbound = parseTwilioFormBody(raw);
    const normalizedBody = normalizeInboundText(inbound.Body);
    const receiptId = generateWebhookReceiptId();

    if (!inbound.From) {
      return new NextResponse("Missing From", { status: 400 });
    }

    const isAck =
      normalizedBody === "ack" ||
      normalizedBody === "acknowledged" ||
      normalizedBody === "i got it" ||
      normalizedBody === "got it";

    const escalationContact = await findEscalationContactByPhone(inbound.From);

    if (isAck && escalationContact) {
      if (!escalationContact.can_acknowledge) {
        return NextResponse.json({
          ok: true,
          ignored: true,
          receiptId,
          reason: "Contact matched but cannot acknowledge incidents.",
        });
      }

      const incident = await findLatestOpenIncidentForRecipient(escalationContact.recipient_id);

      if (!incident) {
        return NextResponse.json({
          ok: true,
          ignored: true,
          receiptId,
          reason: "No open incident found for escalation contact.",
        });
      }

      await acknowledgeIncidentByEscalationContact(incident, escalationContact, inbound);

      await createEvent({
        type: "escalation_acknowledged",
        checkInId: incident.check_in_id,
        recipientId: incident.recipient_id,
        incidentId: incident.id,
        channel: "escalation_sms",
        metadata: {
          receipt_id: receiptId,
          inbound_from: inbound.From ?? "",
          inbound_body: inbound.Body ?? "",
          message_sid: inbound.MessageSid ?? null,
          source: "twilio_inbound",
          contact_id: escalationContact.id,
          contact_name: escalationContact.name,
          contact_role: escalationContact.role,
        },
      });

      return NextResponse.json({
        ok: true,
        action: "acknowledged",
        receiptId,
        incidentId: incident.id,
        recipientId: incident.recipient_id,
        contactId: escalationContact.id,
      });
    }

    const recipient = await findRecipientByPhone(inbound.From);

    if (!recipient) {
      return NextResponse.json({
        ok: true,
        ignored: true,
        receiptId,
        reason: "No active recipient or escalation contact matched inbound phone number.",
      });
    }

    const checkin = await findLatestActionableCheckin(recipient.id);

    if (!checkin) {
      return NextResponse.json({
        ok: true,
        ignored: true,
        receiptId,
        recipientId: recipient.id,
        reason: "No actionable check-in found.",
      });
    }

    const incident = await findLatestOpenIncidentForCheckin(checkin.id);

    const isConfirmation =
      matchKeyword(normalizedBody, recipient.confirmation_keywords ?? []) ||
      containsKeyword(normalizedBody, recipient.confirmation_keywords ?? []);

    const isHelp =
      matchKeyword(normalizedBody, recipient.help_keywords ?? []) ||
      containsKeyword(normalizedBody, recipient.help_keywords ?? []);

    if (isHelp) {
      await updateCheckinHelpRequested(checkin, inbound);

      await createEvent({
        type: "checkin_help_requested",
        checkInId: checkin.id,
        recipientId: recipient.id,
        incidentId: incident?.id ?? null,
        channel: "sms",
        metadata: {
          receipt_id: receiptId,
          inbound_from: inbound.From ?? "",
          inbound_body: inbound.Body ?? "",
          message_sid: inbound.MessageSid ?? null,
          source: "twilio_inbound",
        },
      });

      return NextResponse.json({
        ok: true,
        action: "help_requested",
        receiptId,
        recipientId: recipient.id,
        checkInId: checkin.id,
      });
    }

    if (isConfirmation) {
      await updateCheckinConfirmed(checkin, inbound);

      await createEvent({
        type: "checkin_confirmed",
        checkInId: checkin.id,
        recipientId: recipient.id,
        incidentId: incident?.id ?? null,
        channel: "sms",
        metadata: {
          receipt_id: receiptId,
          inbound_from: inbound.From ?? "",
          inbound_body: inbound.Body ?? "",
          message_sid: inbound.MessageSid ?? null,
          source: "twilio_inbound",
        },
      });

      if (incident && incident.status !== "resolved") {
        await resolveIncident(incident, "Recipient confirmed safety via inbound SMS.");

        await createEvent({
          type: "incident_resolved",
          checkInId: checkin.id,
          recipientId: recipient.id,
          incidentId: incident.id,
          channel: "sms",
          metadata: {
            receipt_id: receiptId,
            resolution: "Recipient confirmed safety via inbound SMS.",
          },
        });
      }

      return NextResponse.json({
        ok: true,
        action: "confirmed",
        receiptId,
        recipientId: recipient.id,
        checkInId: checkin.id,
      });
    }

    await createEvent({
      type: "checkin_ignored_message",
      checkInId: checkin.id,
      recipientId: recipient.id,
      incidentId: incident?.id ?? null,
      channel: "sms",
      metadata: {
        receipt_id: receiptId,
        inbound_from: inbound.From ?? "",
        inbound_body: inbound.Body ?? "",
        message_sid: inbound.MessageSid ?? null,
        source: "twilio_inbound",
      },
    });

    return NextResponse.json({
      ok: true,
      action: "ignored",
      receiptId,
      recipientId: recipient.id,
      checkInId: checkin.id,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to process inbound Twilio webhook.",
      },
      { status: 500 }
    );
  }
}

