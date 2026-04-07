import { NextRequest, NextResponse } from "next/server";
import { requireBearerToken } from "@/lib/api/route-auth";
import { openIncident, type WorkflowPayload } from "@/lib/lifesignal/operations";

type OpenIncidentBody = {
  scenario?: string;
  riskLevel?: string;
  monitoredPersonName?: string;
  monitoredPersonId?: string | null;
  workflow?: Partial<WorkflowPayload>;
};

export async function POST(req: NextRequest) {
  const auth = requireBearerToken(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = (await req.json()) as OpenIncidentBody;

    const incident = await openIncident({
      scenario: body.scenario,
      riskLevel: body.riskLevel,
      monitoredPersonName: body.monitoredPersonName,
      monitoredPersonId: body.monitoredPersonId ?? null,
      workflow: body.workflow,
    });

    return NextResponse.json({
      ok: true,
      message: "Incident opened successfully.",
      data: incident,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Failed to open incident." },
      { status: 500 }
    );
  }
}

