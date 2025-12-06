// app/consent/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LifeSignal SMS Consent & Opt-In",
  description:
    "Learn how LifeSignal collects SMS consent for automated check-ins, alerts, and emergency notifications.",
};

export default function ConsentPage() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold text-sky-700 mb-2">
          LifeSignal SMS Consent &amp; Opt-In Disclosure
        </h1>

        <p className="text-sm text-slate-500 mb-6">Last updated: {year}</p>

        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-5">
          <p>
            <strong>LifeSignal SMS Check-In Program</strong>
            <br />
            By signing up for LifeSignal, you agree to receive automated text
            messages and phone calls for daily health check-ins, safety
            confirmations, and emergency notifications.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-1">
              How You Opt In
            </h2>
            <p>Users provide consent by:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Entering their mobile phone number during registration, and</li>
              <li>
                Checking the required box labeled:
                <br />
                <strong>
                  “I agree to receive automated check-in alerts from LifeSignal.”
                </strong>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-1">
              Message &amp; Call Frequency
            </h2>
            <p>
              You may receive 1–3 messages and/or calls per day depending on
              your check-in schedule and status. Frequency may increase during
              an active alert or emergency workflow.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-1">
              How to Opt Out
            </h2>
            <p>
              You can stop receiving SMS messages at any time by replying{" "}
              <strong>STOP</strong> to any LifeSignal message. After you send
              STOP, we will send a confirmation SMS to confirm that you have
              been unsubscribed. After this, you will no longer receive SMS
              messages from LifeSignal unless you opt in again.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-1">
              Help &amp; Support
            </h2>
            <p>
              For help with the LifeSignal SMS program, reply{" "}
              <strong>HELP</strong> to any message or contact support using the
              information provided inside your LifeSignal account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-1">
              Carrier &amp; Cost Disclosure
            </h2>
            <p>
              Message and data rates may apply. Message frequency varies based
              on your check-in schedule and activity. Carriers are not liable
              for delayed or undelivered messages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-1">
              Privacy
            </h2>
            <p>
              Your phone number and message activity are used solely to deliver
              LifeSignal check-ins, alerts, and related services, in accordance
              with our Privacy Policy. We do not sell your phone number to third
              parties for marketing.
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}
