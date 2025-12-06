// components/SubscribeForm.tsx
"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "ok" | "error">(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      seniorName: formData.get("seniorName") as string,
      seniorLocation: formData.get("seniorLocation") as string,
      plan: formData.get("plan") as string, // "lite" | "standard" | "plus"
    };

    setLoading(true);
    setStatus(null);
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      setStatus("ok");
      setMessage(
        "Thanks! We’ve received your request and will follow up to complete setup."
      );
      e.currentTarget.reset();
    } catch (err: any) {
      setStatus("error");
      setMessage(
        err?.message || "Something went wrong. Please try again or contact us directly."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 mt-4 bg-white border border-slate-200 rounded-2xl p-4"
    >
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Your name
          </label>
          <input
            name="name"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Your email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Senior&apos;s name
          </label>
          <input
            name="seniorName"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Who is this for?"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Senior&apos;s city / community
          </label>
          <input
            name="seniorLocation"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="e.g. The Villages, FL"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Plan you&apos;re interested in
        </label>
        <select
          name="plan"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          defaultValue="standard"
        >
          <option value="lite">Lite – $39/mo</option>
          <option value="standard">Standard – $69/mo (most popular)</option>
          <option value="plus">Plus – $99/mo</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex justify-center items-center bg-sky-600 hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-4 py-2.5 rounded-xl text-sm mt-2"
      >
        {loading ? "Sending..." : "Request setup"}
      </button>

      {status && (
        <p
          className={`text-xs mt-1 ${
            status === "ok" ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
