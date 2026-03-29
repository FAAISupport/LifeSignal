import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { TeamTable } from '@/components/team/TeamTable';
import { InviteUserForm } from '@/components/team/InviteUserForm';

export default function TeamPage() {
  return (
    <DashboardShell title='Team'>
      <InviteUserForm />
      <div className='mt-4'>
        <TeamTable members={[{ user_id: '1', email: 'owner@church.org', role: 'owner', created_at: new Date().toISOString() }]} />
      </div>
    </DashboardShell>
  );
}
