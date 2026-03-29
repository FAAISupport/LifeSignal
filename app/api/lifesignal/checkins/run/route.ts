import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { runCheckinEngine } from "@/lib/lifesignal/checkin-engine";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const checkinSummary = await runCheckinEngine(new Date());
    return NextResponse.json({ ok: true, checkins: checkinSummary }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to run checkin engine";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
