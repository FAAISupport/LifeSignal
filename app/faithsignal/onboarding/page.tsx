"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { featureCatalog, recommendedFeatureKeys } from "@/lib/feature-catalog";

type FormState = {
  churchName: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  city: string;
  state: string;
  attendanceBand: string;
  carePriorities: string[];
  selectedFeatureKeys: string[];
  memberCount: number;
};

const attendanceBands = [
  "1-75",
  "76-150",
  "151-300",
  "301-600",
  "601+",
];

const carePriorityOptions = [
  "Daily member check-ins",
  "Prayer request follow-up",
  "Pastoral care coordination",
  "Homebound member support",
  "Volunteer response",
  "Leadership visibility",
];

const steps = [
  "Church profile",
  "Care priorities",
  "Recommended setup",
  "Finish",
];

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function toNumericPrice(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

export default function FaithSignalOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [organizationId, setOrganizationId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState<FormState>({
    churchName: "",
    adminName: "",
    adminEmail: "",
    phone: "",
    city: "",
    state: "",
    attendanceBand: "",
    carePriorities: ["Daily member check-ins", "Prayer request follow-up"],
    selectedFeatureKeys: recommendedFeatureKeys,
    memberCount: 25,
  });

  const selectedFeatures = useMemo(() => {
    const selectedSet = new Set(form.selectedFeatureKeys);
    return featureCatalog.filter((feature) => selectedSet.has(feature.key));
  }, [form.selectedFeatureKeys]);

  const monthlyTotal = useMemo(() => {
    const featureTotal = selectedFeatures.reduce(
      (sum, feature) => sum + toNumericPrice(feature.monthlyPrice),
      0
    );

    const memberCoverageTotal =
      form.memberCount > 0 ? form.memberCount * 2.99 : 0;

    return featureTotal + memberCoverageTotal;
  }, [form.memberCount, selectedFeatures]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function togglePriority(priority: string) {
    setForm((current) => {
      const exists = current.carePriorities.includes(priority);

      return {
        ...current,
        carePriorities: exists
          ? current.carePriorities.filter((item) => item !== priority)
          : [...current.carePriorities, priority],
      };
    });
  }

  function toggleFeature(key: string) {
    setForm((current) => {
      const exists = current.selectedFeatureKeys.includes(key);

      return {
        ...current,
        selectedFeatureKeys: exists
          ? current.selectedFeatureKeys.filter((item) => item !== key)
          : [...current.selectedFeatureKeys, key],
      };
    });
  }

  function goNext() {
    setErrorMessage("");
    setCurrentStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function goBack() {
    setErrorMessage("");
    setCurrentStep((current) => Math.max(current - 1, 0));
  }

  async function handleSubmit() {
    setErrorMessage("");
    setSuccessMessage("");

    if (!form.churchName.trim()) {
      setErrorMessage("Church name is required.");
      return;
    }

    if (!form.adminEmail.trim()) {
      setErrorMessage("Admin email is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/faithsignal/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Failed to save onboarding."
        );
      }

      setOrganizationId(data.organizationId || "");
      setSubmitted(true);
      setSuccessMessage("Onboarding saved successfully.");
      setCurrentStep(steps.length - 1);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to save onboarding."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b bg-gradient-to-b from-sky-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-sky-200 bg-white px-4 py-1 text-sm font-medium text-sky-700">
              FaithSignal Onboarding
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Set up your church’s care system
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              This onboarding flow helps you define your church profile, choose
              your care priorities, and launch with a focused FaithSignal setup.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex flex-wrap gap-3">
              {steps.map((step, index) => {
                const active = index === currentStep;
                const complete = index < currentStep;

                return (
                  <div
                    key={step}
                    className={[
                      "rounded-full px-4 py-2 text-sm font-semibold",
                      active
                        ? "bg-sky-600 text-white"
                        : complete
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-600",
                    ].join(" ")}
                  >
                    {index + 1}. {step}
                  </div>
                );
              })}
            </div>

            {currentStep === 0 ? (
              <div>
                <h2 className="text-2xl font-bold">Church profile</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Start with the basics so FaithSignal can frame the right care
                  setup for your church.
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Church name
                    </label>
                    <input
                      type="text"
                      value={form.churchName}
                      onChange={(e) => updateField("churchName", e.target.value)}
                      placeholder="First Baptist Church"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Admin name
                    </label>
                    <input
                      type="text"
                      value={form.adminName}
                      onChange={(e) => updateField("adminName", e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Admin email
                    </label>
                    <input
                      type="email"
                      value={form.adminEmail}
                      onChange={(e) => updateField("adminEmail", e.target.value)}
                      placeholder="admin@church.org"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="(555) 555-5555"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      City
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="The Villages"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      State
                    </label>
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      placeholder="FL"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Attendance band
                    </label>
                    <select
                      value={form.attendanceBand}
                      onChange={(e) =>
                        updateField("attendanceBand", e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
                    >
                      <option value="">Select one</option>
                      {attendanceBands.map((band) => (
                        <option key={band} value={band}>
                          {band}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Active member coverage count
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={1}
                      value={form.memberCount}
                      onChange={(e) => {
                        const parsed = Number.parseInt(e.target.value || "0", 10);
                        updateField(
                          "memberCount",
                          Number.isFinite(parsed) && parsed > 0 ? parsed : 0
                        );
                      }}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {currentStep === 1 ? (
              <div>
                <h2 className="text-2xl font-bold">Care priorities</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Choose the outcomes that matter most so FaithSignal can guide
                  your initial rollout.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {carePriorityOptions.map((priority) => {
                    const selected = form.carePriorities.includes(priority);

                    return (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => togglePriority(priority)}
                        className={[
                          "rounded-3xl border p-5 text-left transition",
                          selected
                            ? "border-sky-500 bg-sky-50"
                            : "border-slate-200 bg-white hover:border-slate-300",
                        ].join(" ")}
                      >
                        <div className="text-base font-semibold">{priority}</div>
                        <div className="mt-2 text-sm text-slate-600">
                          {selected ? "Selected for launch focus" : "Tap to include"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {currentStep === 2 ? (
              <div>
                <h2 className="text-2xl font-bold">Recommended setup</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Start focused. You can always add more later, but this set gives
                  your church a strong initial care system.
                </p>

                <div className="mt-8 grid gap-4">
                  {featureCatalog.map((feature) => {
                    const selected = form.selectedFeatureKeys.includes(feature.key);

                    return (
                      <div
                        key={feature.key}
                        className={[
                          "rounded-3xl border p-5 transition",
                          selected
                            ? "border-sky-500 bg-sky-50"
                            : "border-slate-200 bg-white",
                        ].join(" ")}
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                              {feature.category}
                            </div>
                            <h3 className="mt-2 text-lg font-bold">{feature.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {feature.description}
                            </p>
                          </div>

                          <div className="flex flex-col items-start gap-3 sm:items-end">
                            <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 ring-1 ring-slate-200">
                              {formatMoney(feature.monthlyPrice)}/mo
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleFeature(feature.key)}
                              className={[
                                "rounded-2xl px-4 py-2 text-sm font-semibold transition",
                                selected
                                  ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                                  : "bg-sky-600 text-white hover:bg-sky-700",
                              ].join(" ")}
                            >
                              {selected ? "Remove" : "Add to setup"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {currentStep === 3 ? (
              <div>
                <h2 className="text-2xl font-bold">
                  {submitted ? "Onboarding saved" : "Finish setup"}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {submitted
                    ? "Your church profile and recommended setup are saved. Continue into the dashboard for this exact organization."
                    : "Review your setup and save your onboarding details to keep moving."}
                </p>

                <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <div className="text-sm text-slate-500">Church</div>
                      <div className="mt-1 text-lg font-semibold">
                        {form.churchName || "Not provided yet"}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-slate-500">Admin</div>
                      <div className="mt-1 text-lg font-semibold">
                        {form.adminName || "Not provided yet"}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-slate-500">Email</div>
                      <div className="mt-1 text-lg font-semibold">
                        {form.adminEmail || "Not provided yet"}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-slate-500">Attendance band</div>
                      <div className="mt-1 text-lg font-semibold">
                        {form.attendanceBand || "Not provided yet"}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-slate-500">Care priorities</div>
                      <div className="mt-1 text-lg font-semibold">
                        {form.carePriorities.length > 0
                          ? form.carePriorities.join(", ")
                          : "None selected"}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-slate-500">Selected features</div>
                      <div className="mt-1 text-lg font-semibold">
                        {form.selectedFeatureKeys.length}
                      </div>
                    </div>

                    {organizationId ? (
                      <div className="md:col-span-2">
                        <div className="text-sm text-slate-500">Organization ID</div>
                        <div className="mt-1 break-all text-lg font-semibold">
                          {organizationId}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-6 rounded-2xl bg-white p-5">
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>Estimated monthly total</span>
                      <span className="text-2xl font-bold text-slate-900">
                        {formatMoney(monthlyTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {submitted ? (
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={organizationId ? `/faithsignal/dashboard?org=${encodeURIComponent(organizationId)}` : "/faithsignal/dashboard"}
                      className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Go to dashboard
                    </Link>

                    <Link
                      href={organizationId ? `/faithsignal/success?org=${encodeURIComponent(organizationId)}` : "/faithsignal/success"}
                      className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      View success page
                    </Link>
                  </div>
                ) : null}
              </div>
            ) : null}

            {errorMessage ? (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}

            {successMessage ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {successMessage}
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
              <button
                type="button"
                onClick={goBack}
                disabled={currentStep === 0}
                className={[
                  "rounded-2xl px-5 py-3 text-sm font-semibold transition",
                  currentStep === 0
                    ? "cursor-not-allowed bg-slate-200 text-slate-400"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
                ].join(" ")}
              >
                Back
              </button>

              {currentStep < 2 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Continue
                </button>
              ) : null}

              {currentStep === 2 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Review setup
                </button>
              ) : null}

              {currentStep === 3 && !submitted ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={[
                    "rounded-2xl px-5 py-3 text-sm font-semibold text-white transition",
                    isSubmitting
                      ? "cursor-not-allowed bg-slate-400"
                      : "bg-emerald-600 hover:bg-emerald-700",
                  ].join(" ")}
                >
                  {isSubmitting ? "Saving..." : "Save onboarding"}
                </button>
              ) : null}
            </div>
          </div>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-wide text-sky-700">
                Setup Summary
              </div>

              <h2 className="mt-2 text-2xl font-bold">Launch with confidence</h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                The goal is not to activate everything at once. The goal is to
                launch a practical, trustworthy care system your church will
                actually use.
              </p>

              <div className="mt-6 rounded-2xl bg-white p-4">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Selected features</span>
                  <span>{form.selectedFeatureKeys.length}</span>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                  <span>Care priorities</span>
                  <span>{form.carePriorities.length}</span>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                  <span>Member coverage count</span>
                  <span>{form.memberCount}</span>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between text-base font-bold text-slate-900">
                    <span>Estimated monthly total</span>
                    <span>{formatMoney(monthlyTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm font-semibold text-slate-700">
                  Recommended early wins
                </div>

                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  <li>• Launch one care workflow first</li>
                  <li>• Assign clear owners for alerts and follow-up</li>
                  <li>• Start with members who have the highest need</li>
                  <li>• Review weekly reports with leadership</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
