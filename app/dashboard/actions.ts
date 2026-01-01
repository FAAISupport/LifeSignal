"use server";

import { env } from "@/lib/env";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/auth";
import crypto from "crypto";
import { redirect } from "next/navigation";

type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function cleanStr(v: unknown) {
  return String(v ?? "").trim();
}

function isE164(phone: string) {
  return /^\+\d{10,15}$/.test(phone);
}

function safeBaseUrl() {
  const base = cleanStr(env.APP_BASE_URL || process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_APP_BASE_URL);
  return base.replace(/\/+$/, "");
}

/**
 * Used by the "New loved one" wizard page.
 * Returns ok/data so the page can redirect with a friendly error message.
 */
export async function createSeniorAndContacts(
  formData: FormData
): Promise<ActionResult<{ seniorId: string; inviteUrl: string }>> {
  try {
    const user = await requireUser();
    const sb = await supabaseServer();

    const seniorName = cleanStr(formData.get("senior_name"));
    const phone = cleanStr(formData.get("phone_e164"));
    const timezone = cleanStr(formData.get("timezone")) || "America/New_York";
    const checkinTime = cleanStr(formData.get("checkin_time")) || "09:00";
    const channelPref = cleanStr(formData.get("channel_pref")) || "sms";
    const consent = formData.get("consent") === "on";
    const consentIp = cleanStr(formData.get("consent_ip"));
    const consentVersion = "v1";

    const fcName = cleanStr(formData.get("fc_name"));
    const fcPhone = cleanStr(formData.get("fc_phone_e164"));
    const fcEmail = cleanStr(formData.get("fc_email"));

    if (!consent) return { ok: false, error: "Consent is required." };
    if (!seniorName) return { ok: false, error: "Please enter your loved one’s name." };
    if (!phone) return { ok: false, error: "Please enter a phone number." };
    if (!isE164(phone)) return { ok: false, error: "Phone must be in E.164 format (example: +13525551234)." };

    if (!timezone) return { ok: false, error: "Please enter a timezone (example: America/New_York)." };
    if (!checkinTime) return { ok: false, error: "Please enter a check-in time (example: 09:00)." };

    if (!fcName) return { ok: false, error: "Please enter an escalation contact name." };
    if (!fcPhone && !fcEmail) {
      return { ok: false, error: "Please provide at least a phone or email for the escalation contact." };
    }
    if (fcPhone && !isE164(fcPhone)) {
      return { ok: false, error: "Escalation phone must be in E.164 format (example: +13525551234)." };
    }

    const { data: senior, error: seniorErr } = await sb
      .from("seniors")
      .insert({
        owner_user_id: user.id,
        name: seniorName,
        phone_e164: phone,
        timezone,
        checkin_time: checkinTime,
        channel_pref: channelPref,
        enabled: true,
        messaging_enabled: true,
        consented_at: new Date().toISOString(),
        consent_ip: consentIp || null,
        consent_version: consentVersion,
      })
      .select("id")
      .single();

    if (seniorErr || !senior?.id) {
      return { ok: false, error: seniorErr?.message || "Failed to create loved one." };
    }

    const { error: fcErr } = await sb.from("family_contacts").insert({
      senior_id: senior.id,
      name: fcName,
      phone_e164: fcPhone || null,
      email: fcEmail || null,
      verified: false,
    });

    if (fcErr) return { ok: false, error: fcErr.message };

    const token = crypto.randomBytes(18).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString();

    const { error: invErr } = await supabaseAdmin.from("invites").insert({
      token,
      senior_id: senior.id,
      expires_at: expiresAt,
    });

    if (invErr) return { ok: false, error: invErr.message };

    await supabaseAdmin.from("audit_logs").insert({
      actor_user_id: user.id,
      senior_id: senior.id,
      action: "senior_created",
      metadata: { token_created: true },
    });

    const base = safeBaseUrl();
    const inviteUrl = base
      ? `${base}/dashboard?s=invite&token=${token}`
      : `/dashboard?s=invite&token=${token}`;

    return { ok: true, data: { seniorId: senior.id, inviteUrl } };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Unexpected error" };
  }
}

/**
 * MUST return void for <form action={updateSeniorSettings}>
 * On error: redirect back to the same page with a message.
 */
export async function updateSeniorSettings(formData: FormData): Promise<void> {
  const user = await requireUser();
  const sb = await supabaseServer();

  const id = cleanStr(formData.get("id"));
  const timezone = cleanStr(formData.get("timezone")) || "America/New_York";
  const checkinTime = cleanStr(formData.get("checkin_time")) || "09:00";
  const channelPref = cleanStr(formData.get("channel_pref")) || "sms";
  const waitMinutesRaw = Number(formData.get("wait_minutes") ?? 30);
  const waitMinutes = Number.isFinite(waitMinutesRaw) ? waitMinutesRaw : 30;

  if (!id) {
    redirect("/dashboard?error=" + encodeURIComponent("Missing loved one id."));
  }

  // Best-effort: find the seniorId page to redirect back to on failure/success
  const backTo = `/dashboard/seniors/${encodeURIComponent(id)}`;

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

  if (error) {
    redirect(backTo + "?error=" + encodeURIComponent(error.message));
  }

  redirect(backTo + "?saved=1");
}
