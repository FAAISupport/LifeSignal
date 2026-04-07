import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { IncidentTable } from "@/components/dashboard/IncidentTable";
import { requireMembership } from "@/lib/auth/org-access";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function IncidentsPage() {
  const membership = await requireMembership();
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("incidents")
    .select("id, member_id, status, severity, opened_at")
    .eq("org_id", membership.org_id)
    .order("opened_at", { ascending: false })
    .limit(100);

  return (
    <DashboardShell title="Incidents">
      <IncidentTable incidents={(data ?? []) as Array<{ id: string; member_id: string; status: string; severity: string; opened_at?: string }>} />
    </DashboardShell>
  );
}




