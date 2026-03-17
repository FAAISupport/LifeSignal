import type { Metadata } from "next";
import Link from "next/link";
import DemoPreviewCard from "@/components/site/DemoPreviewCard";

export const metadata: Metadata = {
  title: "LifeSignal for Families",
  description:
    "LifeSignal helps families stay connected with daily reassurance, missed check-in alerts, and peace of mind."
};

export default function FamiliesPage() {
  return (
    <>
      <main className="bg-[#020817] text-white">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.22),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.16),transparent_28%)]" />
          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-200">
                LifeSignal for Families
              </div>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Peace of mind without constant checking.
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">
                LifeSignal helps families know when a loved one is okay, and quickly respond when a check-in is missed.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/beta"
                  className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-7 py-4 text-lg font-semibold text-white transition hover:bg-sky-400"
                >
                  Join Beta
                </Link>
                <Link
                  href="/demo-dashboards?role=family"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
                >
                  View Family Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-bold text-white">Daily reassurance</h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Get simple confirmation that your loved one responded today.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-bold text-white">Missed check-in alerts</h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  If a response is missed, LifeSignal alerts the right people in the right order.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-bold text-white">Shared care circle</h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Coordinate with siblings, neighbors, and caregivers from one place.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <DemoPreviewCard role="family" />
    </>
  );
}
