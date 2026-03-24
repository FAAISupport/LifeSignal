import type { Metadata } from "next";
import Link from "next/link";
import DemoPreviewCard from "@/components/site/DemoPreviewCard";

export const metadata: Metadata = {
  title: "LifeSignal Recover",
  description:
    "Recovery-focused accountability dashboards with streaks, sponsor messaging, meetings, and relapse-prevention visibility."
};

export default function RecoverPage() {
  return (
    <>
      <main className="bg-[#020817] text-white">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.22),transparent_36%),radial-gradient(circle_at_78%_22%,rgba(251,146,60,0.12),transparent_28%)]" />
          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-200">
                LifeSignal Recover
              </div>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Structured accountability for recovery support.
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">
                Track streaks, meetings, sponsor touchpoints, triggers, and supportive intervention from one recovery-centered dashboard.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-7 py-4 text-lg font-semibold text-white transition hover:bg-amber-400"
                >
                  Explore Recover
                </Link>
                <Link
                  href="/demo-dashboards?role=recover"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
                >
                  View Recover Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <DemoPreviewCard role="recover" />
    </>
  );
}
