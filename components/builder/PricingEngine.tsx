"use client";

export type PricingSummary = {
  monthly: number;
  annual: number;
  tier: "starter" | "growth" | "pro" | "enterprise";
};

const tierCopy: Record<PricingSummary["tier"], string> = {
  starter: "Great for pilots and smaller care teams getting their first workflows live.",
  growth: "Built for churches that need stronger coordination, escalation, and reporting.",
  pro: "A strong fit for multi-team ministries with heavier operational demands.",
  enterprise: "For larger organizations that need broad rollout, governance, and scale.",
};

export function PricingEngine({ pricing }: { pricing: PricingSummary }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Estimated investment</p>
          <h2 className="text-2xl font-semibold text-slate-900">ChurchOS Builder pricing snapshot</h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">{tierCopy[pricing.tier]}</p>
        </div>

        <div className="rounded-2xl border border-sky-200 bg-white/90 px-5 py-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Tier</p>
          <p className="mt-1 text-2xl font-bold capitalize text-slate-900">{pricing.tier}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/80 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Monthly</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">${pricing.monthly}</p>
        </div>
        <div className="rounded-2xl border border-white/80 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Annual</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">${pricing.annual}</p>
        </div>
        <div className="rounded-2xl border border-white/80 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Planning note</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            This estimate updates instantly as you choose modules and monitoring volume.
          </p>
        </div>
      </div>
    </section>
  );
}


