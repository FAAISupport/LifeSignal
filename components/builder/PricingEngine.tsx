"use client";

export type PricingSummary = {
  monthly: number;
  annual: number;
  tier: "starter" | "growth" | "pro" | "enterprise";
};

export function PricingEngine({ pricing }: { pricing: PricingSummary }) {
  return (
    <section className="space-y-2 rounded-lg border border-blue-200 bg-blue-50 p-4">
      <h2 className="text-lg font-semibold text-blue-900">Pricing estimate</h2>
      <p className="text-sm text-blue-800">Tier: {pricing.tier}</p>
      <p className="text-sm text-blue-800">Monthly: ${pricing.monthly}</p>
      <p className="text-sm text-blue-800">Annual: ${pricing.annual}</p>
    </section>
  );
}
