import { getMemberById } from "@/services/lifesignal/members.service";
import { createEscalationSteps, logEscalationEvent } from "@/services/lifesignal/escalation.service";
import { createIncident, findOpenIncidentForCheckin } from "@/services/lifesignal/incidents.service";

export async function escalateCheckinIfNeeded(input: {
  orgId: string;
  memberId: string;
  checkinId: string;
  reason: "missed" | "help_requested";
}) {
  const existing = await findOpenIncidentForCheckin(input.checkinId);
  if (existing) {
    return { incident: existing, created: false };
  }

  const member = await getMemberById(input.memberId);
  if (!member) {
    throw new Error("Member not found for escalation");
  }

  const incident = await createIncident({
    orgId: input.orgId,
    memberId: input.memberId,
    checkinId: input.checkinId,
    severity: input.reason === "help_requested" ? "critical" : "high",
  });

  await logEscalationEvent({
    orgId: input.orgId,
    incidentId: incident.id,
    eventType: "incident_opened",
    payload: { reason: input.reason },
  });

  const steps = await createEscalationSteps({
    orgId: input.orgId,
    incidentId: incident.id,
    memberName: member.full_name,
    memberPhone: member.phone_e164,
  });

  for (const step of steps) {
    await logEscalationEvent({
      orgId: input.orgId,
      incidentId: incident.id,
      escalationStepId: step.id,
      eventType: "step_notified",
      payload: {
        step_order: step.step_order,
      },
    });
  }

  return { incident, created: true, steps };
}
