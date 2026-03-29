"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { BUILDER_MODULES, ModuleSelector } from "@/components/builder/ModuleSelector";
import { NeedsAssessment, type NeedsAssessmentValue } from "@/components/builder/NeedsAssessment";
import { PricingEngine, type PricingSummary } from "@/components/builder/PricingEngine";

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
  const [error, setError] = useState<string | null>(null);

  const pricing = useMemo(
    () => calculatePricing(selectedModules, needs.attendeeCount),
    [needs.attendeeCount, selectedModules],
  );

  async function handleSaveAndContinue() {
    setSubmitting(true);
    setError(null);

    try {
      const saveResponse = await fetch("/api/builder/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          needsAssessment: needs,
          selectedModules,
          pricing,
          tier: pricing.tier,
        }),
      });

      const savePayload = (await saveResponse.json()) as { ok?: boolean; sessionId?: string; error?: string };

      if (!saveResponse.ok || !savePayload.ok || !savePayload.sessionId) {
        throw new Error(savePayload.error ?? "Failed to save builder session");
      }

      const proposalResponse = await fetch("/api/builder/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: savePayload.sessionId }),
      });

      const proposalPayload = (await proposalResponse.json()) as { ok?: boolean; error?: string };
      if (!proposalResponse.ok || !proposalPayload.ok) {
        throw new Error(proposalPayload.error ?? "Failed to generate proposal");
      }

      router.push(`/builder/results?sessionId=${encodeURIComponent(savePayload.sessionId)}`);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Unexpected error";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <NeedsAssessment value={needs} onChange={setNeeds} />
      <ModuleSelector selected={selectedModules} onChange={setSelectedModules} />
      <PricingEngine pricing={pricing} />

      {selectedModules.length === 0 ? (
        <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          No modules selected yet. You can still save a draft and continue.
        </p>
      ) : null}

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      ) : null}

      <button
        type="button"
        disabled={submitting}
        onClick={handleSaveAndContinue}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {submitting ? "Saving..." : "Save and generate proposal"}
      </button>
    </div>
  );
}
