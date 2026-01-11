import Link from "next/link";

export default function ModernPreviewDashboard() {
  return (
    <div className="min-h-[calc(100vh-52px)] bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <Link href="/preview/modern" className="text-sm font-semibold text-neutral-900">
            ← Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold">
              + Add Loved One
            </div>
            <div className="rounded-xl bg-neutral-900 px-3 py-2 text-sm font-semibold text-white">
              Send Test
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[220px_1fr]">
          <aside className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
            <div className="text-xs font-semibold text-neutral-500">MENU</div>
            <div className="mt-3 space-y-1 text-sm font-semibold">
              {["Overview", "Loved Ones", "Check-ins", "Alerts", "Settings"].map((x) => (
                <div key={x} className="rounded-2xl px-3 py-2 text-neutral-800 hover:bg-white">
                  {x}
                </div>
              ))}
            </div>
          </aside>

          <main className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-neutral-900">Timeline</div>
              <p className="mt-1 text-sm text-neutral-600">A linear view of check-ins and outcomes.</p>

              <div className="mt-5 space-y-3">
                {[
                  ["9:00 AM", "Check-in sent • Mary"],
                  ["9:02 AM", "Response received • YES"],
                  ["9:03 AM", "Status updated • Confirmed"],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                    <div className="text-xs text-neutral-500">{t}</div>
                    <div className="mt-1 text-sm font-semibold text-neutral-900">{d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["Active loved ones", "3"],
                ["Next check-ins", "2"],
                ["Escalations", "0"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="text-xs text-neutral-500">{k}</div>
                  <div className="mt-1 text-2xl font-semibold text-neutral-900">{v}</div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
