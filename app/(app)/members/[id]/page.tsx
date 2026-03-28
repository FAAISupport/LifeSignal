import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { MemberStatusCard } from '@/components/lifesignal/MemberStatusCard';
import { CheckinComposer } from '@/components/lifesignal/CheckinComposer';
import { supabaseAdmin } from '@/lib/supabase/admin';

export default async function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: member } = await supabaseAdmin.from('monitored_members').select('*').eq('id', id).single();
  if (!member) return <DashboardShell title='Member detail'>Member not found.</DashboardShell>;
  return (
    <DashboardShell title='Member detail'>
      <div className='grid gap-4 lg:grid-cols-2'>
        <MemberStatusCard member={member} />
        <CheckinComposer memberId={id} />
      </div>
    </DashboardShell>
  );
}
