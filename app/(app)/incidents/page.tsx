import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { IncidentTable } from '@/components/dashboard/IncidentTable';
import { listIncidents } from '@/services/lifesignal/incidents.service';
import { requireOrgContext } from '@/lib/supabase/org';

export default async function IncidentsPage() {
  const context = await requireOrgContext().catch(() => null);
  const incidents = context ? await listIncidents(context.orgId).catch(() => []) : [];
  return <DashboardShell title='Incidents'><IncidentTable incidents={incidents} /></DashboardShell>;
}
