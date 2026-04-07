import Link from "next/link";
import React from "react";

type Stat = {
  label: string;
  value: string;
};

type PanelItem = {
  title: string;
  body: string;
};

export default function DemoDashboardShell({
  eyebrow,
  title,
  subtitle,
  badge,
  stats,
  leftTitle,
  leftItems,
  rightTitle,
  rightItems,
  ctaHref = "/church-demo/setup",
  ctaLabel = "Build Custom Demo"
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  badge: string;
  stats: Stat[];
  leftTitle: string;
  leftItems: PanelItem[];
  rightTitle: string;
  rightItems: PanelItem[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                {eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                {subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  {badge}
                </span>
                <Link
                  href={ctaHref}
                  className="rounded-2xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                Dashboard Snapshot
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              {leftTitle}
            </p>
            <div className="mt-6 space-y-4">
              {leftItems.map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
                  <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              {rightTitle}
            </p>
            <div className="mt-6 space-y-4">
              {rightItems.map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
                  <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


