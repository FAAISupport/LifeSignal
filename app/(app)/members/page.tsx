import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { MemberList } from '@/components/dashboard/MemberList';
import { listMembers } from '@/services/lifesignal/members.service';
import { requireOrgContextOrRedirect } from '@/lib/supabase/org';

export default async function MembersPage() {
  const context = await requireOrgContextOrRedirect();
  const members = await listMembers(context.orgId).catch(() => []);

  return (
    <DashboardShell title='Members'>
      <MemberList members={members} />
    </DashboardShell>
  );
}
