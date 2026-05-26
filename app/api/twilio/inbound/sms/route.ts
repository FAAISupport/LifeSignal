import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const from = String(form.get("From") || "").trim();
  const bodyRaw = String(form.get("Body") || "").trim().toLowerCase();

  const supabase = await createClient();
  const db: any = supabase;

  const { data: recipient } = (await db
    .from("care_recipients")
    .select("*")
    .eq("phone", from)
    .single()) as { data: any | null };

  if (!recipient) {
    return new NextResponse("<Response></Response>", {
      headers: { "Content-Type": "text/xml" },
    });
  }

  const { data: checkin } = (await db
    .from("care_checkins")
    .select("*")
    .eq("recipient_id", recipient.id)
    .in("status", ["pending", "escalating"])
    .order("scheduled_for", { ascending: false })
    .limit(1)
    .single()) as { data: any | null };

  if (!checkin) {
    return new NextResponse("<Response></Response>", {
      headers: { "Content-Type": "text/xml" },
    });
  }

  const isConfirm = recipient.confirmation_keywords.includes(bodyRaw);
  const isHelp = recipient.help_keywords.includes(bodyRaw);

  if (isConfirm) {
    await db
      .from("care_checkins")
      .update({
        status: "confirmed",
        confirmed_at: new Date().toISOString(),
      })
      .eq("id", checkin.id);

    await db.from("care_events").insert({
      type: "checkin_confirmed",
      check_in_id: checkin.id,
      recipient_id: recipient.id,
      occurred_at: new Date().toISOString(),
      channel: "sms",
      metadata: { message: bodyRaw },
    });
  }

  if (isHelp) {
    await db
      .from("care_checkins")
      .update({
        status: "help_requested",
        help_requested_at: new Date().toISOString(),
      })
      .eq("id", checkin.id);

    await db.from("care_events").insert({
      type: "checkin_help_requested",
      check_in_id: checkin.id,
      recipient_id: recipient.id,
      occurred_at: new Date().toISOString(),
      channel: "sms",
    });

    await db.from("care_incidents").insert({
      id: crypto.randomUUID(),
      check_in_id: checkin.id,
      recipient_id: recipient.id,
      started_at: new Date().toISOString(),
    });
  }

  return new NextResponse("<Response></Response>", {
    headers: { "Content-Type": "text/xml" },
  });
}



