import Link from "next/link";

const productLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/families", label: "Families" },
  { href: "/caregivers", label: "Caregivers" },
  { href: "/communities", label: "Communities" }
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

const legalLinks = [
  { href: "/safety-privacy", label: "Safety & Privacy" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" }
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#020817]">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-white transition hover:text-sky-300"
            >
              LifeSignal
            </Link>
            <p className="mt-4 max-w-sm text-lg leading-9 text-slate-400">
              Daily safety check-ins with human-centered escalation for families,
              caregivers, and connected communities.
            </p>
            <div className="mt-6">
              <a
                href="mailto:support@lifesignal.app"
                className="text-lg text-sky-300 transition hover:text-sky-200"
              >
                support@lifesignal.app
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-slate-200">
              Product
            </h2>
            <ul className="mt-4 space-y-3">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-lg text-slate-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-slate-200">
              Company
            </h2>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-lg text-slate-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-slate-200">
              Legal
            </h2>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-lg text-slate-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-lg text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 LifeSignal by Field Agent AI. All rights reserved.</p>
          <p>Built for independence, reassurance, and real human support.</p>
        </div>
      </div>
    </footer>
  );
}

