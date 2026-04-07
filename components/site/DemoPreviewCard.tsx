import React from "react";

type DemoVariant = "families" | "caregivers" | "recover";

type PreviewContent = {
  title: string;
  subtitle: string;
  bullets: string[];
};

const PREVIEW_CONTENT: Record<DemoVariant, PreviewContent> = {
  families: {
    title: "Family Dashboard Preview",
    subtitle:
      "Preview daily check-ins, response history, escalation status, and loved-one activity in one calm, simple view.",
    bullets: ["Daily check-ins", "Response history", "Escalation timeline"],
  },
  caregivers: {
    title: "Caregiver Dashboard Preview",
    subtitle:
      "Track multiple members, monitor missed responses, review alerts, and coordinate follow-up from one operational dashboard.",
    bullets: ["Member queue", "Missed check-ins", "Care coordination"],
  },
  recover: {
    title: "Recovery Dashboard Preview",
    subtitle:
      "Preview pain trends, healing timelines, vitals, and surgical team messaging during recovery.",
    bullets: ["Pain trend chart", "Recovery timeline", "Care team messaging"],
  },
};

export default function DemoPreviewCard({
  variant = "families",
}: {
  variant?: DemoVariant;
}) {
  const content = PREVIEW_CONTENT[variant];

  return (
    <section className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Live Preview
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">
          {content.title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          {content.subtitle}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Status</p>
              <p className="text-lg font-semibold text-slate-900">
                All systems active
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Healthy
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Today
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">14</p>
              <p className="mt-1 text-sm text-slate-600">Completed check-ins</p>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Alerts
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">2</p>
              <p className="mt-1 text-sm text-slate-600">Need follow-up</p>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Response Rate
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">96%</p>
              <p className="mt-1 text-sm text-slate-600">Last 30 days</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4">
          <p className="text-sm font-semibold text-slate-900">
            What this view includes
          </p>
          <ul className="mt-4 space-y-3">
            {content.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" />
                <span className="text-sm text-slate-700">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}


