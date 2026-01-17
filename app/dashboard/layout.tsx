import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabaseServer } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Use the same global header/footer so styling is consistent */}
      <SiteHeader />

      {/* Dashboard container */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
      </main>

      <SiteFooter />
    </div>
  );
}
