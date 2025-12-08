import { supabaseAdmin } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { data: seniors } = await supabaseAdmin
    .from("seniors")
    .select("id, full_name, phone")
    .order("created_at", { ascending: false });

  const seniorIds = seniors?.map((s) => s.id) ?? [];

  let latestById: Record<string, any> = {};

  if (seniorIds.length) {
    const { data: checkins } = await supabaseAdmin
      .from("checkins")
      .select("id, senior_id, status, scheduled_for, responded_at")
      .in("senior_id", seniorIds)
      .order("scheduled_for", { ascending: false });

    for (const c of checkins ?? []) {
      if (!latestById[c.senior_id]) {
        latestById[c.senior_id] = c;
      }
    }
  }

  return (
    <div className="flex-1 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold mb-2">LifeSignal Admin</h1>
        <p className="text-sm text-slate-600">
          Internal view of seniors and their latest check-in status.
        </p>

        <table className="w-full text-sm border-collapse mt-4">
          <thead>
            <tr className="bg-slate-100">
              <th className="border px-2 py-1 text-left">Senior</th>
              <th className="border px-2 py-1 text-left">Phone</th>
              <th className="border px-2 py-1 text-left">Last check-in</th>
              <th className="border px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {seniors?.map((s) => {
              const latest = latestById[s.id];
              const time = latest
                ? new Date(latest.scheduled_for).toLocaleString()
                : "—";
              const status = latest?.status ?? "no check-ins yet";
              return (
                <tr key={s.id}>
                  <td className="border px-2 py-1">{s.full_name}</td>
                  <td className="border px-2 py-1">{s.phone}</td>
                  <td className="border px-2 py-1">{time}</td>
                  <td className="border px-2 py-1 capitalize">{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
