import Link from "next/link";

type DemoDashboardPageProps = {
  searchParams?: Promise<{
    role?: string;
  }>;
};

type StatCardProps = {
  eyebrow: string;
  value: string;
  detail: string;
};

type PanelProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function StatCard({ eyebrow, value, detail }: StatCardProps) {
  return (
    <div className="rounded-[28px] border border-sky-400/15 bg-white/[0.04] p-6 shadow-lg shadow-sky-950/20">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
        {eyebrow}
      </p>
      <div className="mt-4 text-4xl font-bold tracking-tight text-white">{value}</div>
      <p className="mt-3 text-base leading-7 text-slate-300">{detail}</p>
    </div>
  );
}

function Panel({ title, subtitle, children }: PanelProps) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-sky-950/20 backdrop-blur sm:p-7">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
          {subtitle ? (
            <p className="mt-1 text-sm leading-6 text-slate-400">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function DemoTabs({ activeRole }: { activeRole: string }) {
  const tabs = [
    { key: "family", label: "LifeSignal Families" },
    { key: "senior", label: "Senior View" },
    { key: "agency", label: "Agency View" },
    { key: "faithsignal", label: "FaithSignal" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab) => {
        const active = activeRole === tab.key;
        return (
          <Link
            key={tab.key}
            href={`/demo-dashboards?role=${tab.key}`}
            className={cn(
              "rounded-full border px-5 py-3 text-sm font-semibold transition",
              active
                ? "border-sky-400/50 bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-sky-400/30 hover:bg-white/[0.07]"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

function FamilyDashboardDemo() {
  const lovedOnes = [
    {
      name: "Mary Spence",
      status: "Checked in",
      detail: "Confirmed by SMS at 8:04 AM",
      risk: "Stable",
      lastMissed: "14 days ago",
    },
    {
      name: "Robert Spence",
      status: "Late response",
      detail: "Reminder sent at 9:42 AM, replied at 10:01 AM",
      risk: "Caution",
      lastMissed: "3 days ago",
    },
  ];

  const timeline = [
    "8:00 AM — Daily check-in sent to Mary by SMS",
    "8:04 AM — Mary confirmed: “YES”",
    "9:30 AM — Robert scheduled check-in went out by voice",
    "9:42 AM — No response, reminder SMS triggered",
    "10:01 AM — Robert confirmed by keypad response",
    "10:05 AM — Family dashboard updated and concern cleared",
  ];

  const guardians = [
    { name: "Judd Spence", role: "Primary family contact", coverage: "SMS + dashboard", status: "Watching" },
    { name: "Shari Shaw", role: "Backup guardian", coverage: "SMS alert", status: "Ready" },
    { name: "Neighbor Helen", role: "Local welfare check", coverage: "Voice escalation", status: "Standby" },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard eyebrow="Status today" value="2 / 2" detail="Both monitored loved ones responded today, with one needing a reminder." />
        <StatCard eyebrow="Avg response" value="12 min" detail="Down from 19 min last week, showing better daily consistency." />
        <StatCard eyebrow="Missed this month" value="2" detail="Both resolved before a full guardian escalation was needed." />
        <StatCard eyebrow="Routine stability" value="Mostly stable" detail="One person is trending later than normal and may need a schedule adjustment." />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <Panel
          title="Monitored loved ones"
          subtitle="A richer family view with daily status, trend awareness, and escalation readiness."
        >
          <div className="space-y-4">
            {lovedOnes.map((person) => (
              <div
                key={person.name}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-semibold text-white">{person.name}</h4>
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold",
                          person.status === "Checked in"
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-amber-500/15 text-amber-300"
                        )}
                      >
                        {person.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{person.detail}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Current risk</p>
                      <p className="mt-2 text-lg font-semibold text-white">{person.risk}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Last missed</p>
                      <p className="mt-2 text-lg font-semibold text-white">{person.lastMissed}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Guardian network"
          subtitle="Who gets notified if something feels off."
        >
          <div className="space-y-4">
            {guardians.map((guardian) => (
              <div
                key={guardian.name}
                className="rounded-[22px] border border-sky-400/15 bg-sky-500/[0.07] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{guardian.name}</p>
                    <p className="mt-1 text-sm text-slate-300">{guardian.role}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-sky-300">
                      {guardian.coverage}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {guardian.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[.95fr_1.05fr]">
        <Panel
          title="Today’s activity timeline"
          subtitle="A realistic family log of what happened, in order."
        >
          <div className="space-y-3">
            {timeline.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Family insight summary"
          subtitle="Why this dashboard is more than just a status board."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-sky-300">Pattern detected</p>
              <p className="mt-3 text-lg font-semibold text-white">Later responses on weekends</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Robert has responded later than usual on the last two weekends. This may be normal, but it is worth watching.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-sky-300">Best next move</p>
              <p className="mt-3 text-lg font-semibold text-white">Adjust Sunday check-in to 10:00 AM</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Reducing false concern improves trust in the system and lowers alert fatigue for family guardians.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.24em] text-sky-300">Why families would pay for this</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                It reduces uncertainty, creates a clear escalation plan, and gives relatives one shared source of truth instead of scattered texts, guesswork, and delayed phone calls.
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}

function FaithSignalDashboardDemo() {
  const careQueue = [
    {
      person: "Margaret Lewis",
      category: "Pastoral care follow-up",
      urgency: "High",
      detail: "Missed check-in after hospital discharge. Daughter notified. Volunteer visit still needed.",
    },
    {
      person: "Daniel Ortiz",
      category: "Recovery accountability",
      urgency: "Moderate",
      detail: "Responded late three times this week. Sponsor notified and encouragement call assigned.",
    },
    {
      person: "Helen Brooks",
      category: "Prayer + care team",
      urgency: "Low",
      detail: "Requested prayer, transportation, and meal support after upcoming procedure.",
    },
  ];

  const volunteerDispatch = [
    { name: "Sarah M.", assignment: "Hospital follow-up visit", eta: "Today, 1:30 PM" },
    { name: "Thomas R.", assignment: "Evening encouragement call", eta: "Tonight, 7:00 PM" },
    { name: "Linda P.", assignment: "Meal train coordination", eta: "Tomorrow, 9:00 AM" },
  ];

  const ministryLanes = [
    { name: "Daily check-ins", value: "48 active" },
    { name: "Prayer requests", value: "11 open" },
    { name: "Discharge follow-ups", value: "4 active" },
    { name: "Recovery accountability", value: "9 enrolled" },
  ];

  const pastoralTimeline = [
    "8:00 AM — Daily member check-ins sent",
    "8:26 AM — Margaret Lewis missed expected response window",
    "8:28 AM — Daughter notified by SMS",
    "8:40 AM — Care coordinator flagged case for same-day volunteer visit",
    "9:05 AM — Prayer team note attached to member record",
    "9:20 AM — Pastor dashboard updated with unresolved follow-up status",
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard eyebrow="Members covered" value="48" detail="Active church members or care recipients currently inside the FaithSignal care loop." />
        <StatCard eyebrow="Care alerts today" value="3" detail="Three people need some level of follow-up, but only one requires urgent attention." />
        <StatCard eyebrow="Volunteer dispatches" value="6" detail="Six care actions were assigned this week across visits, calls, meals, and transport." />
        <StatCard eyebrow="Care ministry health" value="Strong" detail="The ministry is responsive, but hospital discharge follow-up is becoming the biggest demand area." />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
        <Panel
          title="FaithSignal command center"
          subtitle="A dedicated care ministry dashboard, not a recycled family view."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {ministryLanes.map((lane) => (
              <div
                key={lane.name}
                className="rounded-[24px] border border-cyan-400/15 bg-cyan-500/[0.06] p-5"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">{lane.name}</p>
                <p className="mt-3 text-3xl font-bold text-white">{lane.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[24px] border border-indigo-400/20 bg-indigo-500/[0.06] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-indigo-300">Pastoral summary</p>
            <p className="mt-3 text-lg font-semibold text-white">
              One hospital discharge case needs same-day follow-up, while recovery accountability and prayer support remain manageable.
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              This dashboard is built for care pastors, deacons, volunteer coordinators, recovery leaders, and ministry operators who need structured follow-through instead of sticky notes and scattered group texts.
            </p>
          </div>
        </Panel>

        <Panel
          title="Volunteer dispatch board"
          subtitle="Who is going where, and when."
        >
          <div className="space-y-4">
            {volunteerDispatch.map((item) => (
              <div
                key={item.name + item.assignment}
                className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-lg font-semibold text-white">{item.name}</p>
                <p className="mt-1 text-sm text-slate-300">{item.assignment}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-sky-300">{item.eta}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <Panel
          title="Active care queue"
          subtitle="A realistic ministry triage view."
        >
          <div className="space-y-4">
            {careQueue.map((item) => (
              <div
                key={item.person + item.category}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xl font-semibold text-white">{item.person}</p>
                    <p className="mt-1 text-sm text-cyan-300">{item.category}</p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      item.urgency === "High"
                        ? "bg-rose-500/15 text-rose-300"
                        : item.urgency === "Moderate"
                        ? "bg-amber-500/15 text-amber-300"
                        : "bg-emerald-500/15 text-emerald-300"
                    )}
                  >
                    {item.urgency} urgency
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Pastoral event timeline"
          subtitle="From missed response to ministry action."
        >
          <div className="space-y-3">
            {pastoralTimeline.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Prayer lane">
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-200">
              4 requests waiting for assignment to prayer team leaders.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-200">
              2 urgent requests connected to medical recovery and family instability.
            </div>
          </div>
        </Panel>

        <Panel title="Recovery lane">
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-200">
              9 members enrolled in accountability check-ins with sponsor visibility.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-200">
              3 late-response patterns suggest a need for schedule changes and stronger mentor touchpoints.
            </div>
          </div>
        </Panel>

        <Panel title="Benevolence + practical care">
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-200">
              5 transportation needs logged this week, mostly tied to treatment and follow-up appointments.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-200">
              Meal support and visit coordination are the easiest volunteer on-ramps for new ministry helpers.
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}

function SimplePlaceholderDashboard({
  role,
  title,
  description,
}: {
  role: string;
  title: string;
  description: string;
}) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard eyebrow="Demo role" value={role} detail={description} />
        <StatCard eyebrow="Next phase" value="Ready" detail="This demo can be expanded into a fully interactive operational dashboard." />
        <StatCard eyebrow="Data model" value="Supabase-ready" detail="Designed to connect cleanly to live app records and escalation history." />
        <StatCard eyebrow="Status" value="Prototype" detail="Built to prove layout, visibility, and trust at a glance." />
      </div>

      <div className="mt-8">
        <Panel title={title} subtitle={description}>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-slate-200">
            This view is available, but your immediate correction was to separate LifeSignal Families from FaithSignal and make both significantly more detailed.
          </div>
        </Panel>
      </div>
    </>
  );
}

export default async function DemoDashboardsPage({
  searchParams,
}: DemoDashboardPageProps) {
  const params = (await searchParams) ?? {};
  const role = (params.role ?? "family").toLowerCase();

  const intro = {
    family: {
      eyebrow: "LifeSignal family dashboard",
      title: "A real family visibility layer for daily safety and escalation.",
      description:
        "This is the detailed LifeSignal Families demo. It is designed to show loved-one status, response trends, guardian readiness, and the operational timeline families actually care about.",
    },
    faithsignal: {
      eyebrow: "FaithSignal dashboard",
      title: "A dedicated care ministry operating system for churches and connected care teams.",
      description:
        "This is the detailed FaithSignal demo. It is built for pastoral care, recovery accountability, prayer follow-up, volunteer dispatch, discharge support, and structured ministry action.",
    },
    senior: {
      eyebrow: "Senior dashboard",
      title: "Simple confidence for the person being checked on.",
      description:
        "A calmer, simpler dashboard for the monitored person’s own view.",
    },
    agency: {
      eyebrow: "Agency dashboard",
      title: "Operational visibility for teams serving many people at once.",
      description:
        "A higher-level command view for organizations and care operators.",
    },
  }[role] ?? {
    eyebrow: "LifeSignal family dashboard",
    title: "A real family visibility layer for daily safety and escalation.",
    description:
      "This is the detailed LifeSignal Families demo. It is designed to show loved-one status, response trends, guardian readiness, and the operational timeline families actually care about.",
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#020617_0%,#06142e_42%,#07111f_100%)] text-white">
      <section className="border-b border-sky-400/10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.22),transparent_34%),radial-gradient(circle_at_75%_20%,rgba(34,211,238,0.16),transparent_24%)]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-300">
            {intro.eyebrow}
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {intro.title}
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300 sm:text-xl">
            {intro.description}
          </p>

          <div className="mt-8">
            <DemoTabs activeRole={role} />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
          {role === "faithsignal" ? (
            <FaithSignalDashboardDemo />
          ) : role === "family" || role === "caregiver" ? (
            <FamilyDashboardDemo />
          ) : role === "senior" ? (
            <SimplePlaceholderDashboard
              role="Senior"
              title="Senior view"
              description="Built around clarity, ease, and confidence instead of operational overload."
            />
          ) : (
            <SimplePlaceholderDashboard
              role="Agency"
              title="Agency operations view"
              description="Designed for oversight, prioritization, and team coordination at scale."
            />
          )}
        </div>
      </section>
    </main>
  );
}
