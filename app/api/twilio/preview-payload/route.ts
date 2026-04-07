import { NextRequest, NextResponse } from "next/server";
import { requireBearerToken } from "@/lib/api/route-auth";
import { buildPreviewPayload, type ScenarioKey, type WorkflowPayload } from "@/lib/lifesignal/operations";

type PreviewBody = {
  scenario?: ScenarioKey;
  selectedRisk?: string;
  workflow?: WorkflowPayload;
};

export async function POST(req: NextRequest) {
  const auth = requireBearerToken(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = (await req.json()) as PreviewBody;

    if (!body.workflow) {
      return NextResponse.json(
        { ok: false, error: "Missing workflow payload." },
        { status: 400 }
      );
    }

    const payload = buildPreviewPayload({
      scenario: body.scenario,
      selectedRisk: body.selectedRisk,
      workflow: body.workflow,
    });

    return NextResponse.json({
      ok: true,
      message: "Twilio payload preview generated.",
      data: payload,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Failed to generate preview payload." },
      { status: 500 }
    );
  }
}
