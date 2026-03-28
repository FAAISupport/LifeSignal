import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { IncidentTable } from '@/components/dashboard/IncidentTable';
import { listIncidents } from '@/services/lifesignal/incidents.service';

export default async function IncidentsPage() {
  const incidents = await listIncidents('00000000-0000-0000-0000-000000000000').catch(() => []);
  return <DashboardShell title='Incidents'><IncidentTable incidents={incidents} /></DashboardShell>;
}
