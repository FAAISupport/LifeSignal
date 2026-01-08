// components/SiteHeader.tsx
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";

export default async function SiteHeader() {
  let userEmail: string | null = null;

  try {
    const supabase = await supabaseServer();
    const { data } = await supabase.auth.getUser();
    userEmail = data?.user?.email ?? null;
  } catch {
    userEmail = null;
  }

  const signedIn = !!userEmail;

  return (
    <div className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full border border-slate-200 bg-white" />
          <div>
            <div className="text-sm font-semibold text-slate-900">LifeSignal</div>
            <div className="text-xs text-slate-500">Just checking in</div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {!signedIn ? (
            <>
              <Link
                href="/login"
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Log in
              </Link>
              <Link
                href="/start"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Start
              </Link>
              <Link
                href="/pricing"
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Pricing
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Dashboard
              </Link>

              {/* ✅ DIRECT route (no /login?next=...) */}
              <Link
                href="/dashboard/seniors/new"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                + Add a loved one
              </Link>

              <Link
                href="/pricing"
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Pricing
              </Link>

              <Link
                href="/logout"
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Log out
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
