"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/auth";

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function err(message: string): ActionResult<never> {
  return { ok: false, error: message };
}
function ok<T>(data: T): ActionResult<T> {
  return { ok: true, data };
}

async function subscriptionActiveForUser(userId: string): Promise<boolean> {
  const sb = await supabaseServer();
  const { data: sub, error } = await sb
    .from("subscriptions")
    .select("status, plan")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) return false;
  if (!sub) return false;
  return ["active", "trialing"].includes(String(sub.status));
}

/**
 * Creates a loved one + (optional) escalation contact.
 * IMPORTANT: Monitoring stays OFF until user activates a plan and clicks "Activate monitoring".
 */
export async function createSeniorAndContacts(
  formData: FormData
): Promise<ActionResult<{ seniorId: string; inviteUrl: string }>> {
  try {
    const user = await requireUser();
    const sb = await supabaseServer();

    const seniorName = String(formData.get("senior_name") ?? "").trim();
    const phone = String(formData.get("phone_e164") ?? "").trim();
    const timezone = String(formData.get("timezone") ?? "America/New_York").trim();
    const checkinTime = String(formData.get("checkin_time") ?? "09:00").trim();
    const channelPref = String(formData.get("channel_pref") ?? "sms").trim();
    const consent = formData.get("consent") === "on";
    const consentIp = String(formData.get("consent_ip") ?? "").trim();
    const consentVersion = "v1";

    const fcName = String(formData.get("fc_name") ?? "").trim();
    const fcPhone = String(formData.get("fc_phone_e164") ?? "").trim();
    const fcEmail = String(formData.get("fc_email") ?? "").trim();

    if (!seniorName) return err("Loved one name is required.");
    if (!phone) return err("Loved one phone (E.164) is required.");
    if (!timezone) return err("Timezone is required.");
    if (!checkinTime) return err("Check-in time is required.");
    if (!["sms", "voice", "both"].includes(channelPref)) {
      return err("Channel preference must be sms, voice, or both.");
    }
    if (!consent) return err("Consent is required.");

    const hasEscalationAny = Boolean(fcName || fcPhone || fcEmail);
    if (hasEscalationAny) {
      if (!fcName) return err("Escalation contact name is required.");
      if (!fcPhone && !fcEmail) return err("Provide an escalation phone or email.");
    }

    // Create loved one with monitoring OFF by default (Plan-gated activation)
    const { data: senior, error: seniorErr } = await sb
      .from("seniors")
      .insert({
        owner_user_id: user.id,
        name: seniorName,
        phone_e164: phone,
        timezone,
        checkin_time: checkinTime,
        channel_pref: channelPref,
        wait_minutes: 30,

        // HARD GATE:
        enabled: false,
        messaging_enabled: false,

        consented_at: new Date().toISOString(),
        consent_ip: consentIp || null,
        consent_version: consentVersion,
      })
      .select("id")
      .single();

    if (seniorErr) return err(seniorErr.message);

    if (hasEscalationAny) {
      const { error: fcErr } = await sb.from("family_contacts").insert({
        senior_id: senior.id,
        name: fcName,
        phone_e164: fcPhone || null,
        email: fcEmail || null,
        verified: false,
        notify_on_miss: true,
        notify_on_help: true,
      });

      if (fcErr) return err(fcErr.message);
    }

    const token = crypto.randomBytes(18).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString();

    const { error: invErr } = await supabaseAdmin.from("invites").insert({
      token,
      senior_id: senior.id,
      expires_at: expiresAt,
    });

    if (invErr) return err(invErr.message);

    await supabaseAdmin.from("audit_logs").insert({
      actor_user_id: user.id,
      senior_id: senior.id,
      action: "senior_created",
      metadata: { token_created: true, monitoring_enabled: false },
    });

    return ok({
      seniorId: senior.id,
      inviteUrl: `${env.APP_BASE_URL}/dashboard?s=invite&token=${token}`,
    });
  } catch (e: any) {
    return err(e?.message ?? "Unknown error creating loved one.");
  }
}

/**
 * Update settings (no return value so it can be used directly as <form action={...}>)
 */
export async function updateSeniorSettings(formData: FormData): Promise<void> {
  const user = await requireUser();
  const sb = await supabaseServer();

  const id = String(formData.get("id") ?? "");
  const timezone = String(formData.get("timezone") ?? "America/New_York").trim();
  const checkinTime = String(formData.get("checkin_time") ?? "09:00").trim();
  const channelPref = String(formData.get("channel_pref") ?? "sms").trim();
  const waitMinutes = Number(formData.get("wait_minutes") ?? 30);

  if (!id) redirect(`/dashboard?error=${encodeURIComponent("Missing loved one id")}`);

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

  if (error) redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);

  redirect(`/dashboard/seniors/${encodeURIComponent(id)}?saved=1`);
}

function requireActivationAcknowledge(formData: FormData) {
  const ack = formData.get("activation_ack") === "on";
  if (!ack) {
    redirect(
      `/dashboard?error=${encodeURIComponent(
        "Please confirm you understand LifeSignal is non-emergency and subscriptions are non-refundable."
      )}`
    );
  }
}

/**
 * Plan-gated activation: turns monitoring ON for a specific loved one.
 * Requires acknowledgement checkbox.
 */
export async function activateMonitoring(formData: FormData): Promise<void> {
  const user = await requireUser();
  const sb = await supabaseServer();

  requireActivationAcknowledge(formData);

  const seniorId = String(formData.get("senior_id") ?? "").trim();
  if (!seniorId) redirect(`/dashboard?error=${encodeURIComponent("Missing loved one id")}`);

  const active = await subscriptionActiveForUser(user.id);
  if (!active) {
    redirect(`/pricing?error=${encodeURIComponent("Choose a plan to activate monitoring.")}`);
  }

  const { error } = await sb
    .from("seniors")
    .update({ enabled: true, messaging_enabled: true })
    .eq("id", seniorId)
    .eq("owner_user_id", user.id);

  if (error) redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);

  redirect(`/dashboard/seniors/${encodeURIComponent(seniorId)}?activated=1`);
}

/**
 * Plan-gated activation: turns monitoring ON for all loved ones owned by the user.
 * Requires acknowledgement checkbox.
 */
export async function activateMonitoringAll(formData: FormData): Promise<void> {
  const user = await requireUser();
  const sb = await supabaseServer();

  requireActivationAcknowledge(formData);

  const active = await subscriptionActiveForUser(user.id);
  if (!active) {
    redirect(`/pricing?error=${encodeURIComponent("Choose a plan to activate monitoring.")}`);
  }

  const { error } = await sb
    .from("seniors")
    .update({ enabled: true, messaging_enabled: true })
    .eq("owner_user_id", user.id);

  if (error) redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);

  redirect(`/dashboard?activated=1`);
}
