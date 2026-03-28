import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { MemberList } from '@/components/dashboard/MemberList';
import { listMembers } from '@/services/lifesignal/members.service';

export default async function MembersPage() {
  const members = await listMembers('00000000-0000-0000-0000-000000000000').catch(() => []);
  return <DashboardShell title='Members'><MemberList members={members} /></DashboardShell>;
}
