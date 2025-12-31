import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { getUserAndProfile } from "@/lib/auth";
import { PaddleCheckoutClient } from "./PaddleCheckoutClient";

const details: Record<string, { title: string; bullets: string[] }> = {
  checkin: {
    title: "Check-In",
    bullets: [
      "1 senior profile",
      "Daily check-in by SMS or voice (choose one)",
      "Up to 2 family contacts",
      "Missed check-in alerts",
      "Full activity log + audit trail",
      "STOP opt-out supported"
    ]
  },
  assurance: {
    title: "Assurance",
    bullets: [
      "Everything in Check-In",
      "SMS + voice redundancy",
      "Up to 5 family contacts",
      "‘Help’ response path",
      "Configurable wait window",
      "Priority support"
    ]
  },
  facility: {
    title: "Facility",
    bullets: [
      "Up to 25 seniors (configurable)",
      "Staff visibility and reporting",
      "Centralized billing",
      "Daily summary reporting",
      "Compliance-oriented logs"
    ]
  }
};

export default async function Page({
  searchParams
}: {
  searchParams: { tier?: string; cadence?: string };
}) {
  const { user } = await getUserAndProfile();

  const tier = (searchParams.tier ?? "checkin").toLowerCase();
  const cadence = (searchParams.cadence ?? "monthly").toLowerCase();
  const plan = details[tier] ?? details.checkin;

  const labelCadence = cadence === "annual" || cadence === "yearly" ? "Yearly" : "Monthly";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="headline">Checkout</h1>

      <Card>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="text-lg font-semibold text-brand-navy">
            {plan.title} <span className="text-sm font-normal text-neutral-600">({labelCadence})</span>
          </div>
          <Link href="/pricing" className="text-sm text-neutral-600 hover:text-brand-navy hover:underline">
            Change plan
          </Link>
        </div>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700">
          {plan.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <div className="mt-6">
          <PaddleCheckoutClient tier={tier} cadence={cadence} customerEmail={user.email ?? ""} />
        </div>

        <div className="mt-4">
          <Link href="/dashboard" className="text-sm text-neutral-600 hover:text-brand-navy hover:underline">
            Back to dashboard
          </Link>
        </div>
      </Card>
    </div>
  );
}
