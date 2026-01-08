// app/terms/page.tsx
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Terms of Service | LifeSignal",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-brand-navy">Terms of Service</h1>
      <p className="mt-2 text-sm text-neutral-600">Last updated: January 2026</p>

      {/* Ownership */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-brand-navy">Ownership & Operator</h2>

        <p className="mt-3 text-sm text-neutral-700">
          <strong>LifeSignal</strong> is owned and operated by{" "}
          <strong>Field Agent AI, LLC</strong> (&ldquo;Field Agent AI,&rdquo;
          &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
        </p>

        <p className="mt-3 text-sm text-neutral-700">
          When you create an account, subscribe, or use any LifeSignal features, you are entering into
          a legal agreement with <strong>Field Agent AI, LLC</strong>.
        </p>
      </Card>

      {/* About Field Agent AI */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-brand-navy">About Field Agent AI, LLC</h2>

        <p className="mt-3 text-sm text-neutral-700">
          Field Agent AI, LLC builds and operates software platforms focused on automation, messaging,
          monitoring workflows, and applied AI tools that help families and service-based organizations
          communicate, respond, and stay organized.
        </p>

        <p className="mt-3 text-sm text-neutral-700">Our products and services may include:</p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-neutral-700">
          <li>Automated check-in and notification systems</li>
          <li>AI-assisted communication and escalation workflows</li>
          <li>Subscription monitoring and alerting services</li>
          <li>Operational automation tools for small businesses and families</li>
        </ul>

        <p className="mt-3 text-sm text-neutral-700">
          LifeSignal is one of these platforms, designed to help families run scheduled check-ins and
          escalate notifications to designated contacts when needed.
        </p>
      </Card>

      {/* Refunds - obvious */}
      <Card className="mt-6 p-6 border border-amber-200 bg-amber-50">
        <h2
  id="refund-policy"
  className="text-xl font-semibold text-amber-900"
>
  Refund Policy (Important)
</h2>


        <p className="mt-3 text-sm text-amber-900">
          <strong>Subscriptions are non-refundable</strong>, except where required by applicable law.
        </p>

        <p className="mt-3 text-sm text-amber-900">
          LifeSignal provides immediate access to digital services and infrastructure. We do not offer
          refunds for partial billing periods, unused time, forgotten cancellations, or lack of use.
        </p>

        <p className="mt-3 text-sm text-amber-900">
          You may cancel anytime to prevent future charges. Cancellation takes effect at the end of the
          current billing period.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Manage plan / billing
          </Link>
          <a
            href="mailto:support@lifesignal.app"
            className="text-sm font-semibold text-amber-900 underline underline-offset-4"
          >
            support@lifesignal.app
          </a>
        </div>
      </Card>

      {/* Nature of service */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-brand-navy">Nature of the Service</h2>

        <p className="mt-3 text-sm text-neutral-700">
          LifeSignal is a <strong>non-emergency</strong> monitoring and notification service. It is{" "}
          <strong>not</strong> a medical device, healthcare provider, life-support system, or a
          replacement for calling 911 or emergency services.
        </p>

        <p className="mt-3 text-sm text-neutral-700">
          Delivery of SMS/voice calls depends on third-party carriers, device availability, user
          settings, and other factors outside our control. You agree not to rely on LifeSignal as the
          only method of ensuring a person&apos;s safety.
        </p>
      </Card>

      {/* Subscriptions */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-brand-navy">Subscriptions & Billing</h2>

        <p className="mt-3 text-sm text-neutral-700">
          Some features require an active subscription plan. You are responsible for maintaining
          accurate billing information and for all charges incurred under your account.
        </p>
      </Card>

      {/* Liability */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-brand-navy">Limitation of Liability</h2>

        <p className="mt-3 text-sm text-neutral-700">
          To the maximum extent permitted by law, Field Agent AI, LLC will not be liable for indirect,
          incidental, special, consequential, or punitive damages arising out of your use of LifeSignal
          or inability to use LifeSignal.
        </p>
      </Card>

      {/* Contact */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-brand-navy">Contact</h2>

        <p className="mt-3 text-sm text-neutral-700">
          Questions about these Terms or billing? Contact us at{" "}
          <a
            href="mailto:support@lifesignal.app"
            className="font-semibold text-brand-navy underline underline-offset-4"
          >
            support@lifesignal.app
          </a>
          .
        </p>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/privacy" className="text-brand-navy underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link href="/pricing" className="text-brand-navy underline underline-offset-4">
            Pricing
          </Link>
        </div>
      </Card>
    </div>
  );
}
