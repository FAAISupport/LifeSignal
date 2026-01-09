"use client";

import * as React from "react";

type Props = {
  seniorId: string;
  label?: string;
  variant?: "primary" | "secondary";
  channel?: "sms" | "voice" | "both";
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function TestCheckinButton({
  seniorId,
  label = "Send test",
  variant = "primary",
  channel = "both",
}: Props) {
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);

  async function run() {
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch("/api/test/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seniorId, channel }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
        message?: string;
      };

      if (!res.ok) {
        setMsg(data.error || "Could not send test check-in.");
        return;
      }

      setMsg(data.message || "Sent");
      window.setTimeout(() => setMsg(null), 3000);
    } catch {
      setMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={run}
      disabled={loading}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50",
        variant === "primary"
          ? "bg-brand-navy text-white hover:opacity-95"
          : "border border-brand-navy/20 bg-white text-brand-navy hover:bg-brand-mist"
      )}
      title="Sends a one-time test SMS/voice check-in to this loved one"
    >
      {loading ? "Sending..." : label}
      {msg ? (
        <span className="ml-2 text-xs font-medium opacity-80">{msg}</span>
      ) : null}
    </button>
  );
}
