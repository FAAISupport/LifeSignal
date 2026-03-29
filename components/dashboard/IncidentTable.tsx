type IncidentRow = {
  id: string;
  member_id: string;
  status: string;
  severity: string;
  opened_at?: string;
};

export function IncidentTable({ incidents }: { incidents: IncidentRow[] }) {
  if (incidents.length === 0) {
    return <p className="rounded-md border border-gray-200 bg-white p-4 text-sm text-gray-600">No incidents recorded.</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="px-4 py-3 font-medium">Incident</th>
            <th className="px-4 py-3 font-medium">Member</th>
            <th className="px-4 py-3 font-medium">Severity</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Opened</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td className="px-4 py-3 font-mono text-xs text-gray-700">{incident.id}</td>
              <td className="px-4 py-3 text-gray-700">{incident.member_id}</td>
              <td className="px-4 py-3 text-gray-700">{incident.severity}</td>
              <td className="px-4 py-3 text-gray-700">{incident.status}</td>
              <td className="px-4 py-3 text-gray-700">{incident.opened_at ? new Date(incident.opened_at).toLocaleString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
