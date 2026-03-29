type CheckinRow = {
  id: string;
  member_id: string;
  status: string;
  due_at: string;
  response_text?: string | null;
};

export function CheckinLogTable({ checkins }: { checkins: CheckinRow[] }) {
  if (checkins.length === 0) {
    return <p className="rounded-md border border-gray-200 bg-white p-4 text-sm text-gray-600">No check-ins available.</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="px-4 py-3 font-medium">Check-in</th>
            <th className="px-4 py-3 font-medium">Member</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Due</th>
            <th className="px-4 py-3 font-medium">Response</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {checkins.map((checkin) => (
            <tr key={checkin.id}>
              <td className="px-4 py-3 font-mono text-xs text-gray-700">{checkin.id}</td>
              <td className="px-4 py-3 text-gray-700">{checkin.member_id}</td>
              <td className="px-4 py-3 text-gray-700">{checkin.status}</td>
              <td className="px-4 py-3 text-gray-700">{new Date(checkin.due_at).toLocaleString()}</td>
              <td className="px-4 py-3 text-gray-700">{checkin.response_text ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
