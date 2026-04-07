import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.2fr_.8fr_.8fr] lg:px-10">
        <div>
          <div className="text-xl font-bold text-white">LifeSignal</div>
          <p className="mt-4 max-w-md text-lg leading-9 text-slate-400">
            Safety check-ins with transparent escalation and routine consistency
            tracking for families, caregivers, and communities.
          </p>
        </div>

        <div>
          <p className="text-lg font-semibold uppercase tracking-[0.20em] text-sky-300">
            Navigate
          </p>
          <div className="mt-4 space-y-3 text-lg text-slate-300">
            <div>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </div>
            <div>
              <Link href="/how-it-works" className="transition hover:text-white">
                How it works
              </Link>
            </div>
            <div>
              <Link href="/beta" className="transition hover:text-white">
                Beta waitlist
              </Link>
            </div>
            <div>
              <Link href="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold uppercase tracking-[0.20em] text-sky-300">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-lg text-slate-300">
            <div>lifesignal.app</div>
            <div>Field Agent AI</div>
            <div>Built for safer daily connection</div>
          </div>
        </div>
      </div>
    </footer>
  );
}




