"use client";

import { FormEvent, useEffect, useState } from "react";

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch("/api/waitlist/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();

    if (data?.ok) {
      window.location.href = "/waitlist/success?code=" + data.referralCode;
    } else {
      alert("Something went wrong");
    }

    setSubmitting(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white px-6">
      <div className="w-full max-w-md rounded-3xl bg-white/95 p-8 text-slate-900 shadow-2xl">
        <h1 className="text-2xl font-bold mb-4">Join the LifeSignal Beta</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white"
          >
            {submitting ? "Joining..." : "Join Beta"}
          </button>
        </form>
      </div>
    </main>
  );
}
