import { NextResponse } from "next/server";
import { z } from "zod";

import { acknowledgeEscalationStep, logEscalationEvent } from "@/services/lifesignal/escalation.service";
import { acknowledgeIncident } from "@/services/lifesignal/incidents.service";
import { createClient } from "@/lib/supabase/server";

const acknowledgeSchema = z.object({
  incidentId: z.string().uuid(),
  stepId: z.string().uuid().optional(),
  ackToken: z.string().uuid().optional(),
});

export async function POST(request: Request) {
  try {
    const payload = acknowledgeSchema.parse(await request.json());
    const step = await acknowledgeEscalationStep({
      incidentId: payload.incidentId,
      stepId: payload.stepId,
      ackToken: payload.ackToken,
    });

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const incident = await acknowledgeIncident({
      incidentId: payload.incidentId,
      acknowledgedByUserId: user?.id ?? null,
    });

    if (!incident) {
      return NextResponse.json({ ok: false, error: "Incident not found" }, { status: 404 });
    }

    await logEscalationEvent({
      orgId: step.org_id,
      incidentId: payload.incidentId,
      escalationStepId: step.id,
      eventType: "step_acknowledged",
      payload: {
        acknowledged_by_user_id: user?.id ?? null,
      },
    });

    await logEscalationEvent({
      orgId: step.org_id,
      incidentId: payload.incidentId,
      eventType: "incident_acknowledged",
      payload: {
        acknowledged_by_user_id: user?.id ?? null,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        incident,
        step,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: "Invalid request payload", issues: error.issues }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : "Failed to acknowledge escalation";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
