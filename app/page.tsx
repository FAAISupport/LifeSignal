import LifeSignalTimelineSection from "@/components/site/LifeSignalTimelineSection";
import Link from "next/link";
import SitePageShell from "@/components/site/site-page-shell";
import LiveSafetyCounter from "@/components/site/live-safety-counter";

const features = [
  {
    title: "Daily safety check-ins",
    description:
      "Automatic text or voice check-ins help confirm someone is okay without requiring an app, wearable, or complicated setup.",
  },
  {
    title: "Transparent escalation",
    description:
      "If someone does not respond, LifeSignal alerts the right people in the right order so nothing gets missed.",
  },
  {
    title: "Routine consistency tracking",
    description:
      "Spot changes in habits, missed responses, and emerging wellness concerns before they become emergencies.",
  },
  {
    title: "Built for real caregivers",
    description:
      "Families, neighbors, FaithSignaly sponsors, and care teams can stay informed without constant manual follow-up.",
  },
  {
    title: "Simple for seniors",
    description:
      "LifeSignal is designed to be easy for older adults with straightforward text and voice-based responses.",
  },
  {
    title: "Community-ready",
    description:
      "Works for families, caregiver circles, senior communities, and organizations that need a lightweight safety layer.",
  },
];

const steps = [
  {
    number: "01",
    title: "LifeSignal checks in",
    description:
      "A scheduled text or voice prompt goes out at the right time every day.",
  },
  {
    number: "02",
    title: "They respond simply",
    description:
      'A quick reply like “YES” or a keypad confirmation lets everyone know they are okay.',
  },
  {
    number: "03",
    title: "LifeSignal escalates if needed",
    description:
      "If no response comes in, trusted contacts are notified based on your escalation plan.",
  },
];

const audiences = [
  {
    title: "Families",
    description:
      "Support aging parents and loved ones without the stress of constant manual check-ins.",
  },
  {
    title: "Caregivers",
    description:
      "Track routine consistency and receive alerts when someone misses a response window.",
  },
  {
    title: "FaithSignaly support",
    description:
      "Use structured accountability check-ins for FaithSignaly, wellness, or routine adherence.",
  },
  {
    title: "Communities",
    description:
      "Add a modern safety layer for senior communities, churches, HOAs, and local organizations.",
  },
];

const useCases = [
  "Older adults living alone",
  "Families supporting aging parents",
  "Guardian circles and neighbors",
  "FaithSignaly accountability programs",
  "Senior communities and care teams",
  "Anyone who needs consistent safety check-ins",
];

const stats = [
  {
    value: "Text + Voice",
    label: "Check-ins designed for low friction and real-world usability",
  },
  {
    value: "3-Step Loop",
    label: "Check in, confirm, escalate",
  },
  {
    value: "Human-Centered",
    label: "Built to reduce worry without overwhelming people",
  },
];

const pricing = [
  {
    name: "Family",
    price: "$9/mo",
    description:
      "A lightweight option for families supporting one loved one or a small household.",
    points: [
      "Daily check-ins",
      "Basic escalation flow",
      "Family visibility",
      "Simple setup",
    ],
  },
  {
    name: "Caregiver",
    price: "$29/mo",
    description:
      "Best for caregiver circles, support teams, and heavier-use monitoring needs.",
    points: [
      "Everything in Family",
      "More contacts and oversight",
      "Expanded monitoring visibility",
      "Priority platform updates",
    ],
  },
  {
    name: "Community",
    price: "Custom",
    description:
      "For senior communities, churches, healthcare groups, and organizations.",
    points: [
      "Multi-user coordination",
      "Community rollout support",
      "Operational visibility",
      "Custom onboarding",
    ],
  },
];

const faqs = [
  {
    question: "Does the person being checked on need an app?",
    answer:
      "No. LifeSignal is designed to work through simple text or voice interactions so the experience stays easy.",
  },
  {
    question: "What happens if someone misses a check-in?",
    answer:
      "LifeSignal follows the escalation plan you set, notifying the appropriate trusted contacts in order.",
  },
  {
    question: "Who is LifeSignal for?",
    answer:
      "Families, caregivers, older adults living alone, FaithSignaly support networks, and communities that want a better daily safety system.",
  },
  {
    question: "Why is the beta waitlist referral-based?",
    answer:
      "Because LifeSignal gets stronger through trusted networks. Families, neighbors, and caregivers naturally invite others who would benefit too.",
  },
];

export default function HomePage() {
  return (
    <SitePageShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.22),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.18),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-lg font-medium text-sky-200">
                Human safety platform
              </div>

              <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Peace of mind for the people you love most.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300 sm:text-xl">
                LifeSignal automatically checks in on loved ones, tracks routine
                consistency, and alerts the right people when something feels
                off. Built for families, caregivers, senior communities, and
                FaithSignaly support.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/beta"
                  className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-7 py-4 text-lg font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
                >
                  Join the beta
                </Link>
                <Link
                  href="/demo-dashboards"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
                >
                  How it works
                </Link>
              </div>

              <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-2xl font-bold text-sky-300">24/7</div>
                  <div className="mt-1 text-lg text-slate-300">
                    automated coverage without constant manual follow-up
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-2xl font-bold text-sky-300">Simple</div>
                  <div className="mt-1 text-lg text-slate-300">
                    text or voice check-ins with minimal friction
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-2xl font-bold text-sky-300">Fast</div>
                  <div className="mt-1 text-lg text-slate-300">
                    escalation to trusted contacts when a response is missed
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-sky-950/40 backdrop-blur">
                <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium uppercase tracking-[0.24em] text-sky-300">
                        Today’s check-in
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">
                        Good morning, Mary
                      </h2>
                    </div>
                    <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-lg font-semibold text-emerald-300">
                      Scheduled
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4">
                    <p className="text-lg font-medium text-sky-200">
                      Outgoing message
                    </p>
                    <p className="mt-2 text-base leading-9 text-slate-100">
                      “Hi Mary, this is your LifeSignal check-in. Reply YES if
                      you are okay.”
                    </p>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-lg text-slate-400">Response status</p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        Awaiting response
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-lg text-slate-400">Escalation plan</p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        Daughter → Neighbor
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                    <p className="text-lg font-medium text-amber-200">
                      If no reply is received
                    </p>
                    <ul className="mt-3 space-y-2 text-lg text-slate-200">
                      <li>• Reminder sent after check-in window</li>
                      <li>• Primary guardian notified</li>
                      <li>• Secondary contact alerted if needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.value}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="text-2xl font-bold text-white">{item.value}</div>
                <p className="mt-3 text-lg leading-9 text-slate-300">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LiveSafetyCounter />

      <section className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
              Why LifeSignal
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Safety check-ins that feel human, not clinical.
            </h2>
            <p className="mt-4 text-lg leading-9 text-slate-300">
              LifeSignal helps loved ones stay connected through consistent,
              low-friction check-ins with built-in escalation when it matters
              most.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-lg leading-9 text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr]">
            <div>
              <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
                How it works
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                A simple 3-step safety loop.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-9 text-slate-300">
                LifeSignal is designed to be easy for the person receiving the
                check-in and powerful for the people responsible for staying in
                the loop.
              </p>
            </div>

            <div className="space-y-5">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-500/15 text-lg font-bold text-sky-300">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-lg leading-9 text-slate-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
              Who it serves
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built for families, caregivers, and connected communities.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {audience.title}
                </h3>
                <p className="mt-3 text-lg leading-9 text-slate-300">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
              <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
                Real-world fit
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                Practical protection without overwhelming anyone.
              </h2>
              <ul className="mt-6 grid gap-3 text-slate-300">
                {useCases.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
              <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
                Viral rollout fit
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                Designed to spread through trusted human networks.
              </h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-slate-300">
                  Families naturally invite siblings and caregivers.
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-slate-300">
                  Neighbors can become part of a future guardian circle.
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-slate-300">
                  Churches, HOAs, and senior groups can validate local demand
                  early.
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-slate-300">
                  The referral waitlist turns every interested user into a
                  potential distribution node.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
              Pricing preview
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Simple pricing paths for families, caregivers, and communities.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className="rounded-[32px] border border-white/10 bg-white/5 p-8"
              >
                <p className="text-lg font-semibold uppercase tracking-[0.20em] text-sky-300">
                  {plan.name}
                </p>
                <h3 className="mt-4 text-4xl font-bold text-white">
                  {plan.price}
                </h3>
                <p className="mt-4 text-lg leading-9 text-slate-300">
                  {plan.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-lg text-slate-200"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/beta"
                  className="mt-6 inline-flex items-center justify-center rounded-2xl bg-sky-500 px-5 py-3 text-lg font-semibold text-white transition hover:bg-sky-400"
                >
                  Join beta
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
              Frequently asked questions
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Common questions about the LifeSignal rollout.
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-lg font-semibold text-white">
                  {faq.question}
                </h3>
                <p className="mt-3 text-lg leading-9 text-slate-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="rounded-[36px] border border-sky-400/20 bg-gradient-to-br from-sky-500/15 via-slate-900 to-violet-500/10 p-8 sm:p-10 lg:p-12">
            <div className="max-w-3xl">
              <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
                Early access
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Join the LifeSignal beta and help shape the future of everyday
                safety monitoring.
              </h2>
              <p className="mt-4 text-lg leading-9 text-slate-300">
                Be first in line for beta access, product updates, and launch
                announcements as LifeSignal expands across families, caregiver
                teams, and senior communities.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/beta"
                className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-7 py-4 text-lg font-semibold text-white transition hover:bg-sky-400"
              >
                Join the beta
              </Link>
              <Link
                href="/demo-dashboards"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SitePageShell>
  );
}
