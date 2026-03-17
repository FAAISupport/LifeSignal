import type { Metadata } from "next";
import Link from "next/link";
import DemoPreviewCard from "@/components/site/DemoPreviewCard";

export const metadata: Metadata = {
  title: "LifeSignal PostOP",
  description:
    "Post-surgical recovery monitoring with pain trends, healing timelines, vitals, messaging, and early warning signals."
};

export default function PostOpPage() {
  return (
    <>
      <main className="bg-[#020817] text-white">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.22),transparent_36%),radial-gradient(circle_at_78%_22%,rgba(236,72,153,0.12),transparent_28%)]" />
          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-rose-400/30 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200">
                LifeSignal PostOP
              </div>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                A safer recovery window after surgery.
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">
                Monitor post-surgical pain, incision healing, vitals, medication adherence, and clinician communication in one place.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-rose-500 px-7 py-4 text-lg font-semibold text-white transition hover:bg-rose-400"
                >
                  Talk to a Care Team
                </Link>
                <Link
                  href="/demo-dashboards?role=postop"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
                >
                  View PostOP Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <DemoPreviewCard role="postop" />
    </>
  );
}
