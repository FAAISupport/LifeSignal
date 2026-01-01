import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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
          <Button asChild>
            <Link href="/dashboard/seniors/new">Add senior</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/logout">Log out</Link>
          </Button>
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
            <Button asChild variant="outline">
              <Link href="/dashboard/seniors/new">Add</Link>
            </Button>
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
                    <div className="font-medium text-brand-navy">{s.name ?? "Unnamed"}</div>
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
