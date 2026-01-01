import Link from "next/link";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Terms of Service | LifeSignal",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-brand-navy">
        Terms of Service
      </h1>

      <p className="mt-2 text-sm text-neutral-600">
        Last updated: January 2026
      </p>

      {/* Ownership */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-brand-navy">
          Ownership & Operator
        </h2>

        <p className="mt-3 text-sm text-neutral-700">
          <strong>LifeSignal</strong> is a product owned and operated by{" "}
          <strong>:contentReference[oaicite:0]{index=0}</strong>,
          a United States–based technology company specializing in automation,
          safety systems, and applied artificial intelligence.
        </p>

        <p className="mt-3 text-sm text-neutral-700">
          When you create an account, subscribe to a plan, or use any LifeSignal
          feature, you are entering into a legal agreement with{" "}
          <strong>Field Agent AI, LLC</strong>, not an individual, contractor, or
          third-party platform.
        </p>
      </Card>

      {/* About Field Agent AI */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-brand-navy">
          About Field Agent AI, LLC
        </h2>

        <p className="mt-3 text-sm text-neutral-700">
          Field Agent AI, LLC designs and operates software platforms that
          automate communication, monitoring, and decision support for families,
          small businesses, and service-based organizations.
        </p>

        <p className="mt-3 text-sm text-neutral-700">
          Our products focus on:
        </p>

        <ul className="mt-3 list-disc pl-6 text-sm text-neutral-700 space-y-1">
          <li>Automated check-in and safety verification systems</li>
          <li>AI-assisted communication and escalation workflows</li>
          <li>Subscription-based monitoring and notification services</li>
          <li>Applied AI tools for real-world operational use</li>
        </ul>

        <p className="mt-3 text-sm text-neutral-700">
          LifeSignal is one such platform, designed to help families maintain
          peace of mind through scheduled check-ins and escalation alerts.
        </p>
      </Card>

      {/* Nature of Service */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-brand-navy">
          Nature of the Service (Important)
        </h2>

        <p className="mt-3 text-sm text-neutral-700">
          LifeSignal is <strong>not</strong> an emergency response system, medical
          device, healthcare provider, or 911 replacement.
        </p>

        <p className="mt-3 text-sm text-neutral-700">
          LifeSignal provides automated check-ins via SMS and/or voice calls and
          may notify designated contacts if a response is not received. Delivery
          and response depend on third-party carriers, device availability, and
          user behavior.
        </p>

        <p className="mt-3 text-sm text-neutral-700">
          You acknowledge that LifeSignal may experience delays, failures, or
          interruptions and should not be relied upon as the sole means of
          ensuring a person’s safety.
        </p>
      </Card>

      {/* Subscriptions */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-brand-navy">
          Subscriptions & Billing
        </h2>

        <p className="mt-3 text-sm text-neutral-700">
          LifeSignal is offered as a subscription service. Certain features,
          including active monitoring and automated check-ins, require an active
          paid plan.
        </p>

        <p className="mt-3 text-sm text-neutral-700">
          You are responsible for maintaining accurate billing information and
          for any charges incurred under your account.
        </p>
      </Card>

      {/* REFUNDS – VERY CLEAR */}
      <Card className="mt-6 p-6 border border-amber-200 bg-amber-50">
        <h2 className="text-xl font-semibold text-amber-900">
          Refund Policy (Please Read Carefully)
        </h2>

        <p className="mt-3 text-sm text-amber-900">
          <strong>All LifeSignal subscription payments are non-refundable</strong>,
          except where required by applicable law.
        </p>

        <p className="mt-3 text-sm text-amber-900">
          Because LifeSignal provides immediate access to digital services,
          infrastructure, and third-party communication resources, we do not
          offer refunds for:
        </p>

        <ul className="mt-3 list-disc pl-6 text-sm text-amber-900 space-y-1">
          <li>Partial billing periods</li>
          <li>Unused time or features</li>
          <li>Forgotten cancellations</li>
          <li>Lack of usage</li>
          <li>Carrier delivery issues outside our control</li>
        </ul>

        <p className="mt-3 text-sm text-amber-900">
          You may cancel your subscription at any time to prevent future charges.
          Cancellation takes effect at the end of the current billing period.
        </p>

        <p className="mt-3 text-sm text-amber-900">
          For questions regarding billing or cancellations, contact{" "}
          <a
            href="mailto:support@lifesignal.app"
            className="font-semibold underline underline-offset-4"
          >
            support@lifesignal.app
          </a>.
        </p>
      </Card>

      {/* Limitation */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-brand-navy">
          Limitation of Liability
        </h2>

        <p className="mt-3 text-sm text-neutral-700">
          To the maximum extent permitted by law, Field Agent AI, LLC shall not be
          liable for any indirect, incidental, consequential, or special damages
          arising out of or related to the use or inability to use LifeSignal.
        </p>
      </Card>

      {/* Governing Law */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-brand-navy">
          Governing Law
        </h2>

        <p className="mt-3 text-sm text-neutral-700">
          These Terms are governed by the laws of the United States and the state
          in which Field Agent AI, LLC is registered, without regard to conflict
          of law principles.
        </p>
      </Card>

      {/* Contact */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-brand-navy">
          Contact Information
        </h2>

        <p className="mt-3 text-sm text-neutral-700">
          If you have questions about these Terms, LifeSignal, or Field Agent AI,
          LLC, you may contact us at:
        </p>

        <p className="mt-3 text-sm font-medium text-neutral-800">
          Email:{" "}
          <a
            href="mailto:support@lifesignal.app"
            className="underline underline-offset-4"
          >
            support@lifesignal.app
          </a>
        </p>

        <p className="mt-2 text-sm text-neutral-700">
          By using LifeSignal, you acknowledge that you have read, understood,
          and agreed to these Terms of Service.
        </p>
      </Card>

      <div className="mt-8 text-sm">
        <Link
          href="/privacy"
          className="text-brand-navy underline underline-offset-4"
        >
          View Privacy Policy →
        </Link>
      </div>
    </div>
  );
}
