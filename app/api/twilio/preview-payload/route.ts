import { NextRequest, NextResponse } from "next/server";
import { requireBearerToken } from "@/lib/api/route-auth";

export async function POST(req: NextRequest) {
  const auth = requireBearerToken(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();

    const { scenario, workflow, selectedRisk, mode } = body || {};

    // Build a realistic Twilio payload preview
    const payload = {
      to: workflow?.monitoredPersonPhone || "+10000000000",
      channel: workflow?.primaryChannel || "sms",
      message:
        mode === "live"
          ? `LifeSignal check-in: Reply YES if safe or HELP if you need assistance.`
          : `TEST MODE: LifeSignal check-in simulation.`,
      escalationMessage: workflow?.escalationMessage,
      scenario,
      riskLevel: selectedRisk,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({
      ok: true,
      message: "Preview payload generated successfully.",
      data: payload,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to build preview payload.",
      },
      { status: 500 }
    );
  }
}
