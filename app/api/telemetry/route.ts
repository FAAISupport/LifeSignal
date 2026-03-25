import { NextResponse } from "next/server";
import { getLatestTelemetrySnapshots } from "@/lib/telemetry";

export async function GET() {
  try {
    const snapshots = await getLatestTelemetrySnapshots(12);
    return NextResponse.json({ ok: true, snapshots });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";

    console.error("/api/telemetry failed:", message);

    return NextResponse.json(
      { ok: false, error: message, snapshots: [] },
      { status: 500 }
    );
  }
}
