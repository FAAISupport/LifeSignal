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
  label = "Send test check-in",
  variant = "secondary",
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
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ seniorId, channel }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setMsg("Sent ✅");
      setTimeout(() => setMsg(null), 2500);
    } catch (e: any) {
      setMsg(e?.message || "Failed");
      setTimeout(() => setMsg(null), 4000);
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
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-50 disabled:pointer-events-none",
        variant === "primary"
          ? "bg-brand-navy text-white hover:opacity-90"
          : "border border-brand-navy/20 bg-white hover:bg-brand-mist"
      )}
      title="Sends a one-time test SMS/voice check-in to this loved one"
    >
      {loading ? "Sending..." : label}
      {msg ? <span className="ml-2 text-xs font-medium opacity-80">{msg}</span> : null}
    </button>
  );
}
