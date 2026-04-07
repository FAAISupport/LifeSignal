"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    Paddle?: {
      Environment?: { set: (env: string) => void };
      Setup?: (options: { token: string; eventCallback?: (event: unknown) => void }) => void;
      Checkout?: {
        open: (options: Record<string, unknown>) => void;
      };
    };
  }
}

type PaddleCheckoutButtonProps = {
  label?: string;
  priceId?: string;
  className?: string;
};

export default function PaddleCheckoutButton({
  label = "Start subscription",
  priceId,
  className = "",
}: PaddleCheckoutButtonProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const existing = document.querySelector(
      'script[data-paddle-script="true"]'
    ) as HTMLScriptElement | null;

    const boot = () => {
      const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
      const environment = process.env.NEXT_PUBLIC_PADDLE_ENV || "sandbox";

      if (!window.Paddle || !token) return;

      if (environment !== "production" && window.Paddle.Environment?.set) {
        window.Paddle.Environment.set("sandbox");
      }

      window.Paddle.Setup?.({ token });
      setReady(true);
    };

    if (existing) {
      if (window.Paddle) {
        boot();
      } else {
        existing.addEventListener("load", boot, { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.dataset.paddleScript = "true";
    script.addEventListener("load", boot, { once: true });
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", boot);
    };
  }, []);

  const openCheckout = () => {
    if (!window.Paddle?.Checkout?.open || !priceId) return;

    window.Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
    });
  };

  return (
    <button
      type="button"
      onClick={openCheckout}
      disabled={!ready || !priceId}
      className={className || "rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white disabled:opacity-50"}
    >
      {label}
    </button>
  );
}


