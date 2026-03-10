import Link from 'next/link';
import { ReactNode } from 'react';
import { site } from '@/lib/site';

type ShellProps = {
  children: ReactNode;
};

const navLinks = [
  { href: '/platform', label: 'Platform' },
  { href: '/families', label: 'Families' },
  { href: '/caregivers', label: 'Caregivers' },
  { href: '/senior-living', label: 'Senior Living' },
  { href: '/healthcare', label: 'Healthcare' },
  { href: '/recovery', label: 'Recovery' },
  { href: '/community', label: 'Community' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/beta', label: 'Beta' }
];

export function Shell({ children }: ShellProps) {
  return (
    <div className="site-shell">
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="LifeSignal home">
            <span className="brand-mark" aria-hidden="true">∿</span>
            <span>{site.name}</span>
          </Link>
          <nav className="nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="brand">
              <span className="brand-mark" aria-hidden="true">∿</span>
              <span>{site.name}</span>
            </div>
            <p className="small" style={{ marginTop: 12 }}>
              Remote human safety monitoring for families, caregivers, communities, and healthcare partners.
            </p>
          </div>
          <div className="footer-nav">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/beta">Join beta</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
