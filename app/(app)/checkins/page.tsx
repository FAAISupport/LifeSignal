import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { CheckinLogTable } from '@/components/dashboard/CheckinLogTable';
import { listCheckins } from '@/services/lifesignal/checkins.service';
import { requireOrgContext } from '@/lib/supabase/org';

export default async function CheckinsPage() {
  const context = await requireOrgContext().catch(() => null);
  const rows = context ? await listCheckins(context.orgId).catch(() => []) : [];
  return <DashboardShell title='Check-ins'><CheckinLogTable rows={rows} /></DashboardShell>;
}
