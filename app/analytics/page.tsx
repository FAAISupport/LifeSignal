import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { requireMembership } from "@/lib/auth/org-access";
import { createClient } from "@/lib/supabase/server";

export default async function AnalyticsPage() {
  const membership = await requireMembership();
  const supabase = await createClient();

  const { data: snapshots } = await supabase
    .from("risk_snapshots")
    .select("risk_score, risk_level")
    .eq("org_id", membership.org_id)
    .order("snapshot_at", { ascending: false })
    .limit(200);

  const total = snapshots?.length ?? 0;
  const averageScore = total > 0 ? (snapshots ?? []).reduce((sum, item) => sum + Number(item.risk_score), 0) / total : 0;
  const highRisk = (snapshots ?? []).filter((item) => item.risk_level === "high" || item.risk_level === "critical").length;

  return (
    <DashboardShell title="Analytics">
      <MetricsCards
        metrics={[
          { label: "Snapshots", value: String(total) },
          { label: "Avg Risk Score", value: averageScore.toFixed(1) },
          { label: "High/Critical", value: String(highRisk) },
          { label: "Coverage", value: `${Math.min(100, total)}%`, helper: "Based on recent records" },
        ]}
      />
    </DashboardShell>
  );
}
