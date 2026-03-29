import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { MetricsCards } from '@/components/dashboard/MetricsCards';
import { requireOrgContextOrRedirect } from '@/lib/supabase/org';
import { getOrgFeatureAccess } from '@/lib/churchos/access';

export default async function DashboardPage() {
  const orgContext = await requireOrgContextOrRedirect();
  const featureAccess = await getOrgFeatureAccess(orgContext.orgId);

  const coreMetrics = [
    { label: 'total members', value: 124 },
    { label: 'upcoming events', value: 7 },
  ];

  const growthMetrics = [
    { label: 'engagement score', value: '82%' },
    { label: 'volunteer gaps', value: 5 },
  ];

  const careMetrics = [
    { label: 'missed check-ins', value: 6 },
    { label: 'care alerts', value: 3 },
  ];

  const planAwareMetrics =
    featureAccess.plan === 'core'
      ? coreMetrics
      : featureAccess.plan === 'growth'
        ? [...coreMetrics, ...growthMetrics]
        : [...coreMetrics, ...growthMetrics, ...careMetrics];

  return (
    <DashboardShell title={`${orgContext.orgName} Dashboard`}>
      <MetricsCards metrics={planAwareMetrics} />
    </DashboardShell>
  );
}
