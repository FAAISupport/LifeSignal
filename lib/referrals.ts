import { randomUUID } from "node:crypto";

import { createAdminClient } from "@/lib/supabase/admin";

export function normalizeReferralCode(input: string | null | undefined) {
  if (!input) return null;
  const value = input.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
  return value.length >= 4 ? value : null;
}

export function generateReferralCode(prefix = "REF") {
  const suffix = randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  return `${prefix}-${suffix}`;
}

export async function persistReferralAttribution(input: {
  orgId: string;
  builderSessionId: string;
  referralCode: string;
  referrerUserId: string;
}) {
  const admin = createAdminClient();

  const code = normalizeReferralCode(input.referralCode);
  if (!code) {
    return { stored: false, reason: "invalid_code" as const };
  }

  const { error } = await admin.from("referrals").upsert(
    {
      org_id: input.orgId,
      referrer_user_id: input.referrerUserId,
      referral_code: code,
      builder_session_id: input.builderSessionId,
      status: "attributed",
      metadata: {
        source: "builder",
      },
    },
    { onConflict: "referral_code" },
  );

  if (error) {
    throw new Error(`Failed to persist referral attribution: ${error.message}`);
  }

  return { stored: true, code };
}
