import Link from "next/link";

export default function WarmPreviewHome() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <header className="flex items-center justify-between">
        <div className="text-sm font-semibold text-neutral-900">
          LifeSignal <span className="text-neutral-400">• Warm Family-First</span>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <Link className="text-neutral-700 hover:underline" href="/preview/warm/login">
            Log in
          </Link>
          <Link
            className="rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95"
            href="/preview/warm/login"
          >
            Try a check-in
          </Link>
        </nav>
      </header>

      <section className="mt-14 grid items-center gap-10 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center rounded-full bg-rose-50 px-4 py-1.5 text-xs font-semibold text-rose-700">
            Gentle daily check-ins • Built for families
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            A daily check-in that feels like care,
            <br />
            not surveillance.
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-neutral-700">
            Your loved one gets a simple message or call. If they don’t reply, LifeSignal notifies
            your family contacts—calmly and clearly.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/preview/warm/login"
              className="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-95"
            >
              Try a check-in
            </Link>
            <Link
              href="/preview/warm/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Dashboard preview
            </Link>
          </div>

          <p className="mt-4 text-xs text-neutral-500">
            Not an emergency service. If someone is in danger, call local emergency services.
          </p>
        </div>

        <div className="rounded-[32px] border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-neutral-900">Try a sample check-in</div>
          <p className="mt-1 text-sm text-neutral-600">Preview only—shows the “feel” of the interaction.</p>

          <div className="mt-5 rounded-[28px] bg-rose-50 p-5">
            <div className="text-xs font-semibold text-rose-700">Message</div>
            <div className="mt-2 text-base font-semibold text-neutral-900">
              Hi Mary 💛 Just checking in. Reply <span className="font-bold">YES</span> if you’re okay.
            </div>

            <div className="mt-4 flex gap-2">
              <div className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-900 shadow-sm">
                YES
              </div>
              <div className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-700 shadow-sm">
                Not now
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ["Next check-in", "Tomorrow 9:00 AM"],
              ["Contacts", "Family + caregiver"],
              ["Tone", "Warm & simple"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-[24px] border border-neutral-200 bg-white p-4">
                <div className="text-xs text-neutral-500">{k}</div>
                <div className="mt-1 text-sm font-semibold text-neutral-900">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-16 border-t border-neutral-200 pt-8 text-sm text-neutral-600">
        Preview only • Warm, family-friendly layout
      </footer>
    </main>
  );
}
