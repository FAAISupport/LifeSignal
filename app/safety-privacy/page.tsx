import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Safety & Privacy | LifeSignal",
  description:
    "Learn how LifeSignal approaches privacy, data minimization, trusted contact alerts, and human-centered safety without invasive monitoring."
};

const doesNotDo = [
  "Continuous location tracking",
  "In-home video surveillance",
  "Always-on audio recording",
  "Unnecessary data collection",
  "Complex behavior scoring hidden from users"
];

const doesDo = [
  "Daily check-in confirmation records",
  "Missed check-in and escalation history",
  "Trusted contact notification routing",
  "Simple visibility into what happened and when",
  "Human-centered safety workflows"
];

export default function SafetyPrivacyPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_35%),linear-gradient(to_bottom,#03112a,#020817)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1 text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              Safety & Privacy
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Safety should feel reassuring, not invasive.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300">
              LifeSignal is built to support people through simple daily
              communication and trusted human response paths, not through
              constant surveillance.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              What LifeSignal does not do
            </p>
            <ul className="mt-4 space-y-3">
              {doesNotDo.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-[#071225] px-4 py-3 text-lg text-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-sky-400/20 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 p-8">
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              What LifeSignal does do
            </p>
            <ul className="mt-4 space-y-3">
              {doesDo.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-[#071225] px-4 py-3 text-lg text-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Data minimization</h2>
              <p className="mt-3 text-lg leading-9 text-slate-300">
                LifeSignal is designed around the idea that the safest systems
                often collect less, not more. The focus is on the daily check-in
                signal and the response process tied to it.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Trusted contacts</h2>
              <p className="mt-3 text-lg leading-9 text-slate-300">
                Alerts are meant to reach people who already have a role in the
                person’s support network, such as family members, caregivers, or
                local contacts.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Clear expectations</h2>
              <p className="mt-3 text-lg leading-9 text-slate-300">
                LifeSignal is intended to support early awareness and structured
                follow-up. It is not a substitute for emergency services,
                medical diagnosis, or crisis dispatch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-sky-500/10 via-slate-900 to-indigo-500/10 p-8 md:p-12">
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              Keep exploring
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              See the full workflow and get answers to the most common questions.
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/how-it-works"
                className="rounded-full bg-sky-500 px-5 py-3 text-lg font-semibold text-white transition hover:bg-sky-400"
              >
                How it works
              </Link>
              <Link
                href="/faq"
                className="rounded-full border border-white/15 px-5 py-3 text-lg font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


