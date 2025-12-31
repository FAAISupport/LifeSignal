import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 glass">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 rounded-2xl">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-neutral-700 md:flex">
          <Link href="/how-it-works" className="hover:text-brand-navy">
            How it works
          </Link>
          <Link href="/pricing" className="hover:text-brand-navy">
            Pricing
          </Link>
          <Link href="/privacy" className="hover:text-brand-navy">
            Privacy
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button>Start</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
