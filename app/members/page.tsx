import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MemberList } from "@/components/dashboard/MemberList";
import { requireMembership } from "@/lib/auth/org-access";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function MembersPage() {
  const membership = await requireMembership();
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("monitored_members")
    .select("id, full_name, phone_e164, status")
    .eq("org_id", membership.org_id)
    .order("created_at", { ascending: false });

  return (
    <DashboardShell title="Members">
      <MemberList members={(data ?? []) as Array<{ id: string; full_name: string; phone_e164: string; status: string }>} />
    </DashboardShell>
  );
}




