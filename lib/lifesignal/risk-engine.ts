import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function refreshRiskSnapshotsForOrg(orgId: string) {
  const admin = createSupabaseAdminClient();

  const { data: members, error: membersError } = await admin
    .from("monitored_members")
    .select("id")
    .eq("org_id", orgId)
    .eq("status", "active");

  if (membersError) {
    throw new Error(`Failed to load members for risk snapshot: ${membersError.message}`);
  }

  let created = 0;

  for (const member of members ?? []) {
    const { data: incidents } = await admin
      .from("incidents")
      .select("id, severity, status")
      .eq("org_id", orgId)
      .eq("member_id", member.id)
      .order("created_at", { ascending: false })
      .limit(20);

    const openIncidents = (incidents ?? []).filter((item) => item.status === "open").length;
    const criticalIncidents = (incidents ?? []).filter((item) => item.severity === "critical").length;

    const score = Math.min(100, openIncidents * 20 + criticalIncidents * 25);
    const level = score >= 75 ? "critical" : score >= 50 ? "high" : score >= 25 ? "medium" : "low";

    const { error: insertError } = await admin.from("risk_snapshots").insert({
      org_id: orgId,
      member_id: member.id,
      risk_score: score,
      risk_level: level,
      factors: {
        openIncidents,
        criticalIncidents,
      },
      snapshot_at: new Date().toISOString(),
    });

    if (insertError) {
      throw new Error(`Failed to insert risk snapshot: ${insertError.message}`);
    }

    created += 1;
  }

  return { created };
}

