"use client";

type ProposalPageClientProps = {
  sessionId?: string;
};

export default function ProposalPageClient({ sessionId }: ProposalPageClientProps) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Proposal Builder
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Proposal Preview
          </h1>
          <p className="text-sm text-slate-600">
            This client component has been repaired so the build can continue.
          </p>
          {sessionId ? (
            <p className="text-sm text-slate-700">
              Active session: <span className="font-mono">{sessionId}</span>
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
