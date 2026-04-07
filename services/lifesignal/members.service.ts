import { createAdminClient } from "@/lib/supabase/admin";

export type MonitoredMember = {
  id: string;
  org_id: string;
  full_name: string;
  phone_e164: string;
  status: "active" | "paused" | "inactive";
};

export async function listActiveMembers(orgId: string) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("monitored_members")
    .select("id, org_id, full_name, phone_e164, status")
    .eq("org_id", orgId)
    .eq("status", "active");

  if (error) {
    throw new Error(`Failed to list members: ${error.message}`);
  }

  return (data ?? []) as MonitoredMember[];
}

export async function getMemberById(memberId: string) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("monitored_members")
    .select("id, org_id, full_name, phone_e164, status")
    .eq("id", memberId)
    .maybeSingle<MonitoredMember>();

  if (error) {
    throw new Error(`Failed to load member: ${error.message}`);
  }

  return data;
}
