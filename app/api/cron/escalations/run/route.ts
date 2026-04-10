import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { placeLifeSignalCall, sendLifeSignalSms } from "@/lib/twilio/client";

type CareCheckin = {
  id: string;
  recipient_id: string;
  status: string;
  escalation_started_at: string | null;
  metadata: Record<string, unknown> | null;
};

type CareIncident = {
  id: string;
  check_in_id: string;
  recipient_id: string;
  status: string;
  started_at: string;
  acknowledged_at: string | null;
  acknowledged_by_contact_id: string | null;
  steps: Array<Record<string, unknown>> | null;
  metadata: Record<string, unknown> | null;
};

type CareRecipient = {
  id: string;
  full_name: string;
  phone: string;
};

type EscalationContact = {
  id: string;
  recipient_id: string;
  name: string;
  phone: string;
  role: string;
  priority: number;
  can_acknowledge: boolean;
  is_active: boolean;
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

function getBearerToken(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

function isVercelCronRequest(req: NextRequest) {
  const vercelCronHeader = req.headers.get("x-vercel-cron");
  return Boolean(vercelCronHeader);
}

function assertAuthorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;

  if (secret) {
    const bearerToken = getBearerToken(req);
    if (bearerToken && bearerToken === secret) {
      return;
    }
  }

  if (isVercelCronRequest(req)) {
    return;
  }

  if (!secret && !isVercelCronRequest(req)) {
    throw new Error("Missing CRON_SECRET");
  }

  throw new Error("Unauthorized");
}

function getStepDelayMinutes(contact: EscalationContact) {
  const value = Number(contact.metadata?.step_delay_minutes ?? 5);
  return Number.isFinite(value) && value >= 0 ? value : 5;
}

function getChannels(contact: EscalationContact) {
  const sms = contact.metadata?.notify_sms;
  const voice = contact.metadata?.notify_voice;

  return {
    sms: sms === undefined ? true : Boolean(sms),
    voice: Boolean(voice),
  };
}

function buildEscalationMessage(recipient: CareRecipient, contact: EscalationContact, incident: CareIncident) {
  const base = [
    "LifeSignal Alert:",
    recipient.full_name + " has not responded to a scheduled safety check-in.",
    "Recipient phone: " + recipient.phone + ".",
    "Incident ID: " + incident.id + ".",
  ];

  if (contact.can_acknowledge) {
    base.push("Reply ACK " + incident.id + " to acknowledge.");
  }

  base.push("Reply HELP for support.");

  return base.join(" ");
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
    console.error("[cron:escalations:event:error]", error);
  }
}

async function alreadySentStep(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  incidentId: string,
  contactId: string
) {
  const { data, error } = await supabase
    .from("care_events")
    .select("id, metadata")
    .eq("type", "escalation_step_sent")
    .eq("incident_id", incidentId);

  if (error) {
    throw error;
  }

  return (data || []).some((row: any) => row?.metadata?.contact_id === contactId);
}

export async function GET(req: NextRequest) {
  return POST(req);
}

export async function POST(req: NextRequest) {
  try {
    assertAuthorized(req);

    const supabase = getSupabaseAdmin();
    const now = new Date();
    const nowIso = now.toISOString();

    const incidentsQuery = await supabase
      .from("care_incidents")
      .select("*")
      .eq("status", "open")
      .order("started_at", { ascending: true })
      .limit(50);

    if (incidentsQuery.error) {
      throw incidentsQuery.error;
    }

    const incidents = (incidentsQuery.data || []) as CareIncident[];

    let escalationMessagesSent = 0;
    let escalationCallsPlaced = 0;
    let incidentsTouched = 0;
    let skipped = 0;
    const processed: Array<Record<string, unknown>> = [];

    for (const incident of incidents) {
      const checkinQuery = await supabase
        .from("care_checkins")
        .select("id, recipient_id, status, escalation_started_at, metadata")
        .eq("id", incident.check_in_id)
        .maybeSingle();

      if (checkinQuery.error) {
        throw checkinQuery.error;
      }

      const checkin = checkinQuery.data as CareCheckin | null;

      if (!checkin || checkin.status !== "escalating") {
        skipped += 1;
        processed.push({
          incidentId: incident.id,
          action: "skipped_checkin_not_escalating",
        });
        continue;
      }

      const recipientQuery = await supabase
        .from("care_recipients")
        .select("id, full_name, phone")
        .eq("id", incident.recipient_id)
        .maybeSingle();

      if (recipientQuery.error) {
        throw recipientQuery.error;
      }

      const recipient = recipientQuery.data as CareRecipient | null;

      if (!recipient) {
        skipped += 1;
        processed.push({
          incidentId: incident.id,
          action: "skipped_missing_recipient",
        });
        continue;
      }

      const contactsQuery = await supabase
        .from("care_escalation_contacts")
        .select("*")
        .eq("recipient_id", incident.recipient_id)
        .eq("is_active", true)
        .order("priority", { ascending: true });

      if (contactsQuery.error) {
        throw contactsQuery.error;
      }

      const contacts = (contactsQuery.data || []) as EscalationContact[];

      if (contacts.length === 0) {
        skipped += 1;
        processed.push({
          incidentId: incident.id,
          action: "skipped_no_contacts",
        });
        continue;
      }

      const startedAtMs = new Date(incident.started_at).getTime();
      let sentThisRound = false;

      for (let index = 0; index < contacts.length; index += 1) {
        const contact = contacts[index];
        const stepNumber = index + 1;

        const wasAlreadySent = await alreadySentStep(supabase, incident.id, contact.id);
        if (wasAlreadySent) {
          continue;
        }

        const delayMinutes = getStepDelayMinutes(contact);
        const eligibleAt = startedAtMs + index * delayMinutes * 60 * 1000;

        if (Date.now() < eligibleAt) {
          continue;
        }

        const channels = getChannels(contact);
        const body = buildEscalationMessage(recipient, contact, incident);

        let channelUsed = "";
        let providerSid = "";

        if (channels.sms) {
          const sms = await sendLifeSignalSms({
            to: contact.phone,
            body,
          });

          channelUsed = "escalation_sms";
          providerSid = sms.sid;
          escalationMessagesSent += 1;
        } else if (channels.voice) {
          const call = await placeLifeSignalCall({
            to: contact.phone,
          });

          channelUsed = "escalation_voice";
          providerSid = call.sid;
          escalationCallsPlaced += 1;
        } else {
          skipped += 1;
          processed.push({
            incidentId: incident.id,
            contactId: contact.id,
            action: "skipped_contact_no_channels",
          });
          continue;
        }

        const currentSteps = Array.isArray(incident.steps) ? incident.steps : [];
        const newStep = {
          step_number: stepNumber,
          contact_id: contact.id,
          contact_name: contact.name,
          channel: channelUsed,
          provider_sid: providerSid,
          sent_at: nowIso,
        };

        const updateIncident = await supabase
          .from("care_incidents")
          .update({
            steps: [...currentSteps, newStep],
            updated_at: nowIso,
            metadata: {
              ...(incident.metadata || {}),
              last_step_number: stepNumber,
              last_contact_id: contact.id,
              last_channel: channelUsed,
              last_provider_sid: providerSid,
            },
          })
          .eq("id", incident.id);

        if (updateIncident.error) {
          throw updateIncident.error;
        }

        await insertEvent(supabase, {
          type: "escalation_step_sent",
          check_in_id: incident.check_in_id,
          recipient_id: incident.recipient_id,
          incident_id: incident.id,
          step_number: stepNumber,
          channel: channelUsed,
          occurred_at: nowIso,
          metadata: {
            contact_id: contact.id,
            contact_name: contact.name,
            contact_phone: contact.phone,
            contact_role: contact.role,
            provider_sid: providerSid,
          },
        });

        escalationMessagesSent += 0;
        incidentsTouched += 1;
        sentThisRound = true;

        processed.push({
          incidentId: incident.id,
          checkinId: incident.check_in_id,
          recipientId: incident.recipient_id,
          contactId: contact.id,
          stepNumber,
          action: channelUsed === "escalation_voice" ? "escalation_call_placed" : "escalation_sms_sent",
          providerSid,
        });

        break;
      }

      if (!sentThisRound) {
        processed.push({
          incidentId: incident.id,
          action: "no_step_due_yet_or_all_steps_sent",
        });
      }
    }

    return NextResponse.json({
      ok: true,
      now: nowIso,
      totals: {
        incidentsFound: incidents.length,
        escalationMessagesSent,
        escalationCallsPlaced,
        incidentsTouched,
        skipped,
        processed: processed.length,
      },
      processed,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Unauthorized" ? 401 : 500;

    console.error("[cron:escalations:run:error]", error);

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status }
    );
  }
}



















