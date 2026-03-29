import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { IncidentTable } from '@/components/dashboard/IncidentTable';
import { LockedModuleState } from '@/components/dashboard/LockedModuleState';
import { listIncidents } from '@/services/lifesignal/incidents.service';
import { requireOrgContextOrRedirect } from '@/lib/supabase/org';
import { getOrgFeatureAccess, orgHasModuleAccess } from '@/lib/churchos/access';

export default async function IncidentsPage() {
  const context = await requireOrgContextOrRedirect();
  const featureAccess = await getOrgFeatureAccess(context.orgId);
  const canAccessCare = orgHasModuleAccess(featureAccess, 'care');

  if (!canAccessCare) {
    return (
      <DashboardShell title='Incidents'>
        <LockedModuleState moduleName='Care incidents' />
      </DashboardShell>
    );
  }

  const incidents = await listIncidents(context.orgId).catch(() => []);

  return (
    <DashboardShell title='Incidents'>
      <IncidentTable incidents={incidents} />
    </DashboardShell>
  );
}
