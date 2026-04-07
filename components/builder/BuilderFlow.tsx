"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { BUILDER_MODULES, ModuleSelector } from "@/components/builder/ModuleSelector";
import { NeedsAssessment, type NeedsAssessmentValue } from "@/components/builder/NeedsAssessment";
import { PricingEngine, type PricingSummary } from "@/components/builder/PricingEngine";
import {
  createLocalSessionId,
  saveBuilderSessionToStorage,
  type BuilderRecommendation,
} from "@/lib/builder-storage";

function calculatePricing(selectedModules: string[], attendeeCount: number): PricingSummary {
  const catalog = new Map(BUILDER_MODULES.map((module) => [module.key, module]));
  const moduleTotal = selectedModules.reduce((total, key) => total + (catalog.get(key)?.monthlyPrice ?? 0), 0);
  const usageComponent = attendeeCount <= 0 ? 0 : Math.ceil(attendeeCount / 25) * 15;
  const monthly = moduleTotal + usageComponent;

  let tier: PricingSummary["tier"] = "starter";
  if (monthly >= 800) tier = "enterprise";
  else if (monthly >= 500) tier = "pro";
  else if (monthly >= 250) tier = "growth";

  return {
    monthly,
    annual: monthly * 12,
    tier,
  };
}

function buildProposalSummary(selectedModules: string[], attendeeCount: number, tier: PricingSummary["tier"]) {
  const selectedLabels = BUILDER_MODULES.filter((item) => selectedModules.includes(item.key)).map((item) => item.label);

  if (selectedLabels.length === 0) {
    return `You have a ${tier} plan shell ready. Add modules to shape a stronger church care workflow.`;
  }

  return `This ${tier} package is configured for approximately ${attendeeCount || 0} monitored members and includes ${selectedLabels.join(", ")}.`;
}

export function BuilderFlow() {
  const router = useRouter();
  const [needs, setNeeds] = useState<NeedsAssessmentValue>({
    attendeeCount: 0,
    hasCareTeam: false,
    needsIncidentTracking: false,
    needsAutomations: false,
  });
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [cartSubmitting, setCartSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<BuilderRecommendation[]>([]);
  const [recommendationSummary, setRecommendationSummary] = useState<string>(
    "Select your needs to generate module recommendations.",
  );
  const [recommendationSource, setRecommendationSource] = useState<"openai" | "fallback" | "local">("local");
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("ref");
    const fromStorage = window.localStorage.getItem("lifesignal_referral_code");
    const value = (fromUrl ?? fromStorage ?? "").trim().toUpperCase();

    if (value) {
      window.localStorage.setItem("lifesignal_referral_code", value);
      setReferralCode(value);
    }
  }, []);

  const pricing = useMemo(
    () => calculatePricing(selectedModules, needs.attendeeCount),
    [needs.attendeeCount, selectedModules],
  );

  const selectedModuleDetails = useMemo(
    () => BUILDER_MODULES.filter((module) => selectedModules.includes(module.key)),
    [selectedModules],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadRecommendations() {
      setLoadingRecommendations(true);
      try {
        const response = await fetch("/api/builder/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...needs, selectedModules }),
        });

        const payload = (await response.json()) as {
          ok?: boolean;
          recommendedModules?: BuilderRecommendation[];
          summary?: string;
          source?: "openai" | "fallback";
        };

        if (cancelled) return;

        if (response.ok && payload.ok) {
          setRecommendations(payload.recommendedModules ?? []);
          setRecommendationSummary(payload.summary ?? "Recommendations generated.");
          setRecommendationSource(payload.source ?? "fallback");
          return;
        }
      } catch {
        // ignore and use local fallback below
      }

      if (cancelled) return;

      const fallback: BuilderRecommendation[] = [];
      if (!selectedModules.includes("lifesignal_core")) {
        fallback.push({
          key: "lifesignal_core",
          reasoning: "Core check-ins are the foundation of any church care deployment.",
          priority: "high",
        });
      }
      if (needs.needsIncidentTracking && !selectedModules.includes("incident_center")) {
        fallback.push({
          key: "incident_center",
          reasoning: "Incident tracking helps close the loop on member needs and follow-up.",
          priority: "high",
        });
      }
      if (needs.needsAutomations && !selectedModules.includes("escalation_workflows")) {
        fallback.push({
          key: "escalation_workflows",
          reasoning: "Escalations keep urgent member care from getting stuck in inboxes or memory.",
          priority: "medium",
        });
      }
      if (needs.hasCareTeam && !selectedModules.includes("team_collaboration")) {
        fallback.push({
          key: "team_collaboration",
          reasoning: "Shared assignments and clear ownership help your care team move together.",
          priority: "medium",
        });
      }
      if (needs.attendeeCount >= 100 && !selectedModules.includes("analytics_pack")) {
        fallback.push({
          key: "analytics_pack",
          reasoning: "Trend visibility matters more as your monitored member count grows.",
          priority: "low",
        });
      }

      setRecommendations(fallback);
      setRecommendationSummary(
        fallback.length > 0
          ? "Recommendations generated from the local rules engine."
          : "Your current module mix already aligns closely with the needs you selected.",
      );
      setRecommendationSource("local");
      setLoadingRecommendations(false);
    }

    void loadRecommendations().finally(() => {
      if (!cancelled) {
        setLoadingRecommendations(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [needs, selectedModules]);

  async function handleCheckoutCart() {
    if (selectedModules.length === 0) {
      setError("Add at least one feature to the cart before starting checkout.");
      return;
    }

    setCartSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/builder/cart-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modules: selectedModules,
          attendeeCount: needs.attendeeCount,
          referralCode: referralCode ?? undefined,
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; url?: string; error?: string };

      if (!response.ok || !payload.ok || !payload.url) {
        throw new Error(payload.error ?? "Failed to start Stripe checkout");
      }

      window.location.assign(payload.url);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Unexpected error";
      setError(message);
    } finally {
      setCartSubmitting(false);
    }
  }

  async function handleSaveAndContinue() {
    setSubmitting(true);
    setError(null);

    const proposalSummary = buildProposalSummary(selectedModules, needs.attendeeCount, pricing.tier);

    const persistLocal = (source: "local" | "server", sessionId: string) => {
      saveBuilderSessionToStorage({
        sessionId,
        createdAt: new Date().toISOString(),
        source,
        selectedModules,
        needsAssessment: needs,
        pricing,
        recommendationSummary,
        recommendations,
        proposalSummary,
      });
    };

    try {
      const saveResponse = await fetch("/api/builder/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          needsAssessment: needs,
          selectedModules,
          pricing,
          tier: pricing.tier,
          referralCode: referralCode ?? undefined,
        }),
      });

      const savePayload = (await saveResponse.json()) as { ok?: boolean; sessionId?: string; error?: string };

      if (!saveResponse.ok || !savePayload.ok || !savePayload.sessionId) {
        throw new Error(savePayload.error ?? "Failed to save builder session");
      }

      persistLocal("server", savePayload.sessionId);

      try {
        await fetch("/api/builder/proposal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: savePayload.sessionId }),
        });
      } catch {
        // proposal can still render from local storage
      }

      router.push(`/builder/results?sessionId=${encodeURIComponent(savePayload.sessionId)}`);
      return;
    } catch (cause) {
      const localSessionId = createLocalSessionId();
      persistLocal("local", localSessionId);

      const message = cause instanceof Error ? cause.message : "Unexpected error";
      setError(`${message}. A local proposal has been saved so you can keep moving.`);
      router.push(`/builder/results?sessionId=${encodeURIComponent(localSessionId)}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <NeedsAssessment value={needs} onChange={setNeeds} />
      <ModuleSelector selected={selectedModules} onChange={setSelectedModules} />
      <PricingEngine pricing={pricing} />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Recommendation engine</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Suggested module stack</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{recommendationSummary}</p>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-600">
            {loadingRecommendations ? "Refreshing" : recommendationSource}
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {recommendations.length > 0 ? (
            recommendations.map((item) => {
              const match = BUILDER_MODULES.find((module) => module.key === item.key);
              const alreadySelected = selectedModules.includes(item.key);

              return (
                <div key={item.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{match?.label ?? item.key}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.reasoning}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (alreadySelected) return;
                        setSelectedModules((current) => [...current, item.key]);
                      }}
                      disabled={alreadySelected}
                      className="rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
                    >
                      {alreadySelected ? "Already selected" : "Add module"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              Nice work. Your current selection already covers the needs you marked.
            </div>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Current package</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">What is included right now</h2>
            <div className="mt-4 grid gap-3">
              {selectedModuleDetails.length > 0 ? (
                selectedModuleDetails.map((module) => (
                  <div key={module.key} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">{module.label}</p>
                        <p className="mt-1 text-sm text-slate-600">{module.description}</p>
                      </div>
                      <div className="text-sm font-semibold text-slate-700">${module.monthlyPrice}/mo</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  No modules selected yet. Choose at least one to create a stronger proposal.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-slate-900">Builder snapshot</h3>
            <dl className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between gap-3">
                <dt>Members to monitor</dt>
                <dd className="font-semibold text-slate-900">{needs.attendeeCount}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt>Care team</dt>
                <dd className="font-semibold text-slate-900">{needs.hasCareTeam ? "Yes" : "No"}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt>Incident tracking</dt>
                <dd className="font-semibold text-slate-900">{needs.needsIncidentTracking ? "Yes" : "No"}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt>Automations</dt>
                <dd className="font-semibold text-slate-900">{needs.needsAutomations ? "Yes" : "No"}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt>Referral</dt>
                <dd className="font-semibold text-slate-900">{referralCode ?? "None"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {error ? <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          disabled={cartSubmitting || selectedModules.length === 0}
          onClick={handleCheckoutCart}
          className="inline-flex items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {cartSubmitting ? "Redirecting to Stripe..." : "Checkout selected features"}
        </button>
        <button
          type="button"
          disabled={submitting}
          onClick={handleSaveAndContinue}
          className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60"
        >
          {submitting ? "Saving your proposal..." : "Save and generate proposal"}
        </button>
        <p className="text-sm text-slate-500">
          Buy features a la carte through Stripe, or save the full proposal first if you want a packaged rollout recommendation.
        </p>
      </div>
    </div>
  );
}
