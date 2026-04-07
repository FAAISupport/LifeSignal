"use client";

import { useState } from "react";

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    setLoading(true);

    const res = await fetch("/api/waitlist/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();

    if (data?.ok) {
      window.location.href =
        "/waitlist/success?code=" +
        (data.referralCode || data.data?.referral_code || "");
    } else {
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 text-white">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 p-8 shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-white">
          Join the LifeSignal Beta
        </h1>

        <input
          className="w-full mb-4 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-4 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleJoin}
          className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black"
        >
          {loading ? "Joining..." : "Join Beta"}
        </button>
      </div>
    </main>
  );
}
