// app/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LifeSignal Terms of Service",
  description:
    "Terms of Service for the LifeSignal senior safety and daily check-in service.",
};

export default function TermsPage() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold text-sky-700 mb-2">
          LifeSignal Terms of Service
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Last updated: {year}
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5 text-sm text-slate-800">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of the LifeSignal service (&quot;LifeSignal,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;). By creating an account or using
            LifeSignal in any way, you agree to be bound by these Terms.
          </p>

          <section>
            <h2 className="text-lg font-semibold mb-1">1. Service Description</h2>
            <p>
              LifeSignal is a safety and wellness service that provides daily
              check-ins, alerts, and notifications via SMS, phone calls, and
              other communication channels. LifeSignal is not a replacement for
              911, emergency services, or medical care.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">2. Eligibility</h2>
            <p>
              You must be at least 18 years old or have legal authority to
              enter into these Terms on behalf of another person, such as a
              family member or someone in your care. By using LifeSignal, you
              represent that you meet these requirements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">3. Account &amp; Accuracy</h2>
            <p>
              You agree to provide accurate and up-to-date information,
              including your name, mobile phone number, time zone, and
              emergency contact details. You are responsible for maintaining
              the confidentiality of your account credentials and for all
              activity under your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">4. SMS &amp; Voice Communications</h2>
            <p className="mb-2">
              By providing your phone number and consenting during sign-up, you
              authorize LifeSignal to send you automated text messages and
              phone calls related to daily check-ins, safety alerts, account
              notifications, and emergency workflows.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Message and data rates may apply.</li>
              <li>Message and call frequency varies based on your settings and activity.</li>
              <li>
                You may opt out of SMS at any time by replying{" "}
                <strong>STOP</strong>. Reply <strong>HELP</strong> for help.
              </li>
            </ul>
            <p className="mt-2">
              Our SMS and voice services are provided through third-party
              providers (such as Twilio). Delivery of messages is subject to
              your carrier, network connection, and those providers. We cannot
              guarantee delivery or timing of any message or call.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">5. Not Emergency Services</h2>
            <p>
              LifeSignal is not a substitute for 911 or any emergency service.
              In an emergency, you should contact local emergency services
              directly. LifeSignal does not guarantee that a caregiver,
              contact, or other party will see or respond to alerts in any
              particular time frame, or at all.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">6. Acceptable Use</h2>
            <p className="mb-2">
              You agree not to use LifeSignal to:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Send spam, unlawful, or abusive messages;</li>
              <li>Impersonate any person or misrepresent your identity;</li>
              <li>Interfere with or disrupt the service or its infrastructure;</li>
              <li>Reverse engineer or attempt to gain unauthorized access.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">7. Fees &amp; Billing</h2>
            <p>
              Some features of LifeSignal may require payment of fees. When you
              subscribe to a paid plan, you authorize us or our payment
              processor to charge your selected payment method. All fees are
              non-refundable unless required by law or stated otherwise in
              writing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-1">8. Termination</h2>
            <p>
              You may stop using LifeSignal at any time. We may suspend or
              terminate your access to LifeSignal if you violate these Terms,
              misuse the service, or if we
