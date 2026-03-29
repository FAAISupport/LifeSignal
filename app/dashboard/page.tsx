import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { requireMembership } from "@/lib/auth/org-access";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const membership = await requireMembership();
  const supabase = await createClient();

  const [{ count: memberCount }, { count: openIncidents }, { count: pendingCheckins }] = await Promise.all([
    supabase.from("monitored_members").select("id", { count: "exact", head: true }).eq("org_id", membership.org_id),
    supabase.from("incidents").select("id", { count: "exact", head: true }).eq("org_id", membership.org_id).eq("status", "open"),
    supabase.from("checkins").select("id", { count: "exact", head: true }).eq("org_id", membership.org_id).in("status", ["pending", "sent"]),
  ]);

  return (
    <DashboardShell title="Dashboard">
      <MetricsCards
        metrics={[
          { label: "Monitored Members", value: String(memberCount ?? 0) },
          { label: "Open Incidents", value: String(openIncidents ?? 0) },
          { label: "Pending Check-ins", value: String(pendingCheckins ?? 0) },
          { label: "Your Role", value: membership.role },
        ]}
      />
    </DashboardShell>
  );
}
