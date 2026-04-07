"use client";

import { useEffect, useMemo, useState } from "react";

type LeaderboardEntry = {
  rank: number;
  name: string;
  referralCode: string;
  referralsCount: number;
};

type CountResponse = {
  count: number;
};

type LeaderboardResponse = {
  leaderboard: LeaderboardEntry[];
};

export default function WaitlistStats() {
  const [count, setCount] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const formattedCount = useMemo(() => {
    if (count === null) {
      return "—";
    }

    return new Intl.NumberFormat("en-US").format(count);
  }, [count]);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const [countResponse, leaderboardResponse] = await Promise.all([
          fetch("/api/waitlist/count", {
            method: "GET",
            cache: "no-store",
          }),
          fetch("/api/waitlist/leaderboard", {
            method: "GET",
            cache: "no-store",
          }),
        ]);

        const countJson = (await countResponse.json()) as CountResponse;
        const leaderboardJson =
          (await leaderboardResponse.json()) as LeaderboardResponse;

        if (!isMounted) {
          return;
        }

        setCount(typeof countJson.count === "number" ? countJson.count : 0);
        setLeaderboard(
          Array.isArray(leaderboardJson.leaderboard)
            ? leaderboardJson.leaderboard
            : []
        );
      } catch {
        if (!isMounted) {
          return;
        }

        setCount(0);
        setLeaderboard([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();

    const interval = window.setInterval(load, 15000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="space-y-5">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
              Live waitlist
            </p>
            <h3 className="mt-3 text-3xl font-bold text-white">
              {loading ? "Loading..." : formattedCount}
            </h3>
            <p className="mt-2 text-lg leading-6 text-slate-300">
              People and organizations currently raising their hand for early
              LifeSignal access.
            </p>
          </div>

          <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-base font-semibold uppercase tracking-[0.20em] text-emerald-200">
            Live
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
            <p className="text-base uppercase tracking-[0.20em] text-slate-400">
              Referrals matter
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              Higher priority
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
            <p className="text-base uppercase tracking-[0.20em] text-slate-400">
              Best shares
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              Family and caregivers
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
            <p className="text-base uppercase tracking-[0.20em] text-slate-400">
              Refresh rate
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              Every 15 seconds
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold uppercase tracking-[0.24em] text-sky-300">
              Top referrers
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white">
              Live leaderboard
            </h3>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50">
          <div className="grid grid-cols-[72px_1fr_120px] gap-3 border-b border-white/10 px-4 py-3 text-base font-semibold uppercase tracking-[0.20em] text-slate-400">
            <div>Rank</div>
            <div>Name</div>
            <div className="text-right">Invites</div>
          </div>

          {leaderboard.length > 0 ? (
            leaderboard.map((entry) => (
              <div
                key={`${entry.rank}-${entry.referralCode}`}
                className="grid grid-cols-[72px_1fr_120px] gap-3 border-b border-white/10 px-4 py-3 last:border-b-0"
              >
                <div className="text-lg font-semibold text-sky-300">
                  #{entry.rank}
                </div>
                <div className="text-lg text-white">{entry.name}</div>
                <div className="text-right text-lg font-semibold text-white">
                  {entry.referralsCount}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-6 text-lg text-slate-400">
              No referrals have been recorded yet. Be the first to climb the
              board.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}





