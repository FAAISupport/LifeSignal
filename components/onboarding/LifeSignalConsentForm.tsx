"use client";

import { useState } from "react";

export default function LifeSignalConsentForm() {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!consent) {
      setMessage("You must agree to receive SMS messages to continue.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/waitlist/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone,
          consent: true,
          consentSource: "lifesignal_onboarding_form",
          source: "lifesignal_web"
        })
      });

      const data = await res.json();

      if (data.ok) {
        setMessage("You are in. Check your phone for confirmation.");
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setMessage("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto bg-slate-900 p-6 rounded-xl border border-cyan-500/20"
    >
      <h2 className="text-2xl font-bold text-cyan-400">
        Stay Connected with LifeSignal
      </h2>

      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700"
        required
      />

      <div className="text-sm text-gray-300 space-y-3">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          <span>
            I agree to receive text messages from <b>LifeSignal</b> at the phone number provided.
            <br /><br />
            These messages may include:
            <br />• daily safety check-ins
            <br />• missed check-in alerts
            <br />• caregiver or guardian notifications
            <br />• account and service updates
            <br /><br />
            Message frequency varies. Message and data rates may apply.
            Reply <b>STOP</b> to opt out or <b>HELP</b> for help.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-500 text-black font-bold py-3 rounded-lg"
      >
        {loading ? "Submitting..." : "Join LifeSignal"}
      </button>

      {message && (
        <p className="text-sm text-center text-gray-400">{message}</p>
      )}
    </form>
  );
}
