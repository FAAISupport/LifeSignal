import Link from "next/link";

type MemberItem = {
  id: string;
  full_name: string;
  phone_e164: string;
  status: string;
};

export function MemberList({ members }: { members: MemberItem[] }) {
  if (members.length === 0) {
    return <p className="rounded-md border border-gray-200 bg-white p-4 text-sm text-gray-600">No members found.</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Phone</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {members.map((member) => (
            <tr key={member.id}>
              <td className="px-4 py-3">
                <Link href={`/members/${member.id}`} className="text-blue-600 hover:text-blue-700">
                  {member.full_name}
                </Link>
              </td>
              <td className="px-4 py-3 text-gray-700">{member.phone_e164}</td>
              <td className="px-4 py-3 text-gray-700">{member.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
