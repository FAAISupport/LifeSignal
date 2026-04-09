import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, serviceRole);
}

function formatDate(value: string | null | undefined) {
  if (!value) return "—";

  try {
    return new Date(value).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return value;
  }
}

function prettyJson(value: unknown) {
  try {
    return JSON.stringify(value ?? {}, null, 2);
  } catch {
    return "{}";
  }
}

export default async function CareDebugPage() {
  const supabase = getSupabaseAdmin();

  const [checkinsResult, incidentsResult, eventsResult] = await Promise.all([
    supabase
      .from("care_checkins")
      .select("id, recipient_id, scheduled_for, window_start, window_end, status, attempts_made, max_attempts, confirmed_at, help_requested_at, escalation_started_at, last_attempt_at, metadata")
      .order("scheduled_for", { ascending: false })
      .limit(20),
    supabase
      .from("care_incidents")
      .select("id, check_in_id, recipient_id, status, started_at, acknowledged_at, acknowledged_by_contact_id, steps, metadata")
      .order("started_at", { ascending: false })
      .limit(20),
    supabase
      .from("care_events")
      .select("id, type, check_in_id, recipient_id, incident_id, step_number, channel, occurred_at, metadata")
      .order("occurred_at", { ascending: false })
      .limit(40),
  ]);

  if (checkinsResult.error) {
    throw new Error(checkinsResult.error.message);
  }

  if (incidentsResult.error) {
    throw new Error(incidentsResult.error.message);
  }

  if (eventsResult.error) {
    throw new Error(eventsResult.error.message);
  }

  const checkins = checkinsResult.data || [];
  const incidents = incidentsResult.data || [];
  const events = eventsResult.data || [];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
            LifeSignal Admin
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Care Debug Console
          </h1>
          <p className="max-w-3xl text-sm text-slate-300">
            Read-only operational view for recent care check-ins, incidents, and event logs.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Recent Check-Ins</h2>
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
              {checkins.length} rows
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-slate-400">
                  <th className="px-3 py-2">Check-In ID</th>
                  <th className="px-3 py-2">Recipient</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Scheduled</th>
                  <th className="px-3 py-2">Attempts</th>
                  <th className="px-3 py-2">Last Attempt</th>
                  <th className="px-3 py-2">Confirmed</th>
                  <th className="px-3 py-2">Help Requested</th>
                  <th className="px-3 py-2">Escalation Started</th>
                </tr>
              </thead>
              <tbody>
                {checkins.map((row) => (
                  <tr key={row.id} className="rounded-2xl bg-white/5 text-slate-100">
                    <td className="px-3 py-3 align-top font-mono text-xs">{row.id}</td>
                    <td className="px-3 py-3 align-top font-mono text-xs">{row.recipient_id}</td>
                    <td className="px-3 py-3 align-top">
                      <span className="rounded-full bg-white/10 px-2 py-1 text-xs">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 align-top">{formatDate(row.scheduled_for)}</td>
                    <td className="px-3 py-3 align-top">
                      {row.attempts_made} / {row.max_attempts}
                    </td>
                    <td className="px-3 py-3 align-top">{formatDate(row.last_attempt_at)}</td>
                    <td className="px-3 py-3 align-top">{formatDate(row.confirmed_at)}</td>
                    <td className="px-3 py-3 align-top">{formatDate(row.help_requested_at)}</td>
                    <td className="px-3 py-3 align-top">{formatDate(row.escalation_started_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Recent Incidents</h2>
            <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
              {incidents.length} rows
            </span>
          </div>

          <div className="grid gap-4">
            {incidents.map((row) => (
              <article key={row.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-mono text-sm text-white">{row.id}</h3>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-200">
                    {row.status}
                  </span>
                </div>

                <div className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                  <p><span className="text-slate-500">Check-In:</span> {row.check_in_id}</p>
                  <p><span className="text-slate-500">Recipient:</span> {row.recipient_id}</p>
                  <p><span className="text-slate-500">Started:</span> {formatDate(row.started_at)}</p>
                  <p><span className="text-slate-500">Acknowledged:</span> {formatDate(row.acknowledged_at)}</p>
                  <p><span className="text-slate-500">Acknowledged By:</span> {row.acknowledged_by_contact_id || "—"}</p>
                </div>

                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-cyan-300">View steps + metadata</summary>
                  <div className="mt-3 grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Steps</p>
                      <pre className="overflow-x-auto rounded-xl bg-black/30 p-3 text-xs text-slate-200">
                        {prettyJson(row.steps)}
                      </pre>
                    </div>
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Metadata</p>
                      <pre className="overflow-x-auto rounded-xl bg-black/30 p-3 text-xs text-slate-200">
                        {prettyJson(row.metadata)}
                      </pre>
                    </div>
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Recent Events</h2>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
              {events.length} rows
            </span>
          </div>

          <div className="grid gap-4">
            {events.map((row) => (
              <article key={row.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-mono text-sm text-white">{row.id}</h3>
                  <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-xs text-cyan-200">
                    {row.type}
                  </span>
                  {row.channel ? (
                    <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-200">
                      {row.channel}
                    </span>
                  ) : null}
                </div>

                <div className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                  <p><span className="text-slate-500">Check-In:</span> {row.check_in_id}</p>
                  <p><span className="text-slate-500">Recipient:</span> {row.recipient_id}</p>
                  <p><span className="text-slate-500">Incident:</span> {row.incident_id || "—"}</p>
                  <p><span className="text-slate-500">Step:</span> {row.step_number ?? "—"}</p>
                  <p><span className="text-slate-500">Occurred:</span> {formatDate(row.occurred_at)}</p>
                </div>

                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-cyan-300">View metadata</summary>
                  <pre className="mt-3 overflow-x-auto rounded-xl bg-black/30 p-3 text-xs text-slate-200">
                    {prettyJson(row.metadata)}
                  </pre>
                </details>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
