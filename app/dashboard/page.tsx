import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";

export default async function DashboardPage() {
  const sb = await supabaseServer();

  const {
    data: { user },
    error: userErr,
  } = await sb.auth.getUser();

  // If not authenticated (or auth failed), send them to login
  if (userErr || !user) {
    redirect("/login");
  }

  const { data: sub } = await sb
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: seniors } = await sb
    .from("seniors")
    .select("*")
    .eq("owner_user_id", user.id)
    .order("created_at", { ascending: false });

  const planLabel =
    sub?.status === "active" || sub?.status === "trialing"
      ? `${String(sub.plan ?? "plan")} (${String(sub.status)})`
      : "No active plan";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-brand-navy">Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Signed in as <span className="font-medium">{user.email}</span>
          </p>
          <p className="mt-1 text-sm text-neutral-600">Plan: {planLabel}</p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/dashboard/seniors/new"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50 bg-brand-navy text-white hover:opacity-90"
          >
            Add senior
          </Link>

          <Link
            href="/something"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50 border border-brand-navy/20 bg-white hover:bg-brand-mist"
          >
            ...
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-brand-navy">Seniors</div>
              <div className="mt-1 text-sm text-neutral-600">
                Manage profiles, check-in times, and escalation settings.
              </div>
            </div>

            <Link
              href="/dashboard/seniors/new"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50 border border-brand-navy/20 bg-white hover:bg-brand-mist"
            >
              Add
            </Link>
          </div>

          <div className="mt-4 grid gap-2">
            {(seniors ?? []).length === 0 ? (
              <div className="text-sm text-neutral-600">
                No seniors yet. Click <span className="font-medium">Add</span> to create one.
              </div>
            ) : (
              (seniors ?? []).map((s: any) => (
                <Link
                  key={s.id}
                  href={`/dashboard/seniors/${s.id}`}
                  className="block rounded-lg border border-neutral-200 p-3 hover:bg-neutral-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-brand-navy">
                      {s.name ?? "Unnamed"}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {s.enabled ? "Enabled" : "Disabled"}
                    </div>
                  </div>

                  <div className="mt-1 text-sm text-neutral-600">
                    {s.phone_e164 ?? ""}
                    {s.timezone ? ` • ${s.timezone}` : ""}
                    {s.checkin_time ? ` • ${s.checkin_time}` : ""}
                  </div>
                </Link>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
