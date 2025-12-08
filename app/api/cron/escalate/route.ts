import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { twilioClient, TWILIO_FROM } from "@/lib/twilio";

const GRACE_MINUTES = 15;

export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date();
  const cutoff = new Date(now.getTime() - GRACE_MINUTES * 60 * 1000);

  const { data: pending, error } = await supabaseAdmin
    .from("checkins")
    .select("id, senior_id, scheduled_for, status")
    .eq("status", "pending")
    .lte("scheduled_for", cutoff.toISOString());

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  for (const checkin of pending ?? []) {
    const { data: senior, error: sErr } = await supabaseAdmin
      .from("seniors")
      .select("*")
      .eq("id", checkin.senior_id)
      .single();

    if (sErr || !senior) {
      console.error(sErr);
      continue;
    }

    const { data: links, error: lErr } = await supabaseAdmin
      .from("senior_caregiver_links")
      .select("caregiver_id")
      .eq("senior_id", senior.id);

    if (lErr || !links?.length) {
      console.error(lErr);
      continue;
    }

    const caregiverIds = links.map((l: any) => l.caregiver_id);

    const { data: caregivers, error: cgErr } = await supabaseAdmin
      .from("caregivers")
      .select("*")
      .in("id", caregiverIds);

    if (cgErr || !caregivers?.length) {
      console.error(cgErr);
      continue;
    }

    const scheduledTime = new Date(checkin.scheduled_for).toLocaleTimeString(
      undefined,
      { hour: "numeric", minute: "2-digit" }
    );

    for (const cg of caregivers) {
      const body = `LifeSignal Alert: We couldn't confirm that ${senior.full_name} is okay. Last check-in time was ${scheduledTime}. Please call or check on them now.`;

      try {
        await twilioClient.messages.create({
          from: TWILIO_FROM,
          to: cg.phone,
          body,
        });
      } catch (smsErr) {
        console.error("Twilio error (escalate)", smsErr);
      }
    }

    await supabaseAdmin
      .from("checkins")
      .update({
        status: "escalated",
        responded_at: new Date().toISOString(),
      })
      .eq("id", checkin.id);
  }

  return NextResponse.json({ ok: true });
}
