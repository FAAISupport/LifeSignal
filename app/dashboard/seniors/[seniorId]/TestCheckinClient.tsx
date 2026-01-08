"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

type Channel = "sms" | "voice" | "both";

export default function TestCheckinClient({ seniorId }: { seniorId: string }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [channel, setChannel] = React.useState<Channel>("both");

  async function runTest() {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/test/checkin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ seniorId, channel }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(String(json?.error || `Request failed (${res.status})`));
        return;
      }
      const checkinId = json?.checkinId ? `Check-in ID: ${json.checkinId}` : "Test check-in sent.";
      setSuccess(checkinId);
      // Refresh server components to show the new check-in record.
      router.refresh();
    } catch (e: any) {
      setError(e?.message || "Failed to send test check-in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Test check-in</h2>
          <p className="text-sm text-gray-600">
            Sends a one-off test check-in using the server route <code>/api/test/checkin</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value as Channel)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            aria-label="Test channel"
          >
            <option value="both">SMS + Voice</option>
            <option value="sms">SMS only</option>
            <option value="voice">Voice only</option>
          </select>

          <Button type="button" variant="primary" disabled={loading} onClick={runTest}>
            {loading ? "Sending…" : "Send test check-in"}
          </Button>
        </div>
      </div>

      {error ? (
        <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {success}
        </div>
      ) : null}
    </div>
  );
}
