import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { MetricsCards } from '@/components/dashboard/MetricsCards';

export default function DashboardPage() {
  return (
    <DashboardShell title='Dashboard'>
      <MetricsCards metrics={[
        { label: 'members monitored', value: 124 },
        { label: "today's check-ins", value: 97 },
        { label: 'missed check-ins', value: 6 },
        { label: 'active incidents', value: 3 },
        { label: 'response rate', value: '93%' },
        { label: 'recent activity', value: 41 },
      ]} />
    </DashboardShell>
  );
}
