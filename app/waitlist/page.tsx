"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function WaitlistPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
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
          firstName,
          lastName,
          email,
          phone,
          consent,
          consentSource: "lifesignal_waitlist_page",
          source: "website"
        })
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || data?.details || "Something went wrong.");
      }

      const referralCode = data?.referralCode || "";
      router.push(
        "/waitlist/success?code=" +
          encodeURIComponent(referralCode) +
          "&email=" +
          encodeURIComponent(email) +
          "&rank="
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <h1 className="text-4xl font-bold tracking-tight">Join the LifeSignal Waitlist</h1>

        <p className="mt-4 text-slate-300">
          Join early and get updates as LifeSignal rolls out.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-slate-200">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
                placeholder="First name"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-slate-200">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-200">
              Mobile phone
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
              placeholder="(555) 555-5555"
            />
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1"
              required
            />
            <span>
              I agree to receive SMS messages from LifeSignal for waitlist updates, onboarding, alerts, and related service notifications.
            </span>
          </label>

          {error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Joining..." : "Join waitlist"}
          </button>
        </form>
      </div>
    </main>
  );
}
