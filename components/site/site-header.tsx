import Link from "next/link";

const navItems = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/beta", label: "Beta" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          LifeSignal
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/beta"
          className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-6 py-3 text-lg font-semibold text-white transition hover:bg-sky-400"
        >
          Join beta
        </Link>
      </div>
    </header>
  );
}


