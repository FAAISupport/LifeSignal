import Link from "next/link";
import {
  HeartHandshake,
  Stethoscope,
  CheckCircle2,
  Building2,
  ArrowRight
} from "lucide-react";

type DemoRole = "family" | "caregiver" | "recover" | "postop" | "agency";

const roleMeta: Record<
  DemoRole,
  {
    title: string;
    subtitle: string;
    icon: typeof HeartHandshake;
    color: string;
    bullets: string[];
  }
> = {
  family: {
    title: "Family Dashboard Preview",
    subtitle:
      "Show families exactly how daily reassurance, loved one visibility, and missed check-in alerts work.",
    icon: HeartHandshake,
    color: "from-sky-500 to-cyan-400",
    bullets: ["Loved one status", "Alerts", "Messages"]
  },
  caregiver: {
    title: "Caregiver Dashboard Preview",
    subtitle:
      "Preview care boards, medication workflows, notes, and escalation management for professional caregivers.",
    icon: Stethoscope,
    color: "from-violet-500 to-fuchsia-400",
    bullets: ["Care board", "Medication", "Escalations"]
  },
  recover: {
    title: "Recover Dashboard Preview",
    subtitle:
      "Show sobriety tracking, meeting cadence, sponsor messaging, and trigger monitoring in one place.",
    icon: CheckCircle2,
    color: "from-amber-500 to-orange-400",
    bullets: ["Streak chart", "Meeting calendar", "Sponsor thread"]
  },
  postop: {
    title: "PostOP Dashboard Preview",
    subtitle:
      "Preview pain trends, healing timelines, vitals, and surgical team messaging during recovery.",
    icon: Stethoscope,
    color: "from-rose-500 to-pink-400",
    bullets: ["Pain trend", "Healing timeline", "Vitals"]
  },
  agency: {
    title: "Agency Dashboard Preview",
    subtitle:
      "Show operators the portfolio view across programs, staff, reporting, and rollout visibility.",
    icon: Building2,
    color: "from-emerald-500 to-teal-400",
    bullets: ["Programs", "Reporting", "Operations"]
  }
};

export default function DemoPreviewCard({ role }: { role: DemoRole }) {
  const meta = roleMeta[role];
  const Icon = meta.icon;

  return (
    <section className="border-t border-white/10 bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl shadow-sky-950/20">
          <div className={`bg-gradient-to-r ${meta.color} p-8 text-white md:p-10`}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                  <Icon className="h-4 w-4" />
                  Interactive product preview
                </div>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                  {meta.title}
                </h2>
                <p className="mt-4 text-lg leading-8 text-white/90">
                  {meta.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {meta.bullets.map((bullet) => (
                    <span
                      key={bullet}
                      className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur"
                    >
                      {bullet}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href={`/demo-dashboards?role=${role}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  View live dashboard
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4 bg-slate-950/60 p-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Preview Benefit
              </div>
              <p className="mt-3 text-base leading-7 text-slate-200">
                Let visitors see the actual dashboard experience instead of imagining it.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Sales Utility
              </div>
              <p className="mt-3 text-base leading-7 text-slate-200">
                Perfect for demos, outbound sales, investor walkthroughs, and beta recruitment.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                User Action
              </div>
              <p className="mt-3 text-base leading-7 text-slate-200">
                Clicking the button opens the matching role inside the interactive demo environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
