// components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold text-lg">
            LS
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-sm sm:text-base">
              LifeSignal
            </div>
            <div className="text-xs text-slate-500 hidden sm:block">
              Daily check-ins for independent seniors
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/how-it-works" className="hover:text-sky-700">
            How it works
          </Link>

          <Link href="/pricing" className="hover:text-sky-700">
            Pricing
          </Link>
          <a href="#faq" className="hover:text-sky-700">
            FAQ
          </a>
        </nav>
        <Link
          href="/pricing#start"
          className="hidden sm:inline-flex text-sm items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl"
        >
          Start free trial
        </Link>
      </div>
    </header>
  );
}
