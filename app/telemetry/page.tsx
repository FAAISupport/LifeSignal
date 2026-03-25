import Link from "next/link";

type Snapshot = {
  id: string;
  full_name: string;
  response_rate_7d: number;
  avg_response_minutes_7d: number;
  missed_checkins_7d: number;
  late_responses_7d: number;
  escalations_30d: number;
  guardian_interventions_30d: number;
  risk_score: number;
  risk_level: string;
  trend: string;
  notes: string | null;
  created_at: string;
};

async function getTelemetry(): Promise<Snapshot[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/telemetry`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const json = await res.json();
  return json.snapshots ?? [];
}

function riskBadge(level: string) {
  switch (level) {
    case "high":
      return "bg-rose-500/15 text-rose-300 border-rose-400/20";
    case "elevated":
      return "bg-amber-500/15 text-amber-300 border-amber-400/20";
    case "caution":
      return "bg-yellow-500/15 text-yellow-300 border-yellow-400/20";
    default:
      return "bg-emerald-500/15 text-emerald-300 border-emerald-400/20";
  }
}

export default async function TelemetryPage() {
  const snapshots = await getTelemetry();

  const totals = {
    stable: snapshots.filter((x) => x.risk_level === "stable").length,
    caution: snapshots.filter((x) => x.risk_level === "caution").length,
    elevated: snapshots.filter((x) => x.risk_level === "elevated").length,
    high: snapshots.filter((x) => x.risk_level === "high").length,
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              LifeSignal Intelligence
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Safety telemetry dashboard
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Real-time visibility into routine stability, missed check-ins,
              response patterns, and escalation risk.
            </p>
          </div>

          <div className="flex gap-3">
            <form action="/api/telemetry/seed" method="POST">
              <button
                type="submit"
                className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                Seed demo data
              </button>
            </form>
            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back home
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
            <p className="text-sm uppercase tracking-wide text-emerald-300">Stable</p>
            <p className="mt-3 text-4xl font-bold">{totals.stable}</p>
          </div>
          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-500/10 p-6">
            <p className="text-sm uppercase tracking-wide text-yellow-300">Caution</p>
            <p className="mt-3 text-4xl font-bold">{totals.caution}</p>
          </div>
          <div className="rounded-3xl border border-amber-400/20 bg-amber-500/10 p-6">
            <p className="text-sm uppercase tracking-wide text-amber-300">Elevated</p>
            <p className="mt-3 text-4xl font-bold">{totals.elevated}</p>
          </div>
          <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-6">
            <p className="text-sm uppercase tracking-wide text-rose-300">High</p>
            <p className="mt-3 text-4xl font-bold">{totals.high}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6">
          {snapshots.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300">
              No telemetry snapshots yet. Seed demo data to preview the dashboard.
            </div>
          ) : (
            snapshots.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{item.full_name}</h2>
                    <p className="mt-2 text-slate-400">
                      Trend: <span className="capitalize text-white">{item.trend}</span>
                    </p>
                  </div>

                  <div
                    className={`rounded-2xl border px-4 py-2 text-sm font-semibold uppercase tracking-wide ${riskBadge(
                      item.risk_level
                    )}`}
                  >
                    {item.risk_level} risk · {item.risk_score}/100
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="text-sm text-slate-400">Response rate (7d)</p>
                    <p className="mt-2 text-2xl font-bold">{item.response_rate_7d}%</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="text-sm text-slate-400">Avg response</p>
                    <p className="mt-2 text-2xl font-bold">
                      {item.avg_response_minutes_7d} min
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="text-sm text-slate-400">Missed check-ins (7d)</p>
                    <p className="mt-2 text-2xl font-bold">{item.missed_checkins_7d}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="text-sm text-slate-400">Late responses (7d)</p>
                    <p className="mt-2 text-2xl font-bold">{item.late_responses_7d}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="text-sm text-slate-400">Escalations (30d)</p>
                    <p className="mt-2 text-2xl font-bold">{item.escalations_30d}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="text-sm text-slate-400">Guardian interventions (30d)</p>
                    <p className="mt-2 text-2xl font-bold">
                      {item.guardian_interventions_30d}
                    </p>
                  </div>
                </div>

                {item.notes ? (
                  <div className="mt-4 rounded-2xl border border-sky-400/15 bg-sky-500/10 p-4 text-slate-200">
                    {item.notes}
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
