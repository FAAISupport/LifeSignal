import { NextRequest, NextResponse } from "next/server";
import { requireBearerToken } from "@/lib/api/route-auth";
import { acknowledgeLatestIncident } from "@/lib/lifesignal/operations";

type AcknowledgeBody = {
  scenario?: string;
  actor?: string;
  monitoredPersonName?: string;
};

export async function POST(req: NextRequest) {
  const auth = requireBearerToken(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = (await req.json()) as AcknowledgeBody;

    const incident = await acknowledgeLatestIncident({
      actor: body.actor ?? "guardian",
      scenario: body.scenario,
      monitoredPersonName: body.monitoredPersonName,
    });

    return NextResponse.json({
      ok: true,
      message: "Guardian acknowledgment recorded successfully.",
      data: incident,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Failed to record acknowledgment." },
      { status: 500 }
    );
  }
}
