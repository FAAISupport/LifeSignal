import type { Metadata } from "next";
import Link from "next/link";
import DemoPreviewCard from "@/components/site/DemoPreviewCard";

export const metadata: Metadata = {
  title: "LifeSignal for Caregivers",
  description:
    "LifeSignal helps caregivers manage client check-ins, medication workflows, and escalation tasks from one dashboard."
};

export default function CaregiversPage() {
  return (
    <>
      <main className="bg-[#020817] text-white">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.22),transparent_35%),radial-gradient(circle_at_75%_25%,rgba(14,165,233,0.12),transparent_26%)]" />
          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm font-semibold text-violet-200">
                LifeSignal for Caregivers
              </div>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Monitor more people with less chaos.
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">
                Care teams can manage daily check-ins, notes, medication workflows, and escalations in one clean system.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-violet-500 px-7 py-4 text-lg font-semibold text-white transition hover:bg-violet-400"
                >
                  Book a Demo
                </Link>
                <Link
                  href="/demo-dashboards?role=caregiver"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
                >
                  View Caregiver Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <DemoPreviewCard />
    </>
  );
}











