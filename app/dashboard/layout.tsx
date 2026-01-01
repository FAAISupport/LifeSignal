export const dynamic = "force-dynamic";
export const revalidate = 0;

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const sb = await supabaseServer();
  const {
    data: { user },
    error,
  } = await sb.auth.getUser();

  // Single source of truth: if you're in /dashboard, you're authed.
  if (error || !user) {
    redirect("/login?next=" + encodeURIComponent("/dashboard"));
  }

  return <>{children}</>;
}
