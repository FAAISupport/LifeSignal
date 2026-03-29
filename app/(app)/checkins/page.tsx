import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { CheckinLogTable } from '@/components/dashboard/CheckinLogTable';
import { LockedModuleState } from '@/components/dashboard/LockedModuleState';
import { listCheckins } from '@/services/lifesignal/checkins.service';
import { requireOrgContextOrRedirect } from '@/lib/supabase/org';
import { getOrgFeatureAccess, orgHasModuleAccess } from '@/lib/churchos/access';

export default async function CheckinsPage() {
  const context = await requireOrgContextOrRedirect();
  const featureAccess = await getOrgFeatureAccess(context.orgId);
  const canAccessLifeSignal = orgHasModuleAccess(featureAccess, 'lifesignal');

  if (!canAccessLifeSignal) {
    return (
      <DashboardShell title='Check-ins'>
        <LockedModuleState moduleName='LifeSignal check-ins' />
      </DashboardShell>
    );
  }

  const rows = await listCheckins(context.orgId).catch(() => []);

  return (
    <DashboardShell title='Check-ins'>
      <CheckinLogTable rows={rows} />
    </DashboardShell>
  );
}
