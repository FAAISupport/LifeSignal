import Link from "next/link";

const navItems = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/families", label: "Families" },
  { href: "/caregivers", label: "Caregivers" },
  { href: "/recover", label: "Recover" },
  { href: "/postop", label: "PostOP" },
  { href: "/communities", label: "Communities" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020817]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="text-base font-semibold tracking-wide text-white transition hover:text-sky-300"
        >
          LifeSignal
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base text-slate-200 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <Link
            href="/beta"
            className="rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-400"
          >
            Join Beta
          </Link>
        </div>
      </div>

      <div className="border-t border-white/5 md:hidden">
        <nav className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-6 py-3 text-base md:px-8">
          {navItems.map((item) => (
            <Link
              key={`${item.href}-mobile`}
              href={item.href}
              className="whitespace-nowrap text-slate-200 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
