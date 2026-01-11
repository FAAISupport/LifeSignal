"use server";

// app/dashboard/actions.ts
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
 * Create loved one (DB-only).
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

    if (seniorErr) return { ok: false, error: seniorErr.message };
    const seniorId = seniorRow?.id as string | undefined;
    if (!seniorId) return { ok: false, error: "Failed to create loved one." };

    return { ok: true, data: { seniorId } };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Unexpected error" };
  }
}

/**
 * Update senior settings.
 */
export async function updateSeniorSettings(
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  try {
    const { sb, user } = await requireAuthedUser();
    await requireActiveSubscription(sb, user.id);

    const id = getString(formData, "id");
    if (!id) return { ok: false, error: "Missing id." };

    const name = getString(formData, "name");
    const phone_e164 = getString(formData, "phone_e164");
    const timezone = getString(formData, "timezone");
    const checkin_time = getString(formData, "checkin_time");
    const channel_pref = getString(formData, "channel_pref").toLowerCase();

    if (!name) return { ok: false, error: "Name is required." };
    if (!phone_e164 || !isE164(phone_e164)) {
      return { ok: false, error: "Phone must be E.164 format (e.g. +13525551234)." };
    }
    if (!timezone) return { ok: false, error: "Timezone is required." };
    if (!checkin_time) return { ok: false, error: "Check-in time is required." };
    if (!["sms", "voice", "both"].includes(channel_pref)) {
      return { ok: false, error: "Channel preference must be sms, voice, or both." };
    }

    const { data, error } = await sb
      .from("seniors")
      .update({
        name,
        phone_e164,
        timezone,
        checkin_time,
        channel_pref,
      })
      .eq("id", id)
      .eq("owner_user_id", user.id)
      .select("id")
      .maybeSingle();

    if (error) return { ok: false, error: error.message };
    if (!data?.id) return { ok: false, error: "No rows updated." };

    return { ok: true, data: { id: data.id } };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Unexpected error" };
  }
}

/**
 * Enable monitoring for ONE senior (programmatic)
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
 * Enable monitoring for ALL seniors (programmatic)
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
 * ✅ Form-safe server action for ONE senior (what your page imports)
 * Use in: <form action={activateMonitoringForm}>
 */
export async function activateMonitoringForm(formData: FormData): Promise<void> {
  // Support a few common field names so this doesn't break if the form uses a different one
  const seniorId =
    getString(formData, "seniorId") ||
    getString(formData, "senior_id") ||
    getString(formData, "id");

  if (!seniorId) {
    redirect(`/dashboard?error=${encodeURIComponent("Missing senior id")}`);
  }

  const res = await activateMonitoring(seniorId);

  if (!res.ok) {
    redirect(`/dashboard?error=${encodeURIComponent(res.error)}`);
  }

  redirect(`/dashboard/seniors/${encodeURIComponent(seniorId)}?monitoring=on`);
}

/**
 * ✅ Form-safe server action for ALL seniors
 * Use in: <form action={activateMonitoringAllForm}>
 */
export async function activateMonitoringAllForm(_formData: FormData): Promise<void> {
  const res = await activateMonitoringAll();
  if (!res.ok) {
    redirect(`/dashboard?error=${encodeURIComponent(res.error)}`);
  }
  redirect(`/dashboard?monitoring=all_on`);
}
