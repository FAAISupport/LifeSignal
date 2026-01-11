import Link from "next/link";

export default function CalmPreviewDashboard() {
  return (
    <div className="min-h-[calc(100vh-52px)] bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/preview/calm" className="text-sm font-semibold text-neutral-900">
            ← Back to Calm Home
          </Link>
          <div className="text-xs text-neutral-500">Dashboard shell preview • No live data</div>
        </div>

        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          <aside className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-neutral-900">Navigation</div>
            <div className="mt-4 space-y-2 text-sm">
              {["Loved Ones", "Check-ins", "Alerts", "Contacts", "Settings"].map((x) => (
                <div key={x} className="rounded-2xl px-3 py-2 font-semibold text-neutral-700 hover:bg-neutral-50">
                  {x}
                </div>
              ))}
            </div>
          </aside>

          <main className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-neutral-900">Today</div>
              <p className="mt-2 text-sm text-neutral-700">
                Overview of scheduled check-ins, responses, and escalations.
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {[
                  ["Pending", "2"],
                  ["Confirmed", "5"],
                  ["Missed", "0"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
                    <div className="text-xs text-neutral-500">{k}</div>
                    <div className="mt-1 text-2xl font-semibold text-neutral-900">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-neutral-900">Activity Log (preview)</div>
              <div className="mt-4 space-y-3 text-sm text-neutral-700">
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  9:00 AM • Check-in sent to Mary
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  9:02 AM • Response received: YES
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  9:03 AM • Status updated: Confirmed
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
