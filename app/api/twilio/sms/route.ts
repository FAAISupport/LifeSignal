import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { parseStop, parseYes } from "@/lib/utils";

export async function POST(req: Request) {
  const form = await req.formData();
  const from = String(form.get("From") ?? "");
  const to = String(form.get("To") ?? "");
  const body = String(form.get("Body") ?? "");
  const sid = String(form.get("MessageSid") ?? "");

  await supabaseAdmin.from("messages").insert({
    direction: "in",
    from_e164: from,
    to_e164: to,
    body,
    twilio_sid: sid,
    raw_payload: Object.fromEntries(form.entries())
  });

  const { data: senior } = await supabaseAdmin.from("seniors").select("*").eq("phone_e164", from).maybeSingle();
  if (!senior) return NextResponse.json({ ok: true });

  if (parseStop(body)) {
    await supabaseAdmin.from("seniors").update({ messaging_enabled: false }).eq("id", senior.id);
    await supabaseAdmin.from("audit_logs").insert({
      actor_user_id: null,
      senior_id: senior.id,
      action: "sms_opt_out",
      metadata: { from, body }
    });
    return NextResponse.json({ ok: true });
  }

  const isYes = parseYes(body);
  if (!isYes) {
    await supabaseAdmin.from("audit_logs").insert({
      actor_user_id: null,
      senior_id: senior.id,
      action: "sms_unrecognized",
      metadata: { from, body }
    });
    return NextResponse.json({ ok: true });
  }

  const { data: checkin } = await supabaseAdmin
    .from("checkins")
    .select("*")
    .eq("senior_id", senior.id)
    .eq("status", "pending")
    .order("scheduled_for", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (checkin) {
    await supabaseAdmin
      .from("checkins")
      .update({
        status: "responded_ok",
        responded_at: new Date().toISOString(),
        response_type: "sms_yes",
        channel: "sms"
      })
      .eq("id", checkin.id);

    await supabaseAdmin.from("checkin_attempts").insert({
      checkin_id: checkin.id,
      attempt_type: "sms",
      twilio_sid: sid,
      status: "received"
    });

    await supabaseAdmin.from("audit_logs").insert({
      actor_user_id: null,
      senior_id: senior.id,
      action: "checkin_responded_ok",
      metadata: { via: "sms", sid }
    });
  }

  return NextResponse.json({ ok: true });
}
