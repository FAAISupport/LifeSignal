import { NextResponse } from "next/server";
import { env, requireCronToken } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendSms } from "@/lib/twilio";

function authCron(req: Request) {
  const token =
    req.headers.get("x-cron-token") ||
    new URL(req.url).searchParams.get("token") ||
    "";
  return token === requireCronToken();
}

export async function GET(req: Request) {
  if (!authCron(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (!env.TWILIO_FROM_NUMBER) {
    return NextResponse.json(
      { error: "TWILIO_FROM_NUMBER is not set" },
      { status: 500 }
    );
  }

  // Pull pending check-ins up to a safe cap; evaluate wait window per senior
  const oldest = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(); // look back 6h
  const { data: pending } = await supabaseAdmin
    .from("checkins")
    .select("*, seniors(*)")
    .eq("status", "pending")
    .gte("scheduled_for", oldest)
    .limit(500);

  const results: any[] = [];

  for (const row of pending ?? []) {
    const senior = (row as any).seniors;
    if (!senior) continue;

    const wait = Number(senior.wait_minutes ?? 30);
    const cutoff = new Date(Date.now() - wait * 60 * 1000).toISOString();
    if (row.scheduled_for > cutoff) continue;

    const { data: contacts } = await supabaseAdmin
      .from("family_contacts")
      .select("*")
      .eq("senior_id", senior.id)
      .eq("notify_on_miss", true);

    const alertBody = `LifeSignal alert: No response from ${senior.name} for today's check-in. Please check in with them.`;

    try {
      for (const c of contacts ?? []) {
        if (!c.phone_e164) continue;
        const sms = await sendSms(c.phone_e164, alertBody);
        await supabaseAdmin.from("checkin_attempts").insert({
          checkin_id: row.id,
          attempt_type: "family_sms",
          twilio_sid: sms.sid,
          status: "sent",
        });
      }

      await supabaseAdmin.from("checkins").update({ status: "missed" }).eq("id", row.id);

      await supabaseAdmin.from("audit_logs").insert({
        actor_user_id: null,
        senior_id: senior.id,
        action: "checkin_escalated_missed",
        metadata: { checkin_id: row.id, contacts_count: (contacts ?? []).length },
      });

      results.push({ checkin: row.id, senior: senior.id, escalated: true });
    } catch (e: any) {
      results.push({ checkin: row.id, senior: senior.id, error: e?.message ?? "failed escalation" });
    }
  }

  return NextResponse.json({ ok: true, results });
}
