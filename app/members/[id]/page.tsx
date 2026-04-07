import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CheckinLogTable } from "@/components/dashboard/CheckinLogTable";
import { IncidentTable } from "@/components/dashboard/IncidentTable";
import { requireMembership } from "@/lib/auth/org-access";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const membership = await requireMembership();
  const supabase = await createSupabaseServerClient();
  const route = await params;

  const { data: member } = await supabase
    .from("monitored_members")
    .select("id, full_name, phone_e164, status")
    .eq("org_id", membership.org_id)
    .eq("id", route.id)
    .maybeSingle<{ id: string; full_name: string; phone_e164: string; status: string }>();

  if (!member) {
    notFound();
  }

  const [{ data: checkins }, { data: incidents }] = await Promise.all([
    supabase
      .from("checkins")
      .select("id, member_id, status, due_at, response_text")
      .eq("org_id", membership.org_id)
      .eq("member_id", route.id)
      .order("due_at", { ascending: false })
      .limit(25),
    supabase
      .from("incidents")
      .select("id, member_id, status, severity, opened_at")
      .eq("org_id", membership.org_id)
      .eq("member_id", route.id)
      .order("opened_at", { ascending: false })
      .limit(25),
  ]);

  return (
    <DashboardShell title={`Member: ${member.full_name}`}>
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
        <p>ID: {member.id}</p>
        <p>Phone: {member.phone_e164}</p>
        <p>Status: {member.status}</p>
      </div>

      <h2 className="mb-2 text-lg font-semibold">Recent check-ins</h2>
      <CheckinLogTable checkins={(checkins ?? []) as Array<{ id: string; member_id: string; status: string; due_at: string; response_text?: string | null }>} />

      <h2 className="mb-2 mt-6 text-lg font-semibold">Recent incidents</h2>
      <IncidentTable incidents={(incidents ?? []) as Array<{ id: string; member_id: string; status: string; severity: string; opened_at?: string }>} />
    </DashboardShell>
  );
}

