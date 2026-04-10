"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BetaPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          consent,
          consentSource: "beta_form",
          source: "website"
        })
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || data?.details || "Failed to join waitlist");
      }

      const code = data?.referralCode || "";

      router.push(
        "/waitlist/success?code=" +
          encodeURIComponent(code) +
          "&email=" +
          encodeURIComponent(email)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <h1 className="text-4xl font-bold">Join the LifeSignal Beta</h1>

        <p className="mt-4 text-slate-300">
          Get early access and move up the list with referrals.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
            required
          />

          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
            required
          />

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
            />
            <span>
              I agree to receive SMS and voice messages from LifeSignal.
            </span>
          </label>

          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black"
          >
            {loading ? "Joining..." : "Join waitlist"}
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-400">
          Already joined?{" "}
          <Link href="/waitlist" className="underline">
            Check your status
          </Link>
        </div>
      </div>
    </main>
  );
}
