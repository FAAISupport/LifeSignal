"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function StartPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paid = searchParams.get("paid");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      seniorName: (form.elements.namedItem("seniorName") as HTMLInputElement)
        .value,
      seniorPhone: (form.elements.namedItem("seniorPhone") as HTMLInputElement)
        .value,
      timezone: (form.elements.namedItem("timezone") as HTMLSelectElement)
        .value,
      checkinHour: parseInt(
        (form.elements.namedItem("checkinHour") as HTMLSelectElement).value,
        10
      ),
      checkinMinute: parseInt(
        (form.elements.namedItem("checkinMinute") as HTMLSelectElement).value,
        10
      ),
      caregiverName: (
        form.elements.namedItem("caregiverName") as HTMLInputElement
      ).value,
      caregiverPhone: (
        form.elements.namedItem("caregiverPhone") as HTMLInputElement
      ).value,
      caregiverEmail: (
        form.elements.namedItem("caregiverEmail") as HTMLInputElement
      ).value,
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 402) {
        const body = await res.json().catch(() => ({}));
        const email = body.email || data.caregiverEmail;
        router.push(`/paywall?email=${encodeURIComponent(email)}`);
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Registration failed");
      }

      router.push("/thanks");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-white shadow-sm rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          Set up daily LifeSignal check-ins
        </h1>

        <p className="text-sm text-slate-600 text-center">
          Tell us who we&apos;re checking on and who to alert if they don&apos;t
          respond to their daily text.
        </p>

        <p className="text-xs text-slate-500 text-center">
          You&apos;ll be asked to{" "}
          <span className="font-semibold">activate LifeSignal</span> after this
          step. No contracts. Cancel anytime.
        </p>

        {paid && (
          <p className="text-xs text-green-600 text-center">
            Payment confirmed. Complete this form to finish setting up
            LifeSignal.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <fieldset className="space-y-3">
              <legend className="font-semibold text-sm text-slate-800">
                Senior
              </legend>
              <input
                name="seniorName"
                required
                placeholder="Senior's full name"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
              <input
                name="seniorPhone"
                required
                placeholder="Senior's mobile phone (for check-in SMS)"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
              <label className="flex flex-col gap-1 text-xs text-slate-700">
                Timezone
                <select
                  name="timezone"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  defaultValue="America/New_York"
                >
                  <option value="America/New_York">Eastern</option>
                  <option value="America/Chicago">Central</option>
                  <option value="America/Denver">Mountain</option>
                  <option value="America/Los_Angeles">Pacific</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs text-slate-700">
                Daily check-in time
                <div className="flex gap-2">
                  <select
                    name="checkinHour"
                    className="border rounded-md px-2 py-2 text-sm w-1/2"
                  >
                    {hours.map((h) => (
                      <option key={h} value={h}>
                        {h.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <select
                    name="checkinMinute"
                    className="border rounded-md px-2 py-2 text-sm w-1/2"
                  >
                    {minutes.map((m) => (
                      <option key={m} value={m}>
                        {m.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="font-semibold text-sm text-slate-800">
                Caregiver
              </legend>
              <input
                name="caregiverName"
                required
                placeholder="Your full name"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
              <input
                name="caregiverPhone"
                required
                placeholder="Your mobile phone (for alerts)"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
              <input
                name="caregiverEmail"
                type="email"
                required
                placeholder="Your email (used for billing & login)"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </fieldset>
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Continue to Activation"}
          </button>
        </form>

        <p className="text-[11px] text-slate-400 text-center">
          LifeSignal is a supplemental tool and does not replace calling 911 or
          local emergency services.
        </p>
      </div>
    </div>
  );
}
