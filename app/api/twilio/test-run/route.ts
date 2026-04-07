import { NextRequest, NextResponse } from "next/server";
import { requireBearerToken } from "@/lib/api/route-auth";
import {
  buildPreviewPayload,
  openIncident,
  sendTestSms,
  sendTestVoice,
  type ScenarioKey,
  type WorkflowPayload,
} from "@/lib/lifesignal/operations";

type TestRunBody = {
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
    const body = (await req.json()) as TestRunBody;

    if (!body.workflow) {
      return NextResponse.json({ ok: false, error: "Missing workflow payload." }, { status: 400 });
    }

    const preview = buildPreviewPayload({
      scenario: body.scenario,
      selectedRisk: body.selectedRisk,
      workflow: body.workflow,
    });

    const results: Record<string, unknown> = {
      preview,
    };

    if (body.workflow.monitoredPersonPhone) {
      if (body.workflow.primaryChannel === "sms") {
        results.sms = await sendTestSms({
          to: body.workflow.monitoredPersonPhone,
          body: "LifeSignal test run: primary SMS channel fired successfully.",
        });
      } else {
        results.voice = await sendTestVoice({
          to: body.workflow.monitoredPersonPhone,
          message: "This is a LifeSignal test run. Your primary voice channel fired successfully.",
        });
      }
    }

    if (body.scenario === "critical" || body.scenario === "none") {
      results.incident = await openIncident({
        scenario: body.scenario,
        riskLevel: body.selectedRisk ?? "elevated",
        monitoredPersonId: body.workflow.monitoredPersonId ?? null,
        monitoredPersonName: body.workflow.monitoredPersonName,
        workflow: body.workflow,
      });
    }

    return NextResponse.json({
      ok: true,
      message: `Scenario ${body.scenario ?? "none"} executed successfully.`,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Failed to run scenario." },
      { status: 500 }
    );
  }
}
