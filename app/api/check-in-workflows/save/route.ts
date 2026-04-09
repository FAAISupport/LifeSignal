import { NextRequest, NextResponse } from "next/server";
import { requireBearerToken } from "@/lib/api/route-auth";
import { saveWorkflow, type WorkflowPayload } from "@/lib/lifesignal/operations";

type SaveWorkflowBody = {
  workflow?: WorkflowPayload;
};

export async function POST(req: NextRequest) {
  const auth = requireBearerToken(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = (await req.json()) as SaveWorkflowBody;
    const workflow = body.workflow;

    if (!workflow?.monitoredPersonName || !workflow.timezone || !workflow.scheduleTime) {
      return NextResponse.json(
        { ok: false, error: "Missing required workflow fields." },
        { status: 400 }
      );
    }

    const saved = await saveWorkflow(workflow);

    return NextResponse.json({
      ok: true,
      message: "Workflow saved successfully.",
      data: saved,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Failed to save workflow." },
      { status: 500 }
    );
  }
}
