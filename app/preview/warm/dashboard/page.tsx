import Link from "next/link";

export default function WarmPreviewDashboard() {
  return (
    <div className="min-h-[calc(100vh-52px)] bg-rose-50/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/preview/warm" className="text-sm font-semibold text-neutral-900">
            ← Back
          </Link>
          <div className="text-xs text-neutral-500">Dashboard shell preview • No live data</div>
        </div>

        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          <aside className="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-neutral-900">Family menu</div>
            <div className="mt-4 space-y-2 text-sm">
              {["Loved Ones", "Check-ins", "Alerts", "Contacts", "Settings"].map((x) => (
                <div key={x} className="rounded-full px-4 py-2 font-semibold text-neutral-700 hover:bg-neutral-50">
                  {x}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[22px] bg-rose-50 p-4">
              <div className="text-xs font-semibold text-rose-700">Quick action</div>
              <div className="mt-2 rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white">
                Send test check-in
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-neutral-900">Loved ones</div>
              <p className="mt-1 text-sm text-neutral-600">
                Cards make it easy to see who’s okay at a glance.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  ["Mary", "Confirmed", "Last: YES • 9:02 AM"],
                  ["John", "Pending", "Next: 6:00 PM"],
                ].map(([name, status, meta]) => (
                  <div key={name} className="rounded-[24px] border border-neutral-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-base font-semibold text-neutral-900">{name}</div>
                      <div
                        className={
                          "rounded-full px-3 py-1 text-xs font-semibold " +
                          (status === "Confirmed"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700")
                        }
                      >
                        {status}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-neutral-600">{meta}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-neutral-900">Alerts (preview)</div>
              <div className="mt-4 rounded-[22px] border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
                No alerts right now.
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
