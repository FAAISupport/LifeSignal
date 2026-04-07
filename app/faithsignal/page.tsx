"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Category =
  | "All"
  | "Care"
  | "Engagement"
  | "Pastoral"
  | "Safety"
  | "Operations"
  | "Insights";

type Feature = {
  category: Exclude<Category, "All">;
  title: string;
  price: string;
  description: string;
};

const categories: Category[] = [
  "All",
  "Care",
  "Engagement",
  "Pastoral",
  "Safety",
  "Operations",
  "Insights"
];

const features: Feature[] = [
  {
    category: "Care",
    title: "Daily Member Check-Ins",
    price: "/mo",
    description:
      "Automated daily text and voice check-ins for members who live alone, are homebound, or need regular follow-up."
  },
  {
    category: "Care",
    title: "Pastoral Care Rounds",
    price: "/mo",
    description:
      "Organizes recurring care touchpoints and assignment queues for staff and volunteers."
  },
  {
    category: "Engagement",
    title: "Volunteer Response Coordination",
    price: "/mo",
    description:
      "Routes care tasks to the right people fast so response does not stall."
  },
  {
    category: "Pastoral",
    title: "Prayer Request Triage",
    price: "/mo",
    description:
      "Captures prayer needs, prioritizes urgency, and helps leadership stay accountable."
  },
  {
    category: "Safety",
    title: "Wellness Escalation Alerts",
    price: "/mo",
    description:
      "Triggers follow-up alerts when a member misses a check-in or may need immediate attention."
  },
  {
    category: "Operations",
    title: "Care Team Workflow Board",
    price: "/mo",
    description:
      "Gives your church one place to see tasks, outreach, follow-up, and care activity."
  },
  {
    category: "Insights",
    title: "Leadership Visibility Reports",
    price: "/mo",
    description:
      "Summarizes care activity, open needs, and response trends for ministry leaders."
  },
  {
    category: "Safety",
    title: "Emergency Contact Tree",
    price: "/mo",
    description:
      "Creates a structured contact sequence for urgent member situations and missed responses."
  },
  {
    category: "Engagement",
    title: "Member Follow-Up Sequences",
    price: "/mo",
    description:
      "Keeps visitors, absent members, and care cases from slipping through the cracks."
  }
];

export default function FaithSignalPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredFeatures = useMemo(() => {
    if (activeCategory === "All") return features;
    return features.filter((feature) => feature.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-transparent text-white">
      <section className="relative overflow-hidden border-b border-cyan-500/10 px-6 pb-16 pt-10 pb-16 sm:pb-20 sm:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_34%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
              FaithSignal for Churches
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Church care infrastructure that helps make sure nobody falls through the cracks
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              FaithSignal helps churches organize member check-ins, care coordination,
              prayer follow-up, volunteer response, and care visibility in one place.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/beta"
                className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.18)] transition hover:-translate-y-0.5 hover:opacity-95"
              >
                Start a Pilot
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-2xl border border-cyan-500/20 bg-slate-950/60 px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-cyan-400"
              >
                See the Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={
                    active
                      ? "rounded-full border border-cyan-400/40 bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.18)] transition"
                      : "rounded-full border border-cyan-500/20 bg-slate-950/70 px-5 py-2 text-sm font-semibold text-slate-200 backdrop-blur transition hover:border-cyan-400 hover:text-cyan-300"
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid gap-8 md:grid-cols-2">
              {filteredFeatures.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-cyan-500/15 bg-slate-950/78 p-6 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                      {feature.category}
                    </div>
                    <div className="rounded-full border border-cyan-500/20 bg-white px-4 py-2 text-sm font-bold text-slate-950">
                      {feature.price}
                    </div>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold text-white">
                    {feature.title}
                  </h2>

                  <p className="mt-4 leading-7 text-slate-300">
                    {feature.description}
                  </p>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="rounded-2xl border border-cyan-500/20 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400 hover:text-white"
                    >
                      Add to Setup
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-3xl border border-cyan-500/15 bg-slate-950/78 p-6 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur lg:sticky lg:top-28">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                FaithSignal Cart
              </div>

              <h2 className="mt-4 text-3xl font-bold text-white">
                Your Church Setup
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                Choose exactly the services your church wants. Start with a focused setup,
                then add more care infrastructure as you grow.
              </p>

              <div className="mt-8 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Church name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter church name"
                    className="w-full rounded-2xl border border-cyan-500/15 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Primary goal
                  </label>
                  <select className="w-full rounded-2xl border border-cyan-500/15 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400">
                    <option>Improve care coordination</option>
                    <option>Catch missed member needs</option>
                    <option>Organize volunteers</option>
                    <option>Increase pastoral visibility</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-cyan-500/15 bg-slate-900/70 p-4">
                <div className="text-sm font-semibold text-white">Starter recommendation</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>• Daily Member Check-Ins</li>
                  <li>• Pastoral Care Rounds</li>
                  <li>• Volunteer Response Coordination</li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/beta"
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.18)] transition hover:-translate-y-0.5 hover:opacity-95"
                >
                  Start Church Pilot
                </Link>
                <button
                  type="button"
                  className="rounded-2xl border border-cyan-500/20 bg-slate-950/70 px-5 py-3 font-semibold text-white transition hover:border-cyan-400"
                >
                  Save Setup
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}



