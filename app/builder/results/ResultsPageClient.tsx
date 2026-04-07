"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { BUILDER_MODULES } from "@/components/builder/ModuleSelector";
import { readBuilderSessionFromStorage } from "@/lib/builder-storage";

export default function BuilderResultsPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId") ?? "";
  const localSession = useMemo(() => readBuilderSessionFromStorage(), []);

  const selectedModuleLabels = useMemo(() => {
    const selected = localSession?.selectedModules ?? [];
    return BUILDER_MODULES.filter((module) => selected.includes(module.key)).map((module) => module.label);
  }, [localSession]);

  const matchesLocal = localSession && (!sessionId || localSession.sessionId === sessionId);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-14 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-300">Builder results</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">Your ChurchOS package is ready.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Review the summary, then open the proposal page for a cleaner shareable view.
          </p>
        </div>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-sm text-slate-400">Session</p>
              <p className="mt-2 break-all text-sm font-semibold text-white">{sessionId || localSession?.sessionId || "Unavailable"}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-sm text-slate-400">Source</p>
              <p className="mt-2 text-sm font-semibold capitalize text-white">{localSession?.source ?? "server"}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-sm text-slate-400">Estimated monthly</p>
              <p className="mt-2 text-2xl font-bold text-white">${localSession?.pricing.monthly ?? 0}</p>
            </div>
          </div>

          {matchesLocal ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h2 className="text-xl font-semibold text-white">Proposal snapshot</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{localSession.proposalSummary}</p>
                <p className="mt-4 text-sm text-slate-400">Recommended direction</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{localSession.recommendationSummary}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h2 className="text-xl font-semibold text-white">Included modules</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedModuleLabels.length > 0 ? (
                    selectedModuleLabels.map((label) => (
                      <span key={label} className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sm text-sky-200">
                        {label}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">No modules selected yet.</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
              A live session was created, but no local summary was found in this browser. You can still open the proposal page.
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/builder/proposal?sessionId=${encodeURIComponent(sessionId || localSession?.sessionId || "")}`}
              className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Open proposal view
            </Link>
            <Link
              href="/builder"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to builder
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}



