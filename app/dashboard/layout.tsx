import Link from "next/link";
import { redirect } from "next/navigation";

import { supabaseServer } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/dashboard");

  async function signOut() {
    "use server";
    const supabase = await supabaseServer();
    await supabase.auth.signOut();
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b p-4 flex justify-between">
        <Link href="/dashboard">Dashboard</Link>
        <form action={signOut}>
          <button>Log out</button>
        </form>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
