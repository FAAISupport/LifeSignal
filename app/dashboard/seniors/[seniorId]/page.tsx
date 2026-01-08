import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { activateMonitoringForm, updateSeniorSettings } from "../../actions";
import TestCheckinClient from "./TestCheckinClient";

type PageProps = {
  params: { seniorId: string };
};

export default async function SeniorDetailPage({ params }: PageProps) {
  const sb = await supabaseServer();

  const {
    data: { user },
  } = await sb.auth.getUser();

  if (!user) redirect("/login");

  const { data: senior, error } = await sb
    .from("seniors")
    .select("*")
    .eq("id", params.seniorId)
    .single();

  if (error || !senior) {
    notFound();
  }

  // Pull recent check-ins for auditability (paper trail visible to caregiver)
  const { data: checkins } = await sb
    .from("checkins")
    .select("id,scheduled_for,status,responded_at,response_type,channel")
    .eq("senior_id", senior.id)
    .order("scheduled_for", { ascending: false })
    .limit(20);

  const checkinIds = (checkins ?? []).map((c: any) => c.id).filter(Boolean);
  const { data: attempts } = checkinIds.length
    ? await sb
        .from("checkin_attempts")
        .select("id,checkin_id,attempt_type,status,twilio_sid,created_at,error")
        .in("checkin_id", checkinIds)
        .order("created_at", { ascending: false })
    : { data: [] as any[] };

  const attemptsByCheckin = new Map<string, any[]>();
  for (const a of attempts ?? []) {
    const key = String((a as any).checkin_id);
    const arr = attemptsByCheckin.get(key) ?? [];
    arr.push(a);
    attemptsByCheckin.set(key, arr);
  }

  async function onUpdate(formData: FormData) {
    "use server";

    // TS can be picky inside server-action closures; senior is guaranteed by notFound() above.
    formData.set("seniorId", String(senior.id));

    const res = await updateSeniorSettings(formData);

    if ((res as any)?.ok === false) {
      return;
    }

    redirect(`/dashboard/seniors/${params.seniorId}`);
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{senior.name || "Senior"}</h1>
          <p className="mt-1 text-sm text-gray-600">ID: {senior.id}</p>
        </div>

        <div className="flex gap-2">
          <Link href="/dashboard">
            <Button variant="outline">Back</Button>
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold">Settings</h2>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-medium">Monitoring</div>
            <div className="text-sm text-gray-600">
              Daily check-ins are controlled by <code>seniors.enabled</code>.
            </div>
          </div>

          {(senior as any).enabled ? (
            <span className="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
              Enabled
            </span>
          ) : (
            <form action={activateMonitoringForm}>
              <input type="hidden" name="seniorId" value={String(senior.id)} />
              <Button type="submit">Enable monitoring</Button>
            </form>
          )}
        </div>

        <form action={onUpdate} className="mt-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-medium">Preferred channel</div>
              <div className="text-sm text-gray-600">
                How we should contact the senior.
              </div>
            </div>

            <select
              name="channel_pref"
              defaultValue={(senior as any).channel_pref || "sms"}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="sms">SMS</option>
              <option value="voice">Phone call</option>
              <option value="both">SMS + Phone call</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-medium">Escalation wait</div>
              <div className="text-sm text-gray-600">
                Minutes to wait before escalating a missed check-in.
              </div>
            </div>
            <input
              name="wait_minutes"
              type="number"
              min={0}
              max={1440}
              defaultValue={(senior as any).wait_minutes ?? 30}
              className="w-28 rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary">
              Save changes
            </Button>
          </div>
        </form>
      </div>

      {/* Audit trail: recent check-ins & attempts */}
      <div className="mt-6 rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold">Recent check-ins</h2>
        <p className="mt-1 text-sm text-gray-600">
          Shows the latest check-in records and delivery attempts. This is server-sourced (no client-side guessing).
        </p>

        {(checkins ?? []).length === 0 ? (
          <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-700">
            No check-ins recorded yet.
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-3 py-2">Scheduled</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Responded</th>
                  <th className="px-3 py-2">Attempts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {(checkins ?? []).map((c: any) => {
                  const atts = attemptsByCheckin.get(String(c.id)) ?? [];
                  return (
                    <tr key={c.id} className="align-top">
                      <td className="px-3 py-2 text-gray-800">
                        {c.scheduled_for ? new Date(c.scheduled_for).toLocaleString() : "—"}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            "inline-flex rounded-full px-2 py-1 text-xs font-medium " +
                            (c.status === "responded_ok"
                              ? "bg-emerald-50 text-emerald-700"
                              : c.status === "missed"
                              ? "bg-amber-50 text-amber-800"
                              : "bg-slate-100 text-slate-700")
                          }
                        >
                          {c.status || "—"}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-gray-700">
                        {c.responded_at ? new Date(c.responded_at).toLocaleString() : "—"}
                      </td>
                      <td className="px-3 py-2 text-gray-700">
                        {atts.length === 0 ? (
                          "—"
                        ) : (
                          <ul className="space-y-1">
                            {atts.slice(0, 4).map((a: any) => (
                              <li key={a.id} className="text-xs">
                                <span className="font-medium">{a.attempt_type}</span>: {a.status}
                                {a.error ? <span className="text-red-600"> — {a.error}</span> : null}
                              </li>
                            ))}
                            {atts.length > 4 ? (
                              <li className="text-xs text-gray-500">+ {atts.length - 4} more</li>
                            ) : null}
                          </ul>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <TestCheckinClient seniorId={String(senior.id)} />
    </div>
  );
}
