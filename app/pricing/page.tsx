import PaddleCheckoutButton from "@/components/billing/paddle-checkout-button";
import { PADDLE_PRICE_IDS } from "@/lib/paddle/config";

const plans = [
  {
    name: "LifeSignal Family",
    description: "Daily safety check-ins for families supporting independent living.",
    price: "/mo",
    priceId: PADDLE_PRICE_IDS.lifesignalfamilymonthly,
  },
  {
    name: "LifeSignal Caregiver",
    description: "Care dashboards, check-in oversight, and escalation visibility.",
    price: "/mo",
    priceId: PADDLE_PRICE_IDS.lifesignalcaregivermonthly,
  },
  {
    name: "FaithSignal Church",
    description: "Pastoral care workflows, care visibility, and member follow-up.",
    price: "/mo",
    priceId: PADDLE_PRICE_IDS.faithsignalchurchmonthly,
  },
  {
    name: "FaithSignal Add-on: Pastoral Care Rounds",
    description: "Structured follow-up and care-routing for church teams.",
    price: "/mo",
    priceId: PADDLE_PRICE_IDS.faithsignalpastoralrounds,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Billing
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            LifeSignal + FaithSignal Pricing
          </h1>
          <p className="text-lg text-slate-300">
            Customer billing runs through Paddle. Investor funding stays outside
            this checkout flow.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <section
              key={plan.name}
              className="rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 shadow-xl shadow-cyan-950/20"
            >
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">{plan.name}</h2>
                <p className="text-slate-300">{plan.description}</p>
                <p className="text-3xl font-bold text-cyan-300">{plan.price}</p>
              </div>

              <div className="mt-6">
                <PaddleCheckoutButton
                  label={Start }
                  priceId={plan.priceId}
                />
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
