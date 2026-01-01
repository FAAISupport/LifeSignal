export type BillingInterval = "monthly" | "annual";
export type PlanKey = "checkin" | "assurance" | "facility";

export type PlanConfig = {
  key: PlanKey;
  name: string;
  monthlyLabel: string;
  annualLabel: string;
  paddle?: {
    monthlyPriceId?: string;
    annualPriceId?: string;
  };
};

export const PLANS: PlanConfig[] = [
  { key: "checkin", name: "Daily Check-In", monthlyLabel: "$/mo", annualLabel: "$/yr" },
  { key: "assurance", name: "Assurance", monthlyLabel: "$/mo", annualLabel: "$/yr" },
  { key: "facility", name: "Facility", monthlyLabel: "$/mo", annualLabel: "$/yr" },
];

export function getPaddlePriceId(plan: PlanKey, interval: BillingInterval) {
  const p = PLANS.find(x => x.key === plan);
  if (!p?.paddle) return undefined;
  return interval === "monthly" ? p.paddle.monthlyPriceId : p.paddle.annualPriceId;
}
