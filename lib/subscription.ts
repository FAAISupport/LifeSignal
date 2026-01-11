import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "paused"
  | "canceled"
  | "inactive"
  | "unknown";

export type SubscriptionRow = {
  user_id: string;
  provider: string | null;
  status: string | null;
  paddle_subscription_id?: string | null;
  metadata?: any;
  updated_at?: string | null;
};

export type SubscriptionInfo = {
  status: SubscriptionStatus;
  isActive: boolean;
  provider: string | null;
  raw?: SubscriptionRow | null;
};

export function normalizeStatus(status: unknown): SubscriptionStatus {
  const s = String(status ?? "").toLowerCase();
  if (s === "active") return "active";
  if (s === "trialing") return "trialing";
  if (s === "past_due") return "past_due";
  if (s === "paused") return "paused";
  if (s === "canceled" || s === "cancelled") return "canceled";
  if (s === "inactive" || s === "none") return "inactive";
  return "unknown";
}

export function isStatusActive(status: SubscriptionStatus) {
  return status === "active" || status === "trialing";
}

export async function getSubscriptionForUser(
  sb: SupabaseClient,
  userId: string
): Promise<SubscriptionInfo> {
  const { data } = await sb
    .from("subscriptions")
    .select("user_id,provider,status,paddle_subscription_id,metadata,updated_at")
    .eq("user_id", userId)
    .maybeSingle();

  const row = (data as any) as SubscriptionRow | null;
  const status = normalizeStatus(row?.status);

  return {
    status,
    isActive: isStatusActive(status),
    provider: row?.provider ?? null,
    raw: row,
  };
}
