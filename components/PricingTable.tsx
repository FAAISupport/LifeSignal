"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type Tier = "checkin" | "assurance" | "facility";
type Cadence = "monthly" | "annual";

const plans: Array<{
  tier: Tier;
  title: string;
  tagline: string;
  monthlyPrice: string;
  annualPrice: string;
  highlights: string[];
  bestFor: string;
}> = [
  {
    tier: "checkin",
    title: "Check-In",
    tagline: "Simple daily check-ins for one loved one.",
    monthlyPrice: "$19/mo",
    annualPrice: "$190/yr",
    bestFor: "One senior + one family manager",
    highlights: [
      "1 senior profile",
      "Daily check-in by SMS or voice (choose one)",
      "Up to 2 family contacts",
      "Missed check-in alerts",
      "Activity log + audit trail",
      "STOP opt-out handling"
    ]
  },
  {
    tier: "assurance",
    title: "Assurance",
    tagline: "More coverage, more contacts, more control.",
    monthlyPrice: "$29/mo",
    annualPrice: "$290/yr",
    bestFor: "Families who want redundancy and more alerts",
    highlights: [
      "Everything in Check-In",
      "SMS + voice redundancy",
      "Up to 5 family contacts",
      "â€˜Helpâ€™ response path",
      "Configurable wait window",
      "Priority support"
    ]
  },
  {
    tier: "facility",
    title: "Facility",
    tagline: "Built for communities and care teams.",
    monthlyPrice: "$199/mo",
    annualPrice: "$1,990/yr",
    bestFor: "Assisted living, home-care orgs, small facilities",
    highlights: [
      "Up to 25 seniors (configurable)",
      "Staff access (admin view + reporting)",
      "Centralized billing",
      "Daily summary reports",
      "Compliance-oriented logs",
      "Volume onboarding support"
    ]
  }
];

function checkoutHref(tier: Tier, cadence: Cadence) {
  return `/checkout?tier=${tier}&cadence=${cadence}`;
}

export function PricingTable() {
  const [cadence, setCadence] = React.useState<Cadence>("monthly");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="headline">Pricing</h1>
          <p className="mt-2 text-sm text-neutral-700">
            Choose a plan. You can change or cancel anytime from the billing portal.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-2 text-sm">
          <button
            type="button"
            onClick={() => setCadence("monthly")}
            className={`rounded-xl px-3 py-2 ${
              cadence === "monthly" ? "bg-black text-white" : "hover:bg-neutral-100"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setCadence("annual")}
            className={`rounded-xl px-3 py-2 ${
              cadence === "annual" ? "bg-black text-white" : "hover:bg-neutral-100"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.tier} className={p.tier === "assurance" ? "border-neutral-300" : ""}>
            <div className="flex items-baseline justify-between">
              <div className="text-lg font-semibold">{p.title}</div>
              {p.tier === "assurance" ? (
                <span className="rounded-full bg-neutral-900 px-2 py-1 text-xs font-medium text-white">
                  Most popular
                </span>
              ) : null}
            </div>

            <p className="mt-2 text-sm text-neutral-700">{p.tagline}</p>

            <div className="mt-4 text-3xl font-semibold">
              {cadence === "monthly" ? p.monthlyPrice : p.annualPrice}
            </div>

            <p className="mt-1 text-xs text-neutral-500">Best for: {p.bestFor}</p>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              {p.highlights.map((h) => (
                <li key={h}>â€¢ {h}</li>
              ))}
            </ul>

            <div className="mt-5">
              <Link href={checkoutHref(p.tier, cadence)}>
                <Button className="w-full">
                  {cadence === "monthly" ? "Choose Monthly" : "Choose Yearly"}
                </Button>
              </Link>
              <p className="mt-2 text-xs text-neutral-500">Checkout is secured by Paddle.</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-xs text-neutral-500">
        LifeSignal is not an emergency service. If you believe someone is in danger, call local emergency services.
      </div>
    </div>
  );
}

