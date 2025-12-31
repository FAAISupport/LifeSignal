import Link from "next/link";
import { Logo } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-neutral-200/70 bg-white">
      <div className="container-page grid gap-8 py-10 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-neutral-600">
            Daily check-ins by text or call — with escalation to family if a response is missed.
          </p>
          <p className="mt-3 text-xs text-neutral-500">
            LifeSignal is not an emergency service.
          </p>
        </div>

        <div className="text-sm">
          <div className="font-semibold text-brand-navy">Product</div>
          <div className="mt-3 space-y-2 text-neutral-600">
            <Link href="/how-it-works" className="block hover:text-brand-navy">How it works</Link>
            <Link href="/pricing" className="block hover:text-brand-navy">Pricing</Link>
            <Link href="/signup" className="block hover:text-brand-navy">Create account</Link>
          </div>
        </div>

        <div className="text-sm">
          <div className="font-semibold text-brand-navy">Trust</div>
          <div className="mt-3 space-y-2 text-neutral-600">
            <Link href="/privacy" className="block hover:text-brand-navy">Privacy</Link>
            <Link href="/terms" className="block hover:text-brand-navy">Terms</Link>
            <a href="mailto:support@lifesignal.app" className="block hover:text-brand-navy">
              support@lifesignal.app
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200/70 py-6">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
          <span>© {new Date().getFullYear()} LifeSignal. All rights reserved.</span>
          <span>Built for calm, consistent care.</span>
        </div>
      </div>
    </footer>
  );
}
