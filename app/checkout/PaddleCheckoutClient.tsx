"use client";

import React, { useState } from "react";
import { publicEnv } from "@/lib/publicEnv";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

declare global {
  interface Window {
    Paddle?: any;
  }
}

function loadPaddleScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve();
    if (window.Paddle) return resolve();

    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve();

    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Paddle.js"));
    document.head.appendChild(s);
  });
}

type PlanTier = "checkin" | "assurance" | "facility";
type PlanCadence = "monthly" | "annual";

export function PaddleCheckoutClient({
  tier,
  cadence,
  customerEmail,
}: {
  tier: PlanTier;
  cadence: PlanCadence;
  customerEmail?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paddleEnv = publicEnv.PADDLE_ENV;
  const clientToken = publicEnv.PADDLE_CLIENT_TOKEN;

  const scriptSrc = "https://cdn.paddle.com/paddle/v2/paddle.js";

  async function startCheckout() {
    setError(null);

    if (!clientToken) {
      setError("Billing is not configured (missing Paddle client token).");
      return;
    }

    setLoading(true);
    try {
      await loadPaddleScript(scriptSrc);

      if (!window.Paddle) throw new Error("Paddle.js not available");

      window.Paddle.Environment.set(paddleEnv);
      window.Paddle.Setup({ token: clientToken });

      const res = await fetch("/api/paddle/transaction", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tier,
          cadence,
          customerEmail: customerEmail ?? undefined,
        }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Failed to create transaction");
      }

      const { transactionId } = (await res.json()) as { transactionId: string };
      window.Paddle.Checkout.open({ transactionId });
    } catch (e: any) {
      setError(e?.message ?? "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  if (!clientToken) {
    return (
      <Card>
        <div className="text-sm font-semibold text-brand-navy">
          Billing not configured
        </div>
        <p className="mt-2 text-sm text-neutral-700">
          Add <code>NEXT_PUBLIC_PADDLE_CLIENT_TOKEN</code> and{" "}
          <code>NEXT_PUBLIC_PADDLE_ENV</code> in Vercel to enable checkout.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}
      <Button onClick={startCheckout} disabled={loading}>
        {loading ? "Opening checkout…" : "Continue to checkout"}
      </Button>
    </div>
  );
}
