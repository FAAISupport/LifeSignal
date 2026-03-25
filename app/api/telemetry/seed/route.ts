import { NextResponse } from "next/server";
import { createTelemetrySnapshot } from "@/lib/telemetry";

export async function POST() {
  try {
    const rows = [
      {
        fullName: "Mary Thompson",
        phoneE164: "+13525550101",
        responseRate7d: 100,
        responseRate30d: 96,
        avgResponseMinutes7d: 6,
        avgResponseMinutes30d: 8,
        missedCheckins7d: 0,
        missedCheckins30d: 1,
        lateResponses7d: 1,
        lateResponses30d: 2,
        escalations7d: 0,
        escalations30d: 0,
        guardianInterventions30d: 0,
        trend: "improving",
        notes: "Stable routine with minor late response activity.",
      },
      {
        fullName: "James Walker",
        phoneE164: "+13525550102",
        responseRate7d: 71,
        responseRate30d: 83,
        avgResponseMinutes7d: 34,
        avgResponseMinutes30d: 21,
        missedCheckins7d: 2,
        missedCheckins30d: 4,
        lateResponses7d: 3,
        lateResponses30d: 6,
        escalations7d: 1,
        escalations30d: 2,
        guardianInterventions30d: 1,
        trend: "declining",
        notes: "Pattern change detected over the last week.",
      },
      {
        fullName: "Linda Perez",
        phoneE164: "+13525550103",
        responseRate7d: 86,
        responseRate30d: 90,
        avgResponseMinutes7d: 14,
        avgResponseMinutes30d: 12,
        missedCheckins7d: 1,
        missedCheckins30d: 2,
        lateResponses7d: 2,
        lateResponses30d: 3,
        escalations7d: 0,
        escalations30d: 1,
        guardianInterventions30d: 1,
        trend: "stable",
        notes: "Moderate caution, but no immediate escalation trend.",
      },
    ];

    const inserted = [];
    for (const row of rows) {
      inserted.push(await createTelemetrySnapshot(row));
    }

    return NextResponse.json({
      ok: true,
      insertedCount: inserted.length,
      inserted,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";

    console.error("/api/telemetry/seed failed:", message);

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
