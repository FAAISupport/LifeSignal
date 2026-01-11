import Link from "next/link";

export default function CalmPreviewHome() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <header className="flex items-center justify-between gap-4">
        <div className="text-sm font-semibold text-neutral-900">
          LifeSignal <span className="text-neutral-400">• Calm Clinical</span>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <Link className="text-neutral-700 hover:underline" href="/preview/calm">
            Home
          </Link>
          <Link className="text-neutral-700 hover:underline" href="/preview/calm/login">
            Log in
          </Link>
          <Link
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
            href="/preview/calm/login"
          >
            Start
          </Link>
        </nav>
      </header>

      <section className="mt-14 grid items-center gap-10 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700">
            Daily check-ins via SMS or voice • Non-medical
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Clear daily check-ins.
            <br />
            Calm escalation when needed.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-neutral-700 md:text-lg">
            LifeSignal schedules a simple daily check-in at your chosen time. If your loved one
            doesn’t respond, we notify the contacts you set—step by step—with a clear audit trail.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/preview/calm/login"
              className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
            >
              Start daily check-ins
            </Link>
            <Link
              href="/preview/calm/dashboard"
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              View dashboard shell
            </Link>
          </div>

          <p className="mt-4 text-xs text-neutral-500">
            LifeSignal is not an emergency service. For emergencies, call local emergency services.
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-neutral-900">Today’s Check-In</div>
            <div className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700">
              Scheduled 9:00 AM
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="text-xs text-neutral-500">Message</div>
            <div className="mt-2 text-base font-semibold text-neutral-900">
              Hi Mary — just checking in. Reply <span className="font-bold">YES</span> if you’re okay.
            </div>

            <div className="mt-4 flex gap-2">
              <div className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm">
                YES
              </div>
              <div className="rounded-2xl bg-white px-4 py-2 text-sm text-neutral-700 shadow-sm">
                Later
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ["Status", "Pending"],
              ["Contacts", "3 notified"],
              ["Log", "Audit ready"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-3xl border border-neutral-200 bg-white p-4">
                <div className="text-xs text-neutral-500">{k}</div>
                <div className="mt-1 font-semibold text-neutral-900">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-neutral-900">How it works</h2>
        <p className="mt-2 text-sm text-neutral-700">
          Three steps—simple for seniors and clear for families.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            ["1) Check-In", "A quick text or call at the time you choose."],
            ["2) Confirm", "A simple YES / Press 1 confirms they’re okay."],
            ["3) Alert", "No response triggers notifications to your chosen contacts."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-neutral-900">{t}</div>
              <p className="mt-2 text-sm text-neutral-700">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-16 border-t border-neutral-200 pt-8 text-sm text-neutral-600">
        Preview only • Policies would appear in footer on production pages
      </footer>
    </main>
  );
}
