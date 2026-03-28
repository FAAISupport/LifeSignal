import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { CheckinLogTable } from '@/components/dashboard/CheckinLogTable';
import { listCheckins } from '@/services/lifesignal/checkins.service';

export default async function CheckinsPage() {
  const rows = await listCheckins('00000000-0000-0000-0000-000000000000').catch(() => []);
  return <DashboardShell title='Check-ins'><CheckinLogTable rows={rows} /></DashboardShell>;
}
