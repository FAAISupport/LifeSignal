"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChurchDemoConfig,
  ChurchFeatureKey,
  calculateChurchPricing,
  getChurchTier,
  getCoverageLabels,
  getFeatureDetails
} from "@/lib/church-demo";

export default function ChurchDemoPresentation({
  presetConfig,
  slug,
  useDraft
}: {
  presetConfig: ChurchDemoConfig | null;
  slug: string;
  useDraft: boolean;
}) {
  const [draftConfig, setDraftConfig] = useState<ChurchDemoConfig | null>(null);

  useEffect(() => {
    if (!useDraft || typeof window === "undefined") return;

    const raw = window.sessionStorage.getItem(`churchDemoDraft:${slug}`);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as ChurchDemoConfig;
      if (parsed?.slug === slug) {
        setDraftConfig(parsed);
      }
    } catch {}
  }, [slug, useDraft]);

  const config = draftConfig ?? presetConfig;

  const features = useMemo(
    () => getFeatureDetails((config?.enabledFeatures ?? []) as ChurchFeatureKey[]),
    [config]
  );

  const pricing = useMemo(
    () => calculateChurchPricing(config?.pilotSize ?? 0, (config?.enabledFeatures ?? []) as ChurchFeatureKey[]),
    [config]
  );

  const tier = useMemo(
    () => getChurchTier(config?.enabledFeatures?.length ?? 0),
    [config]
  );

  const coverage = useMemo(
    () => getCoverageLabels((config?.enabledFeatures ?? []) as ChurchFeatureKey[]),
    [config]
  );

  if (!config) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
            LifeSignal Church Demo
          </p>
          <h1 className="mt-3 text-3xl font-bold">Demo not found</h1>
          <p className="mt-4 text-slate-300">
            This church presentation has not been configured yet. Visit{" "}
            <span className="font-semibold text-white">/church-demo/setup</span> to build one.
          </p>
        </div>
      </main>
    );
  }

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.22),transparent_30%),radial-gradient(circle_at_left,rgba(167,139,250,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
                Custom Church OS Prepared for {config.churchName}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                A modern care and engagement operating system for {config.churchName}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                This walkthrough shows how LifeSignal can be deployed as a full Church OS for
                daily member wellness, pastoral response, ministry visibility, and scalable care coordination.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Badge>{config.city}, {config.state}</Badge>
                <Badge>{config.pilotSize}-member pilot</Badge>
                <Badge>{tier}</Badge>
                <Badge>Prepared on {today}</Badge>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                Executive Summary
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Metric title="Monthly Investment" value={`$${pricing.monthly}`} />
                <Metric title="Annual Investment" value={`$${pricing.annual}`} />
                <Metric title="Per Member" value={`$${pricing.perMember}`} />
                <Metric title="Program Owner" value={config.careMinistryName} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Church OS Tier
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">{tier}</h2>
            <p className="mt-5 text-base leading-7 text-slate-700">
              {config.primaryGoal ||
                `${config.churchName} can use LifeSignal as a structured care layer to improve consistency, visibility, and response across the congregation.`}
            </p>
            <p className="mt-5 text-base leading-7 text-slate-700">
              Audience focus: {config.audienceType}
            </p>
            <p className="mt-5 text-base leading-7 text-slate-700">
              Positioning notes: {config.notes || "Present LifeSignal as a practical, compassionate extension of pastoral care."}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Deployment Path
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              From implementation to full ministry rollout
            </h2>

            <div className="mt-8 space-y-5">
              <TimelineStep
                number="01"
                title="Leadership alignment"
                body={`We align the system around ${config.careMinistryName}, define the pilot audience, and establish how the church wants care workflows to function.`}
              />
              <TimelineStep
                number="02"
                title="Pilot configuration"
                body={`LifeSignal configures ${config.pilotSize} participants, launches check-ins at ${config.checkInTime}, and sets response and escalation timing.`}
              />
              <TimelineStep
                number="03"
                title="Soft validation"
                body="Church leadership and selected responders review the workflow before full pilot activation."
              />
              <TimelineStep
                number="04"
                title="Operational care visibility"
                body="The church begins receiving structured reporting, timeline logging, and response coordination based on enabled modules."
              />
              <TimelineStep
                number="05"
                title="Measured expansion"
                body="Pilot results are reviewed and the system can scale outward into broader ministry and care operations."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Ministry Coverage Map
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                What this Church OS covers
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <CoverageCard title="Care" enabled={coverage.care} />
                <CoverageCard title="Engagement" enabled={coverage.engagement} />
                <CoverageCard title="Health" enabled={coverage.health} />
                <CoverageCard title="Operations" enabled={coverage.operations} />
                <CoverageCard title="Advanced Visibility" enabled={coverage.advanced} />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Investment Overview
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Pricing aligned to scope
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <MetricCard title="Monthly" value={`$${pricing.monthly}`} />
                <MetricCard title="Annual" value={`$${pricing.annual}`} />
                <MetricCard title="Per Member" value={`$${pricing.perMember}`} />
                <MetricCard title="Enabled Modules" value={`${features.length}`} />
              </div>

              <p className="mt-6 text-sm leading-7 text-slate-700">
                The estimate reflects the selected module set, pilot size, and the operational depth of the configured Church OS tier.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Enabled Modules
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Features selected for {config.churchName}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">
            These modules define how the Church OS is presented to leadership and how LifeSignal would operate for this rollout.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.key} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{feature.label}</h3>
              <p className="mt-2 text-sm font-medium text-sky-700">{feature.short}</p>
              <p className="mt-4 text-sm leading-7 text-slate-700">{feature.description}</p>
              <p className="mt-4 text-sm font-medium leading-6 text-slate-900">
                Strategic value: {feature.valuePitch}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Demo Workflow
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                What a member journey looks like
              </h2>

              <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <div className="mx-auto max-w-sm rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="rounded-3xl bg-sky-600 px-4 py-3 text-sm font-medium text-white">
                    LifeSignal
                  </div>
                  <div className="mt-4 rounded-3xl bg-slate-100 px-4 py-4 text-sm text-slate-800">
                    Good morning. Are you okay today? Reply YES to confirm or HELP if you need assistance.
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                      YES → safe, logged, closed
                    </span>
                    <span className="rounded-full bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
                      No reply → retry
                    </span>
                    <span className="rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                      HELP → immediate escalation
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                Impact Projection
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                What leadership gets from this
              </h2>

              <div className="mt-8 space-y-4">
                <DarkStep
                  title="Structured care coverage"
                  body="The church gains a visible, repeatable care process instead of relying on manual memory and informal outreach."
                />
                <DarkStep
                  title="Faster awareness"
                  body="Missed responses, repeated delays, and support needs become easier to detect and act on."
                />
                <DarkStep
                  title="Lower staff burden"
                  body="Automation, reporting, and response coordination allow leadership to scale care without scaling chaos."
                />
                <DarkStep
                  title="Deeper ministry confidence"
                  body={`${config.churchName} can demonstrate measurable care activity while preserving a compassionate ministry tone.`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-slate-950 px-8 py-12 text-white shadow-sm sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
            Next Step
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Launch a church-specific pilot with confidence
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            This presentation helps {config.churchName} leadership see a full operational model, not just a product. It frames LifeSignal as a scalable Church OS for care, response, reporting, and engagement.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/church-demo/setup"
              className="rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
            >
              Build Another Church OS Demo
            </a>
            <a
              href="#"
              className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/5"
            >
              Present This to Leadership
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
      {children}
    </span>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{title}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function CoverageCard({ title, enabled }: { title: string; enabled: boolean }) {
  return (
    <div className={`rounded-3xl border p-5 ${enabled ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <p className={`mt-2 text-lg font-semibold ${enabled ? "text-emerald-700" : "text-slate-500"}`}>
        {enabled ? "Enabled" : "Not Included"}
      </p>
    </div>
  );
}

function TimelineStep({
  number,
  title,
  body
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-700">{body}</p>
      </div>
    </div>
  );
}

function DarkStep({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-300">{body}</p>
    </div>
  );
}


