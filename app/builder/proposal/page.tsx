"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type ProposalPayload = {
  ok: boolean;
  proposal?: {
    sessionId: string;
    tier: string;
    monthly: number;
    annual: number;
    selectedModules: string[];
    summary: string;
  };
  error?: string;
};

export default function BuilderProposalPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId") ?? "";
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ProposalPayload | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProposal() {
      if (!sessionId) {
        setData({ ok: false, error: "Missing session ID" });
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/builder/proposal?sessionId=${encodeURIComponent(sessionId)}`, {
          method: "GET",
        });
        const payload = (await response.json()) as ProposalPayload;
        if (!cancelled) {
          setData(payload);
        }
      } catch {
        if (!cancelled) {
          setData({ ok: false, error: "Unable to load proposal" });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProposal();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl p-6">
      <h1 className="text-3xl font-semibold">Proposal</h1>

      {loading ? <p className="mt-4 text-sm text-gray-600">Loading proposal...</p> : null}

      {!loading && data?.ok && data.proposal ? (
        <section className="mt-4 rounded-md border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-700">Tier: {data.proposal.tier}</p>
          <p className="text-sm text-gray-700">Monthly: ${data.proposal.monthly}</p>
          <p className="text-sm text-gray-700">Annual: ${data.proposal.annual}</p>
          <p className="mt-2 text-sm text-gray-700">Modules: {data.proposal.selectedModules.join(", ") || "None selected"}</p>
          <p className="mt-2 text-sm text-gray-700">{data.proposal.summary}</p>
        </section>
      ) : null}

      {!loading && (!data || !data.ok) ? (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {data?.error ?? "Proposal is unavailable."}
        </p>
      ) : null}

      <Link
        href="/builder"
        className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Back to builder
      </Link>
    </main>
  );
}
