import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works | LifeSignal",
  description:
    "Learn how LifeSignal uses daily check-ins, quiet monitoring, and smart escalation to help families, caregivers, and communities protect the people they care about."
};

const steps = [
  {
    number: "01",
    title: "LifeSignal checks in daily",
    description:
      "Each day, LifeSignal sends a simple, friendly check-in by text or voice. No app is required for the person receiving the check-in."
  },
  {
    number: "02",
    title: "They respond in seconds",
    description:
      "A quick reply like YES or a keypad confirmation lets the system know everything is okay. The process is designed to be fast, familiar, and stress-free."
  },
  {
    number: "03",
    title: "LifeSignal escalates only if needed",
    description:
      "If a response does not come through, LifeSignal follows a smart escalation flow that can include reminders, follow-up outreach, and trusted contacts."
  }
];

const responseModes = [
  "SMS reply with a simple confirmation",
  "Tap-to-confirm check-in flow",
  "Voice call with keypad response",
  "No smartphone required for core use",
  "Friendly language instead of robotic prompts",
  "Flexible scheduling based on routine"
];

const escalationFlow = [
  "Initial check-in message",
  "Reminder message after no response",
  "Optional follow-up voice attempt",
  "Notify caregiver or family contact",
  "Notify neighbor or local support contact",
  "Create a clear audit trail of what happened"
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_35%),linear-gradient(to_bottom,#03112a,#020817)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1 text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              How LifeSignal Works
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Peace of mind without adding complexity to daily life.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300">
              LifeSignal is built around a simple idea: if everything is fine,
              daily life should continue normally. If something is not right,
              the right people should know quickly and clearly.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-sky-500 px-5 py-3 text-lg font-semibold text-white transition hover:bg-sky-400"
              >
                Talk to us
              </Link>
              <Link
                href="/families"
                className="rounded-full border border-white/15 px-5 py-3 text-lg font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5"
              >
                See family use cases
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              The 3-step safety loop
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Simple enough for everyday use. Strong enough for real concern.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/15 text-lg font-semibold text-sky-300">
                  {step.number}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-lg leading-9 text-slate-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              Response options
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Designed for the way real people actually respond.
            </h2>
            <p className="mt-4 text-lg leading-9 text-slate-300">
              LifeSignal is intentionally built to reduce friction. The person
              checking in should not need to learn a new system, install
              software, or navigate a confusing interface just to let loved ones
              know they are okay.
            </p>
            <ul className="mt-6 space-y-3">
              {responseModes.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-[#071225] px-4 py-3 text-lg text-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              Escalation logic
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Quiet when everything is fine. Clear when something needs attention.
            </h2>
            <p className="mt-4 text-lg leading-9 text-slate-300">
              LifeSignal does not jump straight to panic. It follows a more
              thoughtful path: remind first, verify next, then bring trusted
              people into the loop when a response still does not come in.
            </p>
            <ol className="mt-6 space-y-3">
              {escalationFlow.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-[#071225] px-4 py-3 text-lg text-slate-200"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-base font-semibold text-sky-300">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
                Why it matters
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Built for the gap between independence and emergency.
              </h2>
              <p className="mt-4 text-lg leading-9 text-slate-300">
                Many people do not need a full medical monitoring system. They
                need something lighter, calmer, and more human. LifeSignal is
                built for that middle space where reassurance matters, routines
                matter, and early detection matters.
              </p>
            </div>

            <div className="rounded-3xl border border-sky-400/20 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 p-8">
              <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
                Common use cases
              </p>
              <ul className="mt-4 space-y-3 text-lg leading-9 text-slate-200">
                <li>Independent seniors living alone</li>
                <li>Adults FaithSignaling after surgery or illness</li>
                <li>Family members living far from loved ones</li>
                <li>Caregivers managing multiple daily check-ins</li>
                <li>Community and neighbor-based support networks</li>
                <li>FaithSignaly programs needing light-touch accountability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-sky-500/10 via-slate-900 to-indigo-500/10 p-8 md:p-12">
            <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-300">
              Next step
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Explore how LifeSignal fits families, caregivers, and connected communities.
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/families"
                className="rounded-full bg-sky-500 px-5 py-3 text-lg font-semibold text-white transition hover:bg-sky-400"
              >
                For families
              </Link>
              <Link
                href="/caregivers"
                className="rounded-full border border-white/15 px-5 py-3 text-lg font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5"
              >
                For caregivers
              </Link>
              <Link
                href="/communities"
                className="rounded-full border border-white/15 px-5 py-3 text-lg font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5"
              >
                For communities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}





