import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { requireMembership } from "@/lib/auth/org-access";
import { createClient } from "@/lib/supabase/server";

export default async function TeamPage() {
  const membership = await requireMembership(["owner", "admin", "manager"]);
  const supabase = await createClient();

  const [{ data: members }, { data: invites }] = await Promise.all([
    supabase
      .from("organization_members")
      .select("user_id, role, status, joined_at")
      .eq("org_id", membership.org_id)
      .order("created_at", { ascending: false }),
    supabase
      .from("invites")
      .select("email, role, status, expires_at")
      .eq("org_id", membership.org_id)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  return (
    <DashboardShell title="Team">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="mb-3 text-lg font-semibold">Organization members</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {(members ?? []).map((member) => (
              <li key={`${member.user_id}-${member.role}`} className="rounded border border-gray-100 p-2">
                <span className="font-medium">{member.user_id}</span> — {member.role} ({member.status})
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="mb-3 text-lg font-semibold">Invites</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {(invites ?? []).map((invite) => (
              <li key={`${invite.email}-${invite.expires_at}`} className="rounded border border-gray-100 p-2">
                <span className="font-medium">{invite.email}</span> — {invite.role} ({invite.status})
              </li>
            ))}
          </ul>
        </section>
      </div>
    </DashboardShell>
  );
}
