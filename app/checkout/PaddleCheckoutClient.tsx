"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { publicEnv } from "@/lib/publicEnv";

declare global {
  interface Window {
    Paddle?: any;
  }
}

export function PaddleCheckoutClient({
  tier,
  cadence,
  customerEmail
}: {
  tier: string;
  cadence: string;
  customerEmail: string;
}) {
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paddleEnv = publicEnv.NEXT_PUBLIC_PADDLE_ENV;
  const clientToken = publicEnv.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

  const scriptSrc = "https://cdn.paddle.com/paddle/v2/paddle.js";

  useEffect(() => {
    if (!ready || !window.Paddle) return;

    try {
      window.Paddle.Initialize({
        environment: paddleEnv,
        token: clientToken,
        settings: { displayMode: "overlay", theme: "light", locale: "en" }
      });
    } catch (e: any) {
      setError(e?.message ?? "Failed to initialize Paddle");
    }
  }, [ready, paddleEnv, clientToken]);

  async function startCheckout() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/paddle/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, cadence })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Failed to create transaction");

      const transactionId = json.transactionId;
      if (!transactionId) throw new Error("Missing transactionId");

      if (!window.Paddle) throw new Error("Paddle not loaded");
      window.Paddle.Checkout.open({
        transactionId,
        customer: { email: customerEmail }
      });
    } catch (e: any) {
      setError(e?.message ?? "Checkout failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Script src={scriptSrc} strategy="afterInteractive" onLoad={() => setReady(true)} />
      <Button onClick={startCheckout} disabled={!ready || busy} className="w-full">
        {busy ? "Opening checkout…" : "Continue to secure checkout"}
      </Button>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <p className="mt-3 text-xs text-neutral-500">
        Payments are processed by Paddle (merchant of record). Cancel anytime. LifeSignal is not an emergency service.
      </p>
    </>
  );
}
