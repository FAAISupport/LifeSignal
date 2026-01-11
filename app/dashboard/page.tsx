// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { getSubscriptionForUser } from "@/lib/subscription";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { activateMonitoringAllForm } from "@/app/dashboard/actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParams = {
  error?: string;
  monitoring?: string;
  created?: string;
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const sb = await supabaseServer();

  const {
    data: { user },
    error: userErr,
  } = await sb.auth.getUser();

  if (userErr || !user) {
    redirect("/login?next=/dashboard");
  }

  const sub = await getSubscriptionForUser(sb as any, user.id);
  const hasPlan = sub.isActive;

  // Pull seniors (loved ones)
  const { data: seniors, error: seniorsErr } = await sb
    .from("seniors")
    .select(
      "id,name,phone_e164,timezone,checkin_time,channel_pref,enabled,created_at"
    )
    .eq("owner_user_id", user.id)
    .order("created_at", { ascending: false });

  const lovedOnes = Array.isArray(seniors) ? seniors : [];

  const lovedOnesCount = lovedOnes.length;
  const monitoringOnCount = lovedOnes.filter((s: any) => s.enabled).length;

  const banner =
    searchParams?.error
      ? {
          kind: "error" as const,
          message: decodeURIComponent(searchParams.error),
        }
      : searchParams?.monitoring === "all_on"
      ? {
          kind: "success" as const,
          message: "Monitoring enabled for all loved ones.",
        }
      : null;

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <div className="mt-1 text-sm text-slate-600">
            Signed in as{" "}
            <span className="font-medium text-slate-900">{user.email}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {hasPlan ? (
            <Link href="/dashboard/seniors/new">
              <Button>+ Add a loved one</Button>
            </Link>
          ) : (
            <Link href="/pricing">
              <Button>Choose a plan</Button>
            </Link>
          )}
          <Link href="/logout">
            <Button variant="outline">Log out</Button>
          </Link>
        </div>
      </div>

      {/* Banner */}
      {banner ? (
        <div
          className={[
            "rounded-xl border px-4 py-3 text-sm",
            banner.kind === "error"
              ? "border-amber-200 bg-amber-50 text-amber-900"
              : "border-emerald-200 bg-emerald-50 text-emerald-900",
          ].join(" ")}
        >
          {banner.message}
        </div>
      ) : null}

      {/* Plan gate */}
      {!hasPlan ? (
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          You don’t have an active subscription yet. Choose a plan to add loved ones
          and enable monitoring.
        </div>
      ) : null}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <div className="text-sm text-slate-500">Loved ones</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">
            {lovedOnesCount}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Profiles linked to your account
          </div>
        </Card>

        <Card>
          <div className="text-sm text-slate-500">Monitoring ON</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">
            {monitoringOnCount}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Currently enabled loved ones
          </div>
        </Card>

        <Card>
          <div className="text-sm text-slate-500">Plan</div>
          <div className="mt-2 text-lg font-semibold text-slate-900">
            {hasPlan ? "Active" : "No active plan"}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Provider: {sub.provider ?? "—"}
          </div>
          {!hasPlan ? (
            <div className="mt-4">
              <Link href="/pricing">
                <Button className="w-full">Subscribe</Button>
              </Link>
            </div>
          ) : null}
        </Card>
      </div>

      {/* Monitoring all form (FORM-SAFE SERVER ACTION) */}
      <Card>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-base font-semibold text-slate-900">
              Monitoring controls
            </div>
            <div className="text-sm text-slate-600">
              Enable monitoring for all loved ones at once.
            </div>
          </div>
        </div>

        <form action={activateMonitoringAllForm} className="mt-4 grid gap-3">
          <label className="flex items-start gap-3 text-sm text-slate-800">
            <input type="checkbox" name="confirm" required className="mt-1" />
            <span>
              I understand this will enable monitoring for all loved ones on my
              account.
            </span>
          </label>

          <Button type="submit" disabled={!hasPlan}>
            Enable monitoring for all
          </Button>

          {!hasPlan ? (
            <div className="text-xs text-slate-500">
              Subscribe to enable monitoring.
            </div>
          ) : null}
        </form>
      </Card>

      {/* Loved ones list */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-base font-semibold text-slate-900">Loved ones</div>
            <div className="text-sm text-slate-600">
              Click a profile to view or edit settings.
            </div>
          </div>

          {hasPlan ? (
            <Link href="/dashboard/seniors/new" className="text-sm text-slate-700 underline">
              Create new
            </Link>
          ) : (
            <Link href="/pricing" className="text-sm text-slate-700 underline">
              Subscribe
            </Link>
          )}
        </div>

        {seniorsErr ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Failed to load loved ones: {seniorsErr.message}
          </div>
        ) : lovedOnes.length === 0 ? (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-700">
            You don’t have any loved ones yet.{" "}
            {hasPlan ? (
              <Link href="/dashboard/seniors/new" className="underline">
                Add your first loved one
              </Link>
            ) : (
              <Link href="/pricing" className="underline">
                Choose a plan to get started
              </Link>
            )}
            .
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Channel</th>
                  <th className="px-4 py-3">Monitoring</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {lovedOnes.map((s: any) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/seniors/${encodeURIComponent(s.id)}`}
                        className="font-medium text-slate-900 underline"
                      >
                        {s.name || "Unnamed"}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {s.phone_e164 || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {(s.checkin_time || "—") + " " + (s.timezone || "")}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {s.channel_pref || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={[
                          "inline-flex rounded-full px-2 py-1 text-xs font-medium",
                          s.enabled
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-700",
                        ].join(" ")}
                      >
                        {s.enabled ? "ON" : "OFF"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
