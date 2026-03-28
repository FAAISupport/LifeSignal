import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { MemberList } from '@/components/dashboard/MemberList';
import { listMembers } from '@/services/lifesignal/members.service';
import { requireOrgContext } from '@/lib/supabase/org';

export default async function MembersPage() {
  const context = await requireOrgContext().catch(() => null);
  const members = context ? await listMembers(context.orgId).catch(() => []) : [];
  return <DashboardShell title='Members'><MemberList members={members} /></DashboardShell>;
}
