import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CheckinLogTable } from "@/components/dashboard/CheckinLogTable";
import { requireMembership } from "@/lib/auth/org-access";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function CheckinsPage() {
  const membership = await requireMembership();
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("checkins")
    .select("id, member_id, status, due_at, response_text")
    .eq("org_id", membership.org_id)
    .order("due_at", { ascending: false })
    .limit(100);

  return (
    <DashboardShell title="Check-ins">
      <CheckinLogTable checkins={(data ?? []) as Array<{ id: string; member_id: string; status: string; due_at: string; response_text?: string | null }>} />
    </DashboardShell>
  );
}




