import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type IncidentRecord = {
  id: string;
  org_id: string;
  member_id: string;
  checkin_id: string | null;
  status: "open" | "acknowledged" | "resolved" | "closed";
  severity: "low" | "medium" | "high" | "critical";
};

export async function findOpenIncidentForCheckin(checkinId: string) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("incidents")
    .select("id, org_id, member_id, checkin_id, status, severity")
    .eq("checkin_id", checkinId)
    .in("status", ["open", "acknowledged"])
    .limit(1)
    .maybeSingle<IncidentRecord>();

  if (error) {
    throw new Error(`Failed to load incident: ${error.message}`);
  }

  return data;
}

export async function createIncident(input: {
  orgId: string;
  memberId: string;
  checkinId: string;
  severity?: IncidentRecord["severity"];
}) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("incidents")
    .insert({
      org_id: input.orgId,
      member_id: input.memberId,
      checkin_id: input.checkinId,
      status: "open",
      severity: input.severity ?? "high",
      opened_at: new Date().toISOString(),
    })
    .select("id, org_id, member_id, checkin_id, status, severity")
    .single<IncidentRecord>();

  if (error) {
    throw new Error(`Failed to create incident: ${error.message}`);
  }

  return data;
}

export async function acknowledgeIncident(input: {
  incidentId: string;
  acknowledgedByUserId: string | null;
}) {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("incidents")
    .update({
      status: "acknowledged",
      acknowledged_at: new Date().toISOString(),
      acknowledged_by_user_id: input.acknowledgedByUserId,
    })
    .eq("id", input.incidentId)
    .in("status", ["open", "acknowledged"])
    .select("id, org_id, member_id, checkin_id, status, severity")
    .maybeSingle<IncidentRecord>();

  if (error) {
    throw new Error(`Failed to acknowledge incident: ${error.message}`);
  }

  return data;
}

