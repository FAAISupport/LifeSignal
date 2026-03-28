import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { RiskTable } from '@/components/dashboard/RiskTable';

export default function AnalyticsPage() {
  return (
    <DashboardShell title='Analytics'>
      <RiskTable snapshots={[{ risk_band: 'stable', count: 78 }, { risk_band: 'caution', count: 31 }, { risk_band: 'elevated', count: 11 }, { risk_band: 'high', count: 4 }]} />
    </DashboardShell>
  );
}
