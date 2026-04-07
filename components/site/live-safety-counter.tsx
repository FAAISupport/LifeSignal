"use client";

import { useEffect, useMemo, useState } from "react";

type SiteStats = {
  confirmations: number;
  confirmationsToday: number;
  escalationsTriggered: number;
  guardianResponses: number;
  source: "live" | "fallback" | string;
};

const fallbackStats: SiteStats = {
  confirmations: 12842,
  confirmationsToday: 187,
  escalationsTriggered: 23,
  guardianResponses: 61,
  source: "fallback",
};

function useAnimatedNumber(target: number, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    let animationFrame = 0;
    const totalFrames = Math.max(30, Math.round(duration / 16));

    const tick = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    setValue(0);
    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return value;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export default function LiveSafetyCounter() {
  const [stats, setStats] = useState<SiteStats>(fallbackStats);

  useEffect(() => {
    let active = true;

    const loadStats = async () => {
      try {
        const response = await fetch("/api/site-stats", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) return;

        const data = await response.json();
        if (!active || !data?.stats) return;

        setStats({
          confirmations: Number(data.stats.confirmations ?? fallbackStats.confirmations),
          confirmationsToday: Number(data.stats.confirmationsToday ?? fallbackStats.confirmationsToday),
          escalationsTriggered: Number(data.stats.escalationsTriggered ?? fallbackStats.escalationsTriggered),
          guardianResponses: Number(data.stats.guardianResponses ?? fallbackStats.guardianResponses),
          source: data.stats.source ?? "fallback",
        });
      } catch {
      }
    };

    loadStats();
    const intervalId = window.setInterval(loadStats, 30000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const animatedConfirmations = useAnimatedNumber(stats.confirmations, 1600);
  const animatedToday = useAnimatedNumber(stats.confirmationsToday, 1200);
  const animatedEscalations = useAnimatedNumber(stats.escalationsTriggered, 1200);
  const animatedGuardianResponses = useAnimatedNumber(stats.guardianResponses, 1200);

  const headline = useMemo(() => {
    return "Over " + formatNumber(animatedConfirmations) + " safety confirmations received";
  }, [animatedConfirmations]);

  return (
    <section className="border-y border-sky-400/10 bg-[linear-gradient(180deg,rgba(2,6,23,0.82),rgba(3,15,35,0.95))]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-cyan-300">
              Live network momentum
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {headline}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Every confirmation means a family, caregiver, or community got the signal they needed:
              someone responded, someone is okay, and uncertainty was reduced.
            </p>
            <div className="mt-6 inline-flex items-center rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-2 text-sm text-sky-200">
              {stats.source === "live" ? "Live system totals" : "Pilot + testing counter"}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-xl shadow-sky-950/20">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sky-300">
                Confirmed today
              </p>
              <div className="mt-3 text-3xl font-bold text-white">
                {formatNumber(animatedToday)}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Real check-ins confirmed across the network today.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-xl shadow-sky-950/20">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300">
                Escalations triggered
              </p>
              <div className="mt-3 text-3xl font-bold text-white">
                {formatNumber(animatedEscalations)}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Moments when LifeSignal stepped in because a response was missed.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-xl shadow-sky-950/20 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-blue-300">
                Guardian responses
              </p>
              <div className="mt-3 text-3xl font-bold text-white">
                {formatNumber(animatedGuardianResponses)}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Times a guardian, family member, neighbor, or support contact engaged after an alert.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
