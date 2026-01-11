import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  return (
    <div>
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      <div className="mt-6 rounded-xl border bg-slate-50 p-5 flex justify-between items-center">
        <div>
          <h2 className="font-semibold">No loved ones added yet</h2>
          <p className="text-sm text-slate-600">Add someone to begin monitoring.</p>
        </div>
        <Link href="/dashboard/seniors/new" className="bg-black text-white px-4 py-2 rounded-lg">
          + Add Loved One
        </Link>
      </div>
    </div>
  );
}
