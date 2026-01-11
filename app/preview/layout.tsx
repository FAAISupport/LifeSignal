import type { ReactNode } from "react";
import Link from "next/link";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Preview Banner */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-700">
              UI Preview
            </span>
            <span className="text-xs text-neutral-600">
              These pages are isolated under <span className="font-mono">/preview</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Link
              href="/preview/calm"
              className="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100"
            >
              Calm
            </Link>
            <Link
              href="/preview/modern"
              className="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100"
            >
              Modern
            </Link>
            <Link
              href="/preview/warm"
              className="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100"
            >
              Warm
            </Link>

            <span className="mx-1 hidden h-5 w-px bg-neutral-200 sm:block" />

            <Link
              href="/"
              className="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100"
            >
              Back to Live Site
            </Link>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
