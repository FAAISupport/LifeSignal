"use server";

import { env } from "@/lib/env";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/auth";
import crypto from "crypto";

export async function createSeniorAndContacts(formData: FormData) {
  const user = await requireUser();
  const sb = await supabaseServer();

  const seniorName = String(formData.get("senior_name") ?? "");
  const phone = String(formData.get("phone_e164") ?? "");
  const timezone = String(formData.get("timezone") ?? "America/New_York");
  const checkinTime = String(formData.get("checkin_time") ?? "09:00");
  const channelPref = String(formData.get("channel_pref") ?? "sms");
  const consent = formData.get("consent") === "on";
  const consentIp = String(formData.get("consent_ip") ?? "");
  const consentVersion = "v1";

  const fcName = String(formData.get("fc_name") ?? "");
  const fcPhone = String(formData.get("fc_phone_e164") ?? "");
  const fcEmail = String(formData.get("fc_email") ?? "");

  if (!consent) throw new Error("Consent is required.");

  const { data: senior, error: seniorErr } = await sb
    .from("seniors")
    .insert({
      owner_user_id: user.id,
      name: seniorName,
      phone_e164: phone,
      timezone,
      checkin_time: checkinTime,
      channel_pref: channelPref,
      consented_at: new Date().toISOString(),
      consent_ip: consentIp || null,
      consent_version: consentVersion
    })
    .select("*")
    .single();

  if (seniorErr) throw new Error(seniorErr.message);

  const { error: fcErr } = await sb.from("family_contacts").insert({
    senior_id: senior.id,
    name: fcName,
    phone_e164: fcPhone || null,
    email: fcEmail || null,
    verified: false
  });

  if (fcErr) throw new Error(fcErr.message);

  const token = crypto.randomBytes(18).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString();

  const { error: invErr } = await supabaseAdmin.from("invites").insert({
    token,
    senior_id: senior.id,
    expires_at: expiresAt
  });

  if (invErr) throw new Error(invErr.message);

  await supabaseAdmin.from("audit_logs").insert({
    actor_user_id: user.id,
    senior_id: senior.id,
    action: "senior_created",
    metadata: { token_created: true }
  });

  return { seniorId: senior.id, inviteUrl: `${env.APP_BASE_URL}/dashboard?s=invite&token=${token}` };
}

export async function updateSeniorSettings(formData: FormData) {
  const user = await requireUser();
  const sb = await supabaseServer();

  const id = String(formData.get("id") ?? "");
  const timezone = String(formData.get("timezone") ?? "America/New_York");
  const checkinTime = String(formData.get("checkin_time") ?? "09:00");
  const channelPref = String(formData.get("channel_pref") ?? "sms");
  const waitMinutes = Number(formData.get("wait_minutes") ?? 30);

  const { error } = await sb
    .from("seniors")
    .update({ timezone, checkin_time: checkinTime, channel_pref: channelPref, wait_minutes: waitMinutes })
    .eq("id", id)
    .eq("owner_user_id", user.id);

  if (error) throw new Error(error.message);
}
