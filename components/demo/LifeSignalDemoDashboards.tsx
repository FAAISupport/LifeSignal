"use client";

import { useMemo, useState } from "react";

type DashboardTab = "family" | "senior" | "agency";

type StatCardProps = {
  label: string;
  value: string;
  subtext?: string;
};

function StatCard({ label, value, subtext }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
      <div className="text-xs uppercase tracking-[0.2em] text-sky-300">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
      {subtext ? <div className="mt-2 text-sm text-slate-300">{subtext}</div> : null}
    </div>
  );
}

function SectionCard({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#081224]/90 p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "good" | "warn" | "danger";
}) {
  const styles =
    tone === "good"
      ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/20"
      : tone === "warn"
      ? "bg-amber-500/15 text-amber-300 border-amber-400/20"
      : tone === "danger"
      ? "bg-rose-500/15 text-rose-300 border-rose-400/20"
      : "bg-sky-500/15 text-sky-300 border-sky-400/20";

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles}`}>
      {children}
    </span>
  );
}

function FamilyView() {
  const alerts = [
    { title: "Morning check-in confirmed", time: "8:04 AM", tone: "good" as const },
    { title: "Medication reminder completed", time: "9:00 AM", tone: "good" as const },
    { title: "Response time slower than usual", time: "Yesterday", tone: "warn" as const },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Status Today" value="Checked In" subtext="Confirmed by SMS at 8:04 AM" />
        <StatCard label="Avg Response" value="7 min" subtext="Down from 11 min last week" />
        <StatCard label="Missed This Month" value="2" subtext="Both resolved with follow-up" />
        <StatCard label="Routine Stability" value="Stable" subtext="No major changes detected" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <SectionCard
          title="Monitored Loved One"
          action={<Badge tone="good">Low concern</Badge>}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-slate-300">Name</div>
              <div className="mt-1 text-xl font-semibold text-white">Shari Shaw</div>
              <div className="mt-4 text-sm text-slate-300">Primary contact method</div>
              <div className="mt-1 text-white">SMS daily at 8:00 AM</div>
              <div className="mt-4 text-sm text-slate-300">Last successful response</div>
              <div className="mt-1 text-white">Today at 8:04 AM</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-slate-300">Escalation chain</div>
              <div className="mt-2 space-y-2 text-white">
                <div>1. Judd Spence</div>
                <div>2. Backup caregiver</div>
                <div>3. Local contact</div>
              </div>
              <div className="mt-4 text-sm text-slate-300">Next check-in</div>
              <div className="mt-1 text-white">Tomorrow at 8:00 AM</div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Recent Alerts">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={`${alert.title}-${alert.time}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div>
                  <div className="font-medium text-white">{alert.title}</div>
                  <div className="text-sm text-slate-400">{alert.time}</div>
                </div>
                <Badge tone={alert.tone}>{alert.tone === "good" ? "Resolved" : "Watch"}</Badge>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function SeniorView() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Today" value="You’re Safe" subtext="Check-in completed successfully" />
        <StatCard label="Next Reminder" value="8:00 AM" subtext="Tomorrow morning" />
        <StatCard label="Support" value="Available" subtext="Reply HELP anytime" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr]">
        <SectionCard title="Today’s Check-In" action={<Badge tone="good">Completed</Badge>}>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="text-4xl font-semibold text-white">YES received</div>
            <div className="mt-2 text-slate-300">
              Your daily check-in was completed today at 8:04 AM.
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button className="rounded-xl bg-sky-500 px-4 py-3 font-medium text-white transition hover:bg-sky-400">
                Mark me okay
              </button>
              <button className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 font-medium text-rose-300 transition hover:bg-rose-500/20">
                I need help
              </button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Recent History">
          <div className="space-y-3">
            {[
              "Today · Confirmed at 8:04 AM",
              "Yesterday · Confirmed at 8:11 AM",
              "Mar 22 · Confirmed at 8:08 AM",
              "Mar 21 · Confirmed after reminder at 8:29 AM",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function AgencyView() {
  const queue = [
    { name: "Resident 104", issue: "Missed morning check-in", priority: "High" },
    { name: "Resident 212", issue: "Late medication confirmation", priority: "Medium" },
    { name: "Resident 089", issue: "Escalation acknowledged", priority: "Resolved" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Residents Monitored" value="128" subtext="Across 3 communities" />
        <StatCard label="Missed Today" value="6" subtext="2 unresolved" />
        <StatCard label="Elevated Risk" value="11" subtext="Needs review this week" />
        <StatCard label="Avg Response Time" value="9 min" subtext="Improved by 14%" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr]">
        <SectionCard title="Operations Queue" action={<Badge tone="warn">Needs attention</Badge>}>
          <div className="space-y-3">
            {queue.map((item) => (
              <div
                key={`${item.name}-${item.issue}`}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="mt-1 text-sm text-slate-400">{item.issue}</div>
                  </div>
                  <Badge
                    tone={
                      item.priority === "High"
                        ? "danger"
                        : item.priority === "Medium"
                        ? "warn"
                        : "good"
                    }
                  >
                    {item.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="System Snapshot">
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-slate-300">Escalations triggered today</div>
              <div className="mt-2 text-2xl font-semibold text-white">4</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-slate-300">Caregiver acknowledgements</div>
              <div className="mt-2 text-2xl font-semibold text-white">17</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-slate-300">Incident reports this week</div>
              <div className="mt-2 text-2xl font-semibold text-white">9</div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export default function LifeSignalDemoDashboards() {
  const [tab, setTab] = useState<DashboardTab>("family");

  const content = useMemo(() => {
    if (tab === "senior") return <SeniorView />;
    if (tab === "agency") return <AgencyView />;
    return <FamilyView />;
  }, [tab]);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#020817_0%,#06132a_40%,#0b1730_100%)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <div className="text-sm uppercase tracking-[0.25em] text-sky-300">LifeSignal dashboards</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Calm, clear, action-driven monitoring
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Demo dashboard views for families, seniors, and agencies. These are ready to connect to
            real Supabase data next.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setTab("family")}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
              tab === "family"
                ? "bg-sky-500 text-white"
                : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            Family / Caregiver
          </button>
          <button
            onClick={() => setTab("senior")}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
              tab === "senior"
                ? "bg-sky-500 text-white"
                : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            Senior
          </button>
          <button
            onClick={() => setTab("agency")}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
              tab === "agency"
                ? "bg-sky-500 text-white"
                : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            Agency
          </button>
        </div>

        {content}
      </div>
    </div>
  );
}



