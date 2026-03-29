import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { RiskTable } from '@/components/dashboard/RiskTable';
import { LockedModuleState } from '@/components/dashboard/LockedModuleState';
import { requireOrgContextOrRedirect } from '@/lib/supabase/org';
import { getOrgFeatureAccess, orgHasModuleAccess } from '@/lib/churchos/access';

export default async function AnalyticsPage() {
  const context = await requireOrgContextOrRedirect();
  const featureAccess = await getOrgFeatureAccess(context.orgId);
  const canAccessAnalytics = orgHasModuleAccess(featureAccess, 'analytics');

  return (
    <DashboardShell title='Analytics'>
      {canAccessAnalytics ? (
        <RiskTable
          snapshots={[
            { risk_band: 'stable', count: 78 },
            { risk_band: 'caution', count: 31 },
            { risk_band: 'elevated', count: 11 },
            { risk_band: 'high', count: 4 },
          ]}
        />
      ) : (
        <LockedModuleState moduleName='Analytics' />
      )}
    </DashboardShell>
  );
}
