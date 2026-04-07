"use client";

import { useSearchParams } from "next/navigation";

export default function WaitlistSuccessPage() {
  const params = useSearchParams();

  const code = params.get("code") || "";
  const email = params.get("email") || "";
  const rank = params.get("rank") || "—";

  const shareUrl = `https://lifesignal.app/waitlist?ref=${code}`;

  function copyLink() {
    navigator.clipboard.writeText(shareUrl);
    alert("Referral link copied!");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl">

        <p className="text-sm uppercase tracking-widest text-cyan-300">
          You are in
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Welcome to the LifeSignal waitlist
        </h1>

        <p className="mt-4 text-slate-300">
          Your spot is secured. Move up the list by inviting others.
        </p>

        {/* INFO CARDS */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-xl bg-slate-950 p-4 border border-slate-700">
            <p className="text-xs text-slate-400">Email</p>
            <p className="mt-1 font-semibold">{email}</p>
          </div>

          <div className="rounded-xl bg-slate-950 p-4 border border-slate-700">
            <p className="text-xs text-slate-400">Referral Code</p>
            <p className="mt-1 font-semibold text-cyan-300">{code}</p>
          </div>

          <div className="rounded-xl bg-slate-950 p-4 border border-slate-700">
            <p className="text-xs text-slate-400">Current Rank</p>
            <p className="mt-1 font-semibold text-white">{rank}</p>
          </div>

        </div>

        {/* SHARE BLOCK */}
        <div className="mt-8 rounded-xl bg-slate-900 p-6 border border-cyan-500/20">

          <h2 className="text-xl font-semibold">
            Move up the waitlist 🚀
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Every person you invite moves you higher.
          </p>

          <div className="mt-4 flex gap-2">
            <input
              value={shareUrl}
              readOnly
              className="flex-1 rounded-lg bg-slate-950 px-3 py-2 text-sm border border-slate-700"
            />

            <button
              onClick={copyLink}
              className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black"
            >
              Copy
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}
