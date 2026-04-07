"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChurchFeatureKey,
  allChurchFeatures,
  calculateChurchPricing,
  getChurchTier,
  getGroupedFeatures,
  slugifyChurchName
} from "@/lib/church-demo";

type FormState = {
  churchName: string;
  city: string;
  state: string;
  audienceType: string;
  pilotSize: number;
  checkInTime: string;
  responseWindowMinutes: number;
  escalationDelayMinutes: number;
  coordinatorName: string;
  pastorName: string;
  careMinistryName: string;
  primaryGoal: string;
  notes: string;
  enabledFeatures: ChurchFeatureKey[];
};

const defaultState: FormState = {
  churchName: "",
  city: "The Villages",
  state: "FL",
  audienceType: "Senior-serving church community",
  pilotSize: 35,
  checkInTime: "9:00 AM",
  responseWindowMinutes: 60,
  escalationDelayMinutes: 20,
  coordinatorName: "Judd Spence",
  pastorName: "",
  careMinistryName: "Care Ministry Team",
  primaryGoal: "",
  notes: "",
  enabledFeatures: ["daily_checkins", "weekly_reports", "care_timeline", "sos_help"]
};

const steps = [
  "Church Profile",
  "Pilot Setup",
  "Church OS Modules",
  "Mission & Messaging",
  "Preview"
];

const grouped = getGroupedFeatures();

export default function ChurchDemoWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(defaultState);

  const selectedFeatures = useMemo(
    () => allChurchFeatures.filter((feature) => form.enabledFeatures.includes(feature.key)),
    [form.enabledFeatures]
  );

  const pricing = useMemo(
    () => calculateChurchPricing(form.pilotSize, form.enabledFeatures),
    [form.pilotSize, form.enabledFeatures]
  );

  const tier = useMemo(
    () => getChurchTier(form.enabledFeatures.length),
    [form.enabledFeatures.length]
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleFeature(key: ChurchFeatureKey) {
    setForm((prev) => {
      const exists = prev.enabledFeatures.includes(key);
      return {
        ...prev,
        enabledFeatures: exists
          ? prev.enabledFeatures.filter((item) => item !== key)
          : [...prev.enabledFeatures, key]
      };
    });
  }

  function nextStep() {
    if (step < steps.length - 1) setStep(step + 1);
  }

  function prevStep() {
    if (step > 0) setStep(step - 1);
  }

  function launchDemo() {
    const safeChurchName = form.churchName.trim();
    if (!safeChurchName) {
      alert("Please enter a church name before launching the demo.");
      return;
    }

    const slug = slugifyChurchName(safeChurchName);

    const payload = {
      slug,
      churchName: safeChurchName,
      city: form.city,
      state: form.state,
      audienceType: form.audienceType,
      pilotSize: form.pilotSize,
      checkInTime: form.checkInTime,
      responseWindowMinutes: form.responseWindowMinutes,
      escalationDelayMinutes: form.escalationDelayMinutes,
      coordinatorName: form.coordinatorName,
      pastorName: form.pastorName,
      careMinistryName: form.careMinistryName,
      primaryGoal: form.primaryGoal,
      notes: form.notes,
      enabledFeatures: form.enabledFeatures
    };

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(`churchDemoDraft:${slug}`, JSON.stringify(payload));
    }

    router.push(`/church-demo/${slug}?draft=1`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
              LifeSignal Church OS Builder
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Build a complete church operating model for care
            </h1>
            <p className="mt-3 max-w-3xl text-base text-slate-600">
              Configure a church-specific system that feels like a strategic rollout plan, not just a software demo.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Step <span className="font-semibold text-slate-900">{step + 1}</span> of{" "}
            <span className="font-semibold text-slate-900">{steps.length}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          {steps.map((label, index) => {
            const active = index === step;
            const complete = index < step;
            return (
              <div
                key={label}
                className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                  active
                    ? "border-sky-600 bg-sky-50 text-sky-900"
                    : complete
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-slate-200 bg-slate-50 text-slate-500"
                }`}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {step === 0 && (
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Church profile</h2>
                <p className="mt-2 text-slate-600">
                  Define the church context so the final presentation feels purpose-built.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Church name">
                  <input
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                    value={form.churchName}
                    onChange={(e) => update("churchName", e.target.value)}
                    placeholder="Fairway Christian Church"
                  />
                </Field>

                <Field label="Pastor / leadership contact">
                  <input
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                    value={form.pastorName}
                    onChange={(e) => update("pastorName", e.target.value)}
                    placeholder="Leadership Team"
                  />
                </Field>

                <Field label="City">
                  <input
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                  />
                </Field>

                <Field label="State">
                  <input
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                  />
                </Field>

                <Field label="Audience type">
                  <input
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 sm:col-span-2"
                    value={form.audienceType}
                    onChange={(e) => update("audienceType", e.target.value)}
                    placeholder="Senior-heavy congregation with active care ministry"
                  />
                </Field>
              </div>
            </section>
          )}

          {step === 1 && (
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Pilot setup</h2>
                <p className="mt-2 text-slate-600">
                  Configure how the first phase of rollout should operate.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Suggested pilot size">
                  <input
                    type="number"
                    min={5}
                    max={500}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                    value={form.pilotSize}
                    onChange={(e) => update("pilotSize", Number(e.target.value))}
                  />
                </Field>

                <Field label="Daily check-in time">
                  <input
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                    value={form.checkInTime}
                    onChange={(e) => update("checkInTime", e.target.value)}
                    placeholder="9:00 AM"
                  />
                </Field>

                <Field label="Response window (minutes)">
                  <input
                    type="number"
                    min={5}
                    max={240}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                    value={form.responseWindowMinutes}
                    onChange={(e) => update("responseWindowMinutes", Number(e.target.value))}
                  />
                </Field>

                <Field label="Escalation delay (minutes)">
                  <input
                    type="number"
                    min={5}
                    max={180}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                    value={form.escalationDelayMinutes}
                    onChange={(e) => update("escalationDelayMinutes", Number(e.target.value))}
                  />
                </Field>

                <Field label="Assigned LifeSignal coordinator">
                  <input
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 sm:col-span-2"
                    value={form.coordinatorName}
                    onChange={(e) => update("coordinatorName", e.target.value)}
                    placeholder="Judd Spence"
                  />
                </Field>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Church OS modules</h2>
                <p className="mt-2 text-slate-600">
                  Enable the capabilities this church should see in its system walkthrough.
                </p>
              </div>

              <FeatureGroup
                title="Core Care System"
                subtitle="Essential daily care infrastructure"
                features={grouped.core}
                enabled={form.enabledFeatures}
                onToggle={toggleFeature}
              />

              <FeatureGroup
                title="Pastoral & Care Layer"
                subtitle="Prayer, devotional, and follow-up tools"
                features={[...grouped.care]}
                enabled={form.enabledFeatures}
                onToggle={toggleFeature}
              />

              <FeatureGroup
                title="Engagement Layer"
                subtitle="Connection, attendance, and group-level visibility"
                features={grouped.engagement}
                enabled={form.enabledFeatures}
                onToggle={toggleFeature}
              />

              <FeatureGroup
                title="Health & FaithSignaly Layer"
                subtitle="Support for FaithSignaly and higher-risk members"
                features={grouped.health}
                enabled={form.enabledFeatures}
                onToggle={toggleFeature}
              />

              <FeatureGroup
                title="Advanced Operations Layer"
                subtitle="Dispatch, reporting, early warning, and response coordination"
                features={[...grouped.advanced]}
                enabled={form.enabledFeatures}
                onToggle={toggleFeature}
              />
            </section>
          )}

          {step === 3 && (
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Mission and messaging</h2>
                <p className="mt-2 text-slate-600">
                  Shape the narrative so the demo feels like a strategic proposal for leadership.
                </p>
              </div>

              <div className="grid gap-5">
                <Field label="Care ministry / team name">
                  <input
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                    value={form.careMinistryName}
                    onChange={(e) => update("careMinistryName", e.target.value)}
                    placeholder="Member Care Team"
                  />
                </Field>

                <Field label="Primary goal for this church">
                  <textarea
                    className="min-h-[120px] w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                    value={form.primaryGoal}
                    onChange={(e) => update("primaryGoal", e.target.value)}
                    placeholder="Ensure members living alone receive daily wellness coverage and faster pastoral follow-up."
                  />
                </Field>

                <Field label="Presentation notes / positioning angle">
                  <textarea
                    className="min-h-[140px] w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Emphasize zero app friction, pastoral care consistency, stronger family peace of mind, and measurable ministry outcomes."
                  />
                </Field>
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Preview before launch</h2>
                <p className="mt-2 text-slate-600">
                  Review the generated Church OS model before opening the final presentation.
                </p>
              </div>

              <div className="grid gap-4 rounded-3xl bg-slate-50 p-6 sm:grid-cols-2">
                <PreviewItem label="Church">{form.churchName || "Not set yet"}</PreviewItem>
                <PreviewItem label="Location">{[form.city, form.state].filter(Boolean).join(", ")}</PreviewItem>
                <PreviewItem label="Pilot size">{form.pilotSize} members</PreviewItem>
                <PreviewItem label="Church OS tier">{tier}</PreviewItem>
                <PreviewItem label="Estimated monthly">${pricing.monthly}/month</PreviewItem>
                <PreviewItem label="Estimated annual">${pricing.annual}/year</PreviewItem>
                <PreviewItem label="Per-member cost">${pricing.perMember}</PreviewItem>
                <PreviewItem label="Check-in time">{form.checkInTime}</PreviewItem>
              </div>

              <div className="rounded-3xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900">Enabled modules</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {selectedFeatures.map((feature) => (
                    <span
                      key={feature.key}
                      className="rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800"
                    >
                      {feature.label}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 0}
              className="rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Back
            </button>

            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={launchDemo}
                className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                Launch Church OS Demo
              </button>
            )}
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
            Live model preview
          </p>
          <h2 className="mt-3 text-2xl font-bold">
            {form.churchName || "Your church-specific presentation"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            This live view frames the output as a custom Church OS plan with pricing, rollout structure, and ministry coverage.
          </p>

          <div className="mt-6 space-y-4">
            <SidebarStat label="Tier">{tier}</SidebarStat>
            <SidebarStat label="Pilot">{form.pilotSize} members</SidebarStat>
            <SidebarStat label="Monthly estimate">${pricing.monthly}</SidebarStat>
            <SidebarStat label="Coordinator">{form.coordinatorName}</SidebarStat>
            <SidebarStat label="Core goal">
              {form.primaryGoal || "Define the primary pastoral or member-care objective."}
            </SidebarStat>
          </div>

          <div className="mt-8 rounded-3xl bg-white/5 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              Included modules
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              {selectedFeatures.map((feature) => (
                <li key={feature.key} className="rounded-2xl border border-white/10 px-3 py-2">
                  {feature.label}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FeatureGroup({
  title,
  subtitle,
  features,
  enabled,
  onToggle
}: {
  title: string;
  subtitle: string;
  features: {
    key: ChurchFeatureKey;
    label: string;
    short: string;
    description: string;
    valuePitch: string;
  }[];
  enabled: ChurchFeatureKey[];
  onToggle: (key: ChurchFeatureKey) => void;
}) {
  if (features.length === 0) return null;

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      </div>

      <div className="grid gap-4">
        {features.map((feature) => {
          const checked = enabled.includes(feature.key);
          return (
            <button
              type="button"
              key={feature.key}
              onClick={() => onToggle(feature.key)}
              className={`rounded-3xl border p-5 text-left transition ${
                checked
                  ? "border-sky-600 bg-sky-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">{feature.label}</h4>
                  <p className="mt-1 text-sm text-slate-600">{feature.short}</p>
                  <p className="mt-3 text-sm text-slate-700">{feature.description}</p>
                  <p className="mt-3 text-sm font-medium text-sky-800">
                    Strategic value: {feature.valuePitch}
                  </p>
                </div>
                <div
                  className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full border text-sm font-bold ${
                    checked
                      ? "border-sky-600 bg-sky-600 text-white"
                      : "border-slate-300 bg-white text-slate-400"
                  }`}
                >
                  {checked ? "✓" : "+"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function PreviewItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium text-slate-900">{children}</p>
    </div>
  );
}

function SidebarStat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white">{children}</p>
    </div>
  );
}


