// components/SiteFooter.tsx
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} LifeSignal. All rights reserved.
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">
              How it works
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900">
              Terms
            </Link>
            <Link href="/refunds" className="text-gray-600 hover:text-gray-900">
              Refunds
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          LifeSignal is a non-medical daily wellness check-in service. Not an emergency response
          system. For emergencies, call local emergency services.
        </div>
      </div>
    </footer>
  );
}
