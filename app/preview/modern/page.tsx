import Link from "next/link";

export default function ModernPreviewHome() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="flex items-center justify-between">
        <div className="text-sm font-semibold text-neutral-900">
          LifeSignal <span className="text-neutral-400">• Modern SaaS</span>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <Link className="text-neutral-700 hover:underline" href="/preview/modern/login">
            Log in
          </Link>
          <Link
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
            href="/preview/modern/login"
          >
            Start free
          </Link>
        </nav>
      </header>

      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-neutral-900">
            Daily check-ins.
            <br />
            Instant clarity.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-700">
            Automate daily wellness check-ins via SMS or voice. Track responses, escalate on no-reply,
            and keep a clean timeline.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/preview/modern/login"
              className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
            >
              Start free
            </Link>
            <Link
              href="/preview/modern/dashboard"
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Open dashboard
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 text-sm">
            {["SMS + Voice", "Escalation rules", "Audit timeline", "No wearables"].map((x) => (
              <div
                key={x}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 font-semibold text-neutral-800"
              >
                {x}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-neutral-900">Command Center</div>
            <div className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700">
              Preview
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {[
              ["Check-in sent", "Mary • 9:00 AM"],
              ["Response received", "YES • 9:02 AM"],
              ["Escalation", "Not triggered"],
              ["Next scheduled", "Tomorrow • 9:00 AM"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                <div className="text-xs text-neutral-500">{k}</div>
                <div className="mt-1 text-sm font-semibold text-neutral-900">{v}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white">
              + Add Loved One
            </div>
            <div className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-900">
              Send Test
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-16 border-t border-neutral-200 pt-8 text-sm text-neutral-600">
        Preview only • Modern SaaS conversion-first layout
      </footer>
    </main>
  );
}
