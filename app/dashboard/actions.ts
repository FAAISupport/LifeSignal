"use server";

import crypto from "crypto";
import { env } from "@/lib/env";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/auth";

export type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string };

function ok<T>(data: T): ActionResult<T> {
  return { ok: true, data };
}

function fail<T = never>(error: string): ActionResult<T> {
  return { ok: false, error };
}

function isE164(v: string) {
  return /^\+\d{10,15}$/.test((v || "").trim());
}

function isHHMM(v: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test((v || "").trim());
}

// Used by the “Add loved one” wizard page.
// This can return an ActionResult because the page wrapper redirects.
export async function createSeniorAndContacts(formData: FormData): Promise<ActionResult<{ seniorId: string; inviteUrl: string }>> {
  try {
    const user = await requireUser();
    const sb = await supabaseServer();

    const seniorName = String(formData.get("senior_name") ?? "").trim();
    const phone = String(formData.get("phone_e164") ?? "").trim();
    const timezone = String(formData.get("timezone") ?? "America/New_York").trim();
    const checkinTime = String(formData.get("checkin_time") ?? "09:00").trim();
    const channelPref = String(formData.get("channel_pref") ?? "sms").trim();
    const consent = formData.get("consent") === "on" || formData.get("consent") === "true";
    const consentIp = String(formData.get("consent_ip") ?? "").trim();
    const consentVersion = "v1";

    const fcName = String(formData.get("fc_name") ?? "").trim();
    const fcPhone = String(formData.get("fc_phone_e164") ?? "").trim();
    const fcEmail = String(formData.get("fc_email") ?? "").trim();

    if (!seniorName) return fail("Loved one name is required.");
    if (!phone) return fail("Loved one phone number is required.");
    if (!isE164(phone)) return fail("Loved one phone must be E.164 format (example: +13525551234).");
    if (!timezone) return fail("Timezone is required (example: America/New_York).");
    if (!checkinTime || !isHHMM(checkinTime)) return fail("Check-in time must be HH:MM (24h), e.g. 09:00.");
    if (!["sms", "voice", "both"].includes(channelPref)) return fail("Channel preference must be sms, voice, or both.");
    if (!fcName) return fail("Escalation contact name is required.");
    if (!fcPhone && !fcEmail) return fail("Provide at least a phone number or email for the escalation contact.");
    if (fcPhone && !isE164(fcPhone)) return fail("Escalation phone must be E.164 format (example: +13525551234).");
    if (!consent) return fail("Consent is required.");

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
        consent_version: consentVersion,
        enabled: true,
        messaging_enabled: true,
      })
      .select("*")
      .single();

    if (seniorErr) return fail(seniorErr.message);

    const { error: fcErr } = await sb.from("family_contacts").insert({
      senior_id: senior.id,
      name: fcName,
      phone_e164: fcPhone || null,
      email: fcEmail || null,
      verified: false,
      notify_on_miss: true,
      notify_on_help: true,
    });

    if (fcErr) return fail(fcErr.message);

    const token = crypto.randomBytes(18).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString();

    const { error: invErr } = await supabaseAdmin.from("invites").insert({
      token,
      senior_id: senior.id,
      expires_at: expiresAt,
    });

    if (invErr) return fail(invErr.message);

    await supabaseAdmin.from("audit_logs").insert({
      actor_user_id: user.id,
      senior_id: senior.id,
      action: "senior_created",
      metadata: { token_created: true },
    });

    const inviteUrl = `${env.APP_BASE_URL}/dashboard?s=invite&token=${token}`;
    return ok({ seniorId: String(senior.id), inviteUrl });
  } catch (e: any) {
    return fail(e?.message ?? "Unknown error creating loved one.");
  }
}

// IMPORTANT: This MUST return void/Promise<void> so it can be used in <form action={...}>
export async function updateSeniorSettings(formData: FormData): Promise<void> {
  const user = await requireUser();
  const sb = await supabaseServer();

  const id = String(formData.get("id") ?? "").trim();
  const timezone = String(formData.get("timezone") ?? "America/New_York").trim();
  const checkinTime = String(formData.get("checkin_time") ?? "09:00").trim();
  const channelPref = String(formData.get("channel_pref") ?? "sms").trim();
  const waitMinutes = Number(formData.get("wait_minutes") ?? 30);

  if (!id) throw new Error("Missing senior id.");
  if (!timezone) throw new Error("Timezone is required.");
  if (!isHHMM(checkinTime)) throw new Error("Check-in time must be HH:MM (24h), e.g. 09:00.");
  if (!["sms", "voice", "both"].includes(channelPref)) throw new Error("Channel preference must be sms, voice, or both.");
  if (!Number.isFinite(waitMinutes) || waitMinutes < 5 || waitMinutes > 240) {
    throw new Error("Wait window must be between 5 and 240 minutes.");
  }

  const { error } = await sb
    .from("seniors")
    .update({
      timezone,
      checkin_time: checkinTime,
      channel_pref: channelPref,
      wait_minutes: waitMinutes,
    })
    .eq("id", id)
    .eq("owner_user_id", user.id);

  if (error) throw new Error(error.message);
}
