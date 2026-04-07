import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function createEscalationSteps(input: {
  orgId: string;
  incidentId: string;
  memberName: string;
  memberPhone: string;
}) {
  const admin = createSupabaseAdminClient();

  const steps = [
    {
      org_id: input.orgId,
      incident_id: input.incidentId,
      step_order: 1,
      contact_name: `${input.memberName} Primary`,
      contact_method: "sms",
      contact_target: input.memberPhone,
      status: "notified",
      notified_at: new Date().toISOString(),
    },
  ];

  const { data, error } = await admin
    .from("escalation_steps")
    .insert(steps)
    .select("id, incident_id, step_order, status, ack_token");

  if (error) {
    throw new Error(`Failed to create escalation steps: ${error.message}`);
  }

  return data ?? [];
}

export async function logEscalationEvent(input: {
  orgId: string;
  incidentId: string;
  escalationStepId?: string;
  eventType:
    | "incident_opened"
    | "step_notified"
    | "step_failed"
    | "step_acknowledged"
    | "incident_acknowledged"
    | "incident_resolved";
  payload?: Record<string, unknown>;
}) {
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("escalation_events").insert({
    org_id: input.orgId,
    incident_id: input.incidentId,
    escalation_step_id: input.escalationStepId ?? null,
    event_type: input.eventType,
    payload: input.payload ?? {},
    occurred_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Failed to log escalation event: ${error.message}`);
  }
}

export async function acknowledgeEscalationStep(input: {
  incidentId: string;
  stepId?: string;
  ackToken?: string;
}) {
  const admin = createSupabaseAdminClient();

  if (!input.stepId && !input.ackToken) {
    throw new Error("Either stepId or ackToken is required");
  }

  let query = admin
    .from("escalation_steps")
    .update({
      status: "acknowledged",
      acknowledged_at: new Date().toISOString(),
    })
    .eq("incident_id", input.incidentId)
    .select("id, org_id, incident_id");

  if (input.stepId) {
    query = query.eq("id", input.stepId);
  }

  if (input.ackToken) {
    query = query.eq("ack_token", input.ackToken);
  }

  const { data, error } = await query.limit(1).maybeSingle<{ id: string; org_id: string; incident_id: string }>();

  if (error || !data) {
    throw new Error(error?.message ?? "Escalation step not found");
  }

  return data;
}

