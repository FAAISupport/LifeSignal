import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, key);
}

export async function markWaitlistOptInPending(input: {
  phone: string;
  page?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  consentSource?: string | null;
}) {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();

  const { error } = await supabase
    .from("waitlist_entries")
    .update({
      opt_in_status: "pending",
      opt_in_requested_at: now,
      consent: true,
      consent_source: input.consentSource ?? "lifesignal_onboarding_form",
      opt_in_page: input.page ?? null,
      opt_in_ip: input.ip ?? null,
      opt_in_user_agent: input.userAgent ?? null,
      updated_at: now,
    })
    .eq("phone", input.phone);

  if (error) {
    throw new Error(error.message);
  }
}

export async function confirmWaitlistOptIn(input: {
  phone: string;
  messageSid?: string | null;
}) {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();

  const { data: entry, error: lookupError } = await supabase
    .from("waitlist_entries")
    .select("id, phone, opt_in_status")
    .eq("phone", input.phone)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lookupError) {
    throw new Error(lookupError.message);
  }

  if (!entry?.id) {
    return { ok: false, reason: "not_found" as const };
  }

  const { error: updateError } = await supabase
    .from("waitlist_entries")
    .update({
      opt_in_status: "confirmed",
      opt_in_confirmed_at: now,
      opt_in_confirmation_message_sid: input.messageSid ?? null,
      updated_at: now,
    })
    .eq("id", entry.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return { ok: true, id: entry.id };
}
