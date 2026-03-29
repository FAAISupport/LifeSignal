"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BuilderResultsPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId") ?? "";

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl p-6">
      <h1 className="text-3xl font-semibold">Builder results</h1>
      <p className="mt-2 text-sm text-gray-600">Your builder session has been saved.</p>

      {sessionId ? (
        <div className="mt-4 rounded-md border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-700">Session ID: {sessionId}</p>
          <Link
            href={`/builder/proposal?sessionId=${encodeURIComponent(sessionId)}`}
            className="mt-3 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            View proposal
          </Link>
        </div>
      ) : (
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          Missing session ID. Return to builder and save again.
        </div>
      )}
    </main>
  );
}
