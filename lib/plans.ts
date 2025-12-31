import { env } from "@/lib/env";

export type PlanTier = "checkin" | "assurance" | "facility";
export type PlanCadence = "monthly" | "annual";

export function priceIdFor(tier: PlanTier, cadence: PlanCadence) {
  const key = `${tier}_${cadence}` as const;
  switch (key) {
    case "checkin_monthly":
      return env.STRIPE_PRICE_CHECKIN_MONTHLY;
    case "checkin_annual":
      return env.STRIPE_PRICE_CHECKIN_ANNUAL;
    case "assurance_monthly":
      return env.STRIPE_PRICE_ASSURANCE_MONTHLY;
    case "assurance_annual":
      return env.STRIPE_PRICE_ASSURANCE_ANNUAL;
    case "facility_monthly":
      return env.STRIPE_PRICE_FACILITY_MONTHLY;
    case "facility_annual":
      return env.STRIPE_PRICE_FACILITY_ANNUAL;
    default:
      throw new Error("Invalid plan selection");
  }
}

export function planLabel(tier: PlanTier) {
  return tier === "checkin" ? "Check-In" : tier === "assurance" ? "Assurance" : "Facility";
}
