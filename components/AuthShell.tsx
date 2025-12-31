import React from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-2">
      <div className="order-2 md:order-1">
        <div className="pill">Secure account • Consent-first messaging</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-navy md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-neutral-700 md:text-lg">{subtitle}</p>

        <div className="mt-8 rounded-3xl border border-brand-blue/15 bg-white/70 p-6">
          <div className="text-sm font-semibold text-brand-navy">What LifeSignal does</div>
          <ul className="mt-3 space-y-2 text-sm text-neutral-700">
            <li>• Sends a calm daily check-in (SMS or call)</li>
            <li>• Logs the response for clarity and trust</li>
            <li>• Escalates to your chosen contacts if missed</li>
          </ul>
          <p className="mt-3 text-xs text-neutral-500">
            LifeSignal is not an emergency service. For emergencies, call local emergency services.
          </p>
        </div>

        {footer ? <div className="mt-6">{footer}</div> : null}
      </div>

      <div className="order-1 md:order-2">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40">
            <Logo />
          </Link>
          <Link href="/pricing" className="text-sm text-neutral-600 hover:text-brand-navy hover:underline">
            View pricing
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}
