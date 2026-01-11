// app/dashboard/actions.ts
"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { getSubscriptionForUser } from "@/lib/subscription";

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function getString(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function getBool(fd: FormData, key: string) {
  const v = fd.get(key);
  if (v === null) return false;
  if (typeof v === "string") return v === "on" || v === "true" || v === "1";
  return false;
}

function isE164(phone: string) {
  return /^\+\d{8,15}$/.test(phone);
}

function toIntOrNull(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

async function requireAuthedUser() {
  const sb = await supabaseServer();
  const {
    data: { user },
    error,
  } = await sb.auth.getUser();

  if (error || !user) throw new Error("Not authenticated");
  return { sb, user };
}

async function hasBetaOverride(sb: any, userId: string) {
  // If any senior on the account is flagged beta_override, allow access even without a paid plan.
  // (Keeps your existing cron logic consistent.)
  const { data } = await sb
    .from("seniors")
    .select("id")
    .eq("owner_user_id", userId)
    .eq("beta_override", true)
    .limit(1);

  return Array.isArray(data) && data.length > 0;
}

async function requireActiveSubscription(sb: any, userId: string) {
  // Beta override bypass
  if (await hasBetaOverride(sb, userId)) return;

  const sub = await getSubscriptionForUser(sb as any, userId);
  if (!sub.isActive) {
    throw new Error(
      "An active subscription is required to use this feature. Please choose a plan."
    );
  }
}

/**
 * Create loved one + optional escalation contact (DB-only).
 */
export async function createSeniorAndContacts(
  formData: FormData
): Promise<ActionResult<{ seniorId: string }>> {
  try {
    const { sb, user } = await requireAuthedUser();

    // Lock down: creating loved ones is a paid feature.
    await requireActiveSubscription(sb, user.id);

    const senior_name = getString(formData, "senior_name");
    const phone_e164 = getString(formData, "phone_e164");
    const timezone = getString(formData, "timezone") || "America/New_York";
    const checkin_time = getString(formData, "checkin_time") || "09:00";
    const channel_pref = (getString(formData, "channel_pref") || "sms").toLowerCase();

    const consentChecked = getBool(formData, "consent");
    if (!consentChecked) return { ok: false, error: "Consent is required." };

    if (!senior_name) return { ok: false, error: "Loved one name is required." };
    if (!phone_e164) return { ok: false, error: "Loved one phone is required." };
    if (!isE164(phone_e164)) {
      return { ok: false, error: "Loved one phone must be E.164 format (e.g. +13525551234)." };
    }
    if (!["sms", "voice", "both"].includes(channel_pref)) {
      return { ok: false, error: "Channel preference must be sms, voice, or both." };
    }

    const h = await headers();
    const forwardedFor = h.get("x-forwarded-for") || "";
    const consent_ip = forwardedFor.split(",")[0]?.trim() || null;

    // Canonical ownership + monitoring flag:
    // - seniors.owner_user_id = auth.user.id
    // - seniors.enabled (not monitoring_enabled)
    const { data: seniorRow, error: seniorErr } = await sb
      .from("seniors")
      .insert({
        owner_user_id: user.id,
        name: senior_name,
        phone_e164,
        timezone,
        checkin_time,
        channel_pref,
        enabled: false,
        consented_at: new Date().toISOString(),
        consent_ip,
      })
      .select("id")
      .single();

    if (seniorErr || !seniorRow?.id) {
      return { ok: false, error: seniorErr?.message || "Unable to create loved one." };
    }

    const seniorId = seniorRow.id as string;

    const fc_name = getString(formData, "fc_name");
    const fc_phone_e164 = getString(formData, "fc_phone_e164");
    const fc_email = getString(formData, "fc_email");

    const anyFC = !!(fc_name || fc_phone_e164 || fc_email);
    if (anyFC) {
      if (!fc_name) {
        return { ok: false, error: "Escalation contact name is required if you fill any contact field." };
      }
      if (!fc_phone_e164 && !fc_email) {
        return { ok: false, error: "Escalation contact needs at least a phone or email." };
      }
      if (fc_phone_e164 && !isE164(fc_phone_e164)) {
        return { ok: false, error: "Escalation phone must be E.164 format (e.g. +13524809565)." };
      }

      const { error: fcErr } = await sb.from("family_contacts").insert({
        senior_id: seniorId,
        name: fc_name,
        phone_e164: fc_phone_e164 || null,
        email: fc_email || null,
        kind: "escalation",
        notify_on_miss: true,
      });

      if (fcErr) return { ok: false, error: fcErr.message };
    }

    return { ok: true, data: { seniorId } };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Unexpected error" };
  }
}

/**
 * Update a loved one's settings (DB-only).
 * NOTE: Keeping this available to signed-in users even if subscription expires,
 * so they can correct details or turn things off.
 */
export async function updateSeniorSettings(
  formData: FormData
): Promise<ActionResult<{ seniorId: string }>> {
  try {
    const { sb, user } = await requireAuthedUser();

    const seniorId = getString(formData, "seniorId") || getString(formData, "id");
    if (!seniorId) return { ok: false, error: "Missing seniorId" };

    const name = getString(formData, "name") || getString(formData, "senior_name");
    const phone_e164 = getString(formData, "phone_e164");
    const timezone = getString(formData, "timezone");
    const checkin_time = getString(formData, "checkin_time");
    const channel_pref = (getString(formData, "channel_pref") || "").toLowerCase();
    const wait_minutes_raw = getString(formData, "wait_minutes");

    const patch: Record<string, any> = {};
    if (name) patch.name = name;
    if (phone_e164) {
      if (!isE164(phone_e164)) {
        return { ok: false, error: "Phone must be E.164 format (e.g. +13525551234)." };
      }
      patch.phone_e164 = phone_e164;
    }
    if (timezone) patch.timezone = timezone;
    if (checkin_time) patch.checkin_time = checkin_time;
    if (wait_minutes_raw) {
      const n = toIntOrNull(wait_minutes_raw);
      if (n === null || n < 0 || n > 24 * 60) {
        return { ok: false, error: "Wait minutes must be a number between 0 and 1440." };
      }
      patch.wait_minutes = n;
    }
    if (channel_pref) {
      if (!["sms", "voice", "both"].includes(channel_pref)) {
        return { ok: false, error: "Channel preference must be sms, voice, or both." };
      }
      patch.channel_pref = channel_pref;
    }

    const { data, error } = await sb
      .from("seniors")
      .update(patch)
      .eq("id", seniorId)
      .eq("owner_user_id", user.id)
      .select("id");

    if (error) return { ok: false, error: error.message };
    if (!Array.isArray(data) || data.length === 0) {
      return { ok: false, error: "No rows updated (not found or not authorized)." };
    }

    return { ok: true, data: { seniorId } };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Unexpected error" };
  }
}

/**
 * Programmatic: enable monitoring for one senior.
 */
export async function activateMonitoring(
  seniorId: string
): Promise<ActionResult<{ seniorId: string }>> {
  try {
    const { sb, user } = await requireAuthedUser();
    await requireActiveSubscription(sb, user.id);

    const { data, error } = await sb
      .from("seniors")
      .update({ enabled: true })
      .eq("id", seniorId)
      .eq("owner_user_id", user.id)
      .select("id");

    if (error) return { ok: false, error: error.message };
    if (!Array.isArray(data) || data.length === 0) {
      return { ok: false, error: "No rows updated (not found or not authorized)." };
    }

    return { ok: true, data: { seniorId } };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Unexpected error" };
  }
}

/**
 * Programmatic: enable monitoring for all seniors (returns count).
 */
export async function activateMonitoringAll(): Promise<ActionResult<{ count: number }>> {
  try {
    const { sb, user } = await requireAuthedUser();
    await requireActiveSubscription(sb, user.id);

    const { data, error } = await sb
      .from("seniors")
      .update({ enabled: true })
      .eq("owner_user_id", user.id)
      .select("id");

    if (error) return { ok: false, error: error.message };

    const count = Array.isArray(data) ? data.length : 0;
    if (count === 0) {
      return { ok: false, error: "No rows updated (no seniors found or not authorized)." };
    }

    return { ok: true, data: { count } };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Unexpected error" };
  }
}

/**
 * ✅ Form-safe server actions (return Promise<void>)
 * Use these in <form action={...}>.
 */
export async function activateMonitoringAllForm(_formData: FormData): Promise<void> {
  const res = await activateMonitoringAll();
  if (!res.ok) {
    redirect(`/dashboard?error=${encodeURIComponent(res.error)}`);
  }
  redirect(`/dashboard?monitoring=all_on`);
}
