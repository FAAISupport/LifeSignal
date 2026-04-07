import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { requireMembership } from "@/lib/auth/org-access";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type RiskSnapshotRow = {
  risk_score: number | string | null;
  risk_level: string | null;
};

export default async function AnalyticsPage() {
  const membership = await requireMembership();
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("risk_snapshots")
    .select("risk_score, risk_level")
    .eq("org_id", membership.org_id)
    .order("snapshot_at", { ascending: false })
    .limit(200);

  if (error) {
    return (
      <DashboardShell
        title="Analytics"
        description="Risk and incident trends for your workspace."
      >
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          Failed to load analytics data.
        </div>
      </DashboardShell>
    );
  }

  const snapshots: RiskSnapshotRow[] = Array.isArray(data)
    ? (data as RiskSnapshotRow[])
    : [];

  const total = snapshots.length;

  const averageScore =
    total > 0
      ? snapshots.reduce((sum, item) => sum + Number(item.risk_score ?? 0), 0) / total
      : 0;

  const highRisk = snapshots.filter(
    (item) => item.risk_level === "high" || item.risk_level === "critical"
  ).length;

  const cautionRisk = snapshots.filter(
    (item) => item.risk_level === "caution" || item.risk_level === "elevated"
  ).length;

  const stableRisk = snapshots.filter(
    (item) => item.risk_level === "stable" || item.risk_level === "low"
  ).length;

  return (
    <DashboardShell
      title="Analytics"
      description="Risk and incident trends for your workspace."
    >
      <MetricsCards
        metrics={[
          {
            label: "Snapshots",
            value: total.toString(),
          },
          {
            label: "Average Risk Score",
            value: averageScore.toFixed(1),
          },
          {
            label: "High Risk",
            value: highRisk.toString(),
          },
          {
            label: "Stable",
            value: stableRisk.toString(),
          },
        ]}
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">High / Critical</h2>
          <p className="mt-2 text-3xl font-bold text-zinc-900">{highRisk}</p>
          <p className="mt-1 text-sm text-zinc-500">
            Records currently flagged at the highest concern levels.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Caution / Elevated</h2>
          <p className="mt-2 text-3xl font-bold text-zinc-900">{cautionRisk}</p>
          <p className="mt-1 text-sm text-zinc-500">
            Entries that may need follow-up soon.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Stable / Low</h2>
          <p className="mt-2 text-3xl font-bold text-zinc-900">{stableRisk}</p>
          <p className="mt-1 text-sm text-zinc-500">
            Lower-risk entries in the recent dataset.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}

