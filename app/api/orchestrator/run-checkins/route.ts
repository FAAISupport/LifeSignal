import { NextRequest, NextResponse } from "next/server";
import { requireBearerToken } from "@/lib/api/route-auth";
import { runCareOrchestrator } from "@/lib/lifesignal/orchestrator";

export async function POST(req: NextRequest) {
  const auth = requireBearerToken(req);

  if (!auth.ok) {
    return NextResponse.json(
      { ok: false, error: auth.error },
      { status: auth.status }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const limit = typeof body.limit === "number" ? body.limit : 100;

    const result = await runCareOrchestrator({
      limit,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to run care orchestrator.",
      },
      { status: 500 }
    );
  }
}
