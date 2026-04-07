import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createTwilioClient, getTwilioFromNumber } from "@/lib/twilio/server";

export type Channel = "sms" | "voice";
export type ScenarioKey = "daily" | "late" | "none" | "critical";

export type EscalationTier = {
  id: string;
  label: string;
  delayMinutes: number;
  channels: Channel[];
  action: string;
};

export type WorkflowPayload = {
  monitoredPersonId?: string | null;
  monitoredPersonName: string;
  monitoredPersonPhone?: string | null;
  timezone: string;
  scheduleTime: string;
  responseWindowMinutes: number;
  quietHoursStart: string;
  quietHoursEnd: string;
  primaryChannel: Channel;
  fallbackChannel: Channel;
  retriesEnabled: boolean;
  autoOpenIncident: boolean;
  escalationMessage: string;
  escalationTiers: EscalationTier[];
};

export type IncidentPayload = {
  scenario?: string;
  riskLevel?: string;
  monitoredPersonName?: string;
  monitoredPersonId?: string | null;
  workflow?: Partial<WorkflowPayload>;
};

const WORKFLOWS_TABLE = process.env.LIFESIGNAL_WORKFLOWS_TABLE || "checkin_workflows";
const INCIDENTS_TABLE = process.env.LIFESIGNAL_INCIDENTS_TABLE || "incidents";
const INCIDENT_EVENTS_TABLE = process.env.LIFESIGNAL_INCIDENT_EVENTS_TABLE || "incident_events";

export function buildPreviewPayload(input: {
  scenario?: ScenarioKey;
  selectedRisk?: string;
  workflow: WorkflowPayload;
}) {
  const workflow = input.workflow;

  return {
    scenario: input.scenario ?? "none",
    riskLevel: input.selectedRisk ?? "elevated",
    monitoredPerson: {
      id: workflow.monitoredPersonId ?? null,
      name: workflow.monitoredPersonName,
      phone: workflow.monitoredPersonPhone ?? null,
      timezone: workflow.timezone,
    },
    checkIn: {
      scheduledFor: workflow.scheduleTime,
      responseWindowMinutes: workflow.responseWindowMinutes,
      quietHoursStart: workflow.quietHoursStart,
      quietHoursEnd: workflow.quietHoursEnd,
      primaryChannel: workflow.primaryChannel,
      fallbackChannel: workflow.fallbackChannel,
      retriesEnabled: workflow.retriesEnabled,
      autoOpenIncident: workflow.autoOpenIncident,
    },
    outboundMessage: {
      sms: "Good morning. Reply YES to confirm you are safe.",
      voicePrompt: "This is your LifeSignal safety check-in. Press 1 if you are safe. Press 9 if you need help.",
    },
    escalation: {
      message: workflow.escalationMessage,
      tiers: workflow.escalationTiers,
    },
  };
}

export async function saveWorkflow(workflow: WorkflowPayload) {
  const supabase = createSupabaseAdminClient();

  const row = {
    monitored_person_id: workflow.monitoredPersonId ?? null,
    monitored_person_name: workflow.monitoredPersonName,
    monitored_person_phone: workflow.monitoredPersonPhone ?? null,
    timezone: workflow.timezone,
    schedule_time: workflow.scheduleTime,
    response_window_minutes: workflow.responseWindowMinutes,
    quiet_hours_start: workflow.quietHoursStart,
    quiet_hours_end: workflow.quietHoursEnd,
    primary_channel: workflow.primaryChannel,
    fallback_channel: workflow.fallbackChannel,
    retries_enabled: workflow.retriesEnabled,
    auto_open_incident: workflow.autoOpenIncident,
    escalation_message: workflow.escalationMessage,
    escalation_tiers: workflow.escalationTiers,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from(WORKFLOWS_TABLE)
    .insert(row)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function sendTestSms(input: {
  to: string;
  body?: string;
}) {
  const client = createTwilioClient();
  const from = getTwilioFromNumber();

  const message = await client.messages.create({
    to: input.to,
    from,
    body: input.body || "LifeSignal test SMS: this is a check-in system verification.",
  });

  return {
    sid: message.sid,
    status: message.status,
    to: message.to,
    from: message.from,
  };
}

export async function sendTestVoice(input: {
  to: string;
  message?: string;
}) {
  const client = createTwilioClient();
  const from = getTwilioFromNumber();

  const safeMessage =
    input.message ||
    "This is a LifeSignal test voice call. Your fallback voice workflow is connected and operational.";

  const twiml = `
<Response>
  <Say voice="alice">${safeMessage}</Say>
</Response>`.trim();

  const call = await client.calls.create({
    to: input.to,
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

export async function openIncident(input: IncidentPayload) {
  const supabase = createSupabaseAdminClient();

  const { data: incident, error: incidentError } = await supabase
    .from(INCIDENTS_TABLE)
    .insert({
      monitored_person_id: input.monitoredPersonId ?? input.workflow?.monitoredPersonId ?? null,
      monitored_person_name: input.monitoredPersonName ?? input.workflow?.monitoredPersonName ?? "Unknown",
      scenario: input.scenario ?? "none",
      risk_level: input.riskLevel ?? "elevated",
      status: "open",
      source: "operations_console",
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (incidentError) {
    throw new Error(incidentError.message);
  }

  const { error: eventError } = await supabase
    .from(INCIDENT_EVENTS_TABLE)
    .insert({
      incident_id: incident.id,
      event_type: "incident_opened",
      payload: {
        scenario: input.scenario ?? "none",
        riskLevel: input.riskLevel ?? "elevated",
      },
      created_at: new Date().toISOString(),
    });

  if (eventError) {
    throw new Error(eventError.message);
  }

  return incident;
}

export async function acknowledgeLatestIncident(input: {
  monitoredPersonName?: string;
  actor?: string;
  scenario?: string;
}) {
  const supabase = createSupabaseAdminClient();

  const { data: latestIncident, error: fetchError } = await supabase
    .from(INCIDENTS_TABLE)
    .select("*")
    .eq("status", "open")
    .eq("monitored_person_name", input.monitoredPersonName ?? "Unknown")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  if (!latestIncident) {
    throw new Error("No open incident found to acknowledge.");
  }

  const { error: updateError } = await supabase
    .from(INCIDENTS_TABLE)
    .update({
      status: "acknowledged",
      acknowledged_by: input.actor ?? "guardian",
      acknowledged_at: new Date().toISOString(),
    })
    .eq("id", latestIncident.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  const { error: eventError } = await supabase
    .from(INCIDENT_EVENTS_TABLE)
    .insert({
      incident_id: latestIncident.id,
      event_type: "incident_acknowledged",
      payload: {
        actor: input.actor ?? "guardian",
        scenario: input.scenario ?? "none",
      },
      created_at: new Date().toISOString(),
    });

  if (eventError) {
    throw new Error(eventError.message);
  }

  return latestIncident;
}
