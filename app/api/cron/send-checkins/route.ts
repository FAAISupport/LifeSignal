import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { twilioClient, TWILIO_FROM } from "@/lib/twilio";
import { isWithinWindow } from "@/lib/timeWindow";
import { randomUUID } from "crypto";

const WINDOW_MINUTES = 10;

export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date();

  const { data: seniors, error } = await supabaseAdmin
    .from("seniors")
    .select("*");

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const baseUrl = process.env.APP_BASE_URL!;

  for (const s of seniors ?? []) {
    const scheduled = new Date(now);
    scheduled.setHours(s.checkin_hour, s.checkin_minute, 0, 0);

    if (!isWithinWindow(scheduled, now, WINDOW_MINUTES)) continue;

    const { data: existing, error: exErr } = await supabaseAdmin
      .from("checkins")
      .select("id")
      .eq("senior_id", s.id)
      .gte("scheduled_for", scheduled.toISOString());

    if (exErr) {
      console.error(exErr);
      continue;
    }
    if (existing && existing.length > 0) continue;

    const token = randomUUID();

    const { error: insErr } = await supabaseAdmin
      .from("checkins")
      .insert({
        senior_id: s.id,
        scheduled_for: scheduled.toISOString(),
        token,
      });

    if (insErr) {
      console.error(insErr);
      continue;
    }

    const url = `${baseUrl}/checkin?token=${token}`;
    const body = `LifeSignal check-in for ${s.full_name}: Please tap this link to confirm you're okay: ${url}`;

    try {
      await twilioClient.messages.create({
        from: TWILIO_FROM,
        to: s.phone,
        body,
      });
    } catch (smsErr) {
      console.error("Twilio error", smsErr);
    }
  }

  return NextResponse.json({ ok: true });
}
