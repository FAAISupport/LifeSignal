import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { activateMonitoringAll } from "@/app/dashboard/actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isActivePlan(status?: string | null) {
  return status === "active" || status === "trialing";
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { error?: string; activated?: string };
}) {
  const sb = await supabaseServer();

  const {
    data: { user },
    error: userErr,
  } = await sb.auth.getUser();

  if (userErr || !user) redirect("/login");

  const { data: sub } = await sb
    .from("subscriptions")
    .select("status, plan")
    .eq("user_id", user.id)
    .maybeSingle();

  const planActive = isActivePlan(sub?.status ?? null);

  const { data: seniors } = await sb
    .from("seniors")
    .select("id,name,phone_e164,timezone,checkin_time,enabled,messaging_enabled")
    .eq("owner_user_id", user.id)
    .order("created_at", { ascending: false });

  const lovedOnesCount = (seniors ?? []).length;
  const activeMonitoringCount = (seniors ?? []).filter(
    (s: any) => s.enabled && s.messaging_enabled
  ).length;

  const hasLovedOne = lovedOnesCount > 0;
  const hasPhone = (seniors ?? []).some((s: any) => Boolean(s.phone_e164));
  const hasSchedule = (seniors ?? []).some(
    (s: any) => Boolean(s.timezone) && Boolean(s.checkin_time)
  );

  const { data: contacts } = await sb
    .from("family_contacts")
    .select("id,senior_id")
    .in("senior_id", (seniors ?? []).map((s: any) => s.id));

  const hasEscalation = (contacts ?? []).length > 0;

  const checklist = [
    { label: "Add your first loved one", done: hasLovedOne },
    { label: "Confirm phone number", done: hasPhone },
    { label: "Set daily check-in time", done: hasSchedule },
    { label: "Add escalation contact", done: hasEscalation },
  ];

  const doneCount = checklist.filter((x) => x.done).length;
  const errorMsg = searchParams?.error ? String(searchParams.error) : "";

  const planLabel = planActive
    ? `${String(sub?.plan ?? "plan")} (${String(sub?.status)})`
    : "No active plan";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {errorMsg ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMsg}
        </div>
      ) : null}

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="text-sm text-neutral-600">
            Signed in as <span className="font-medium">{user.email}</span>
          </div>
          <h1 className="mt-1 text-3xl font-semibold text-brand-navy">
            LifeSignal Control Panel
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
              Plan: {planLabel}
            </span>
            <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
              Loved ones: {lovedOnesCount}
            </span>
            <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
              Active monitoring: {activeMonitoringCount}
            </span>
          </div>

          <p className="mt-3 max-w-xl text-sm text-neutral-600">
            Set everything up now. When you activate a plan, you can turn monitoring on with one click.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard/seniors/new"
            className="inline-flex items-center justify-center rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            + Add a loved one
          </Link>

          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-neutral-50"
          >
            Pricing
          </Link>

          <Link
            href="/logout"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-neutral-50"
          >
            Log out
          </Link>
        </div>
      </div>

      {!planActive ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <div className="text-sm font-semibold text-amber-900">
            Monitoring is currently OFF (no active plan).
          </div>
          <div className="mt-1 text-sm text-amber-900/80">
            You can set up loved ones and contacts, but check-ins and escalations won’t run until you activate a plan.
          </div>
          <div className="mt-3">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Choose a plan to activate monitoring
            </Link>
          </div>
        </div>
      ) : null}

      {planActive && hasLovedOne && activeMonitoringCount === 0 ? (
        <div className="mt-6 rounded-2xl border border-brand-blue/20 bg-brand-mist px-5 py-4">
          <div className="text-sm font-semibold text-brand-navy">
            Your plan is active — monitoring is still OFF.
          </div>
          <div className="mt-1 text-sm text-neutral-700">
            Confirm the acknowledgement below, then click once to turn on daily check-ins and escalation monitoring.
          </div>

          <form action={activateMonitoringAll} className="mt-4 grid gap-3">
            <label className="flex items-start gap-3 text-sm text-neutral-800">
              <input
                type="checkbox"
                name="activation_ack"
                className="mt-1 h-4 w-4 rounded border-neutral-300"
                required
              />
              <span>
                I understand LifeSignal is a <strong>non-emergency</strong> monitoring service and{" "}
                <strong>subscriptions are non-refundable</strong>.
              </span>
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <Button type="submit">Activate monitoring</Button>
              <Link
                href="/terms"
                className="text-sm font-semibold text-brand-navy underline underline-offset-4"
              >
                View Terms
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-semibold text-brand-navy underline underline-offset-4"
              >
                Manage plan
              </Link>
            </div>
          </form>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4">
        <Card className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-lg font-semibold text-brand-navy">Setup checklist</div>
              <div className="mt-1 text-sm text-neutral-600">
                Complete these once, and LifeSignal becomes effortless.
              </div>
            </div>
            <div className="text-sm font-semibold text-neutral-700">
              {doneCount}/{checklist.length} complete
            </div>
          </div>

          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {checklist.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-5 w-5 rounded-full border ${
                      item.done
                        ? "border-green-300 bg-green-100"
                        : "border-neutral-300 bg-neutral-50"
                    }`}
                  />
                  <div>
                    <div className="text-sm font-semibold text-brand-navy">
                      {item.label}
                    </div>
                    <div className="text-xs text-neutral-600">
                      {item.done ? "Complete" : "Do this next"}
                    </div>
                  </div>
                </div>

                {!item.done ? (
                  <Link
                    href={
                      item.label === "Add your first loved one"
                        ? "/dashboard/seniors/new"
                        : item.label === "Add escalation contact"
                        ? hasLovedOne
                          ? `/dashboard/seniors/${encodeURIComponent(
                              String((seniors ?? [])[0]?.id ?? "")
                            )}`
                          : "/dashboard/seniors/new"
                        : "/dashboard/seniors/new"
                    }
                    className="text-sm font-semibold text-brand-navy underline underline-offset-4"
                  >
                    Do this
                  </Link>
                ) : (
                  <span className="text-xs text-neutral-500">✓</span>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-lg font-semibold text-brand-navy">Loved ones</div>
              <div className="mt-1 text-sm text-neutral-600">
                Manage profiles, check-in times, and escalation settings.
              </div>
            </div>
            <Link
              href="/dashboard/seniors/new"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-neutral-50"
            >
              Add
            </Link>
          </div>

          <div className="mt-4 grid gap-2">
            {lovedOnesCount === 0 ? (
              <div className="text-sm text-neutral-600">
                No loved ones yet. Click <span className="font-medium">Add</span> to create one.
              </div>
            ) : (
              (seniors ?? []).map((s: any) => {
                const monitoringOn = Boolean(s.enabled && s.messaging_enabled);
                return (
                  <Link
                    key={s.id}
                    href={`/dashboard/seniors/${encodeURIComponent(String(s.id))}`}
                    className="block rounded-xl border border-neutral-200 p-4 hover:bg-neutral-50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold text-brand-navy">
                        {s.name ?? "Unnamed"}
                      </div>
                      <div
                        className={`text-xs font-semibold rounded-full px-2 py-1 border ${
                          monitoringOn
                            ? "border-green-200 bg-green-50 text-green-800"
                            : "border-amber-200 bg-amber-50 text-amber-800"
                        }`}
                      >
                        {monitoringOn ? "Monitoring ON" : "Monitoring OFF"}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-neutral-600">
                      {s.phone_e164 ?? ""}
                      {s.timezone ? ` • ${s.timezone}` : ""}
                      {s.checkin_time ? ` • ${s.checkin_time}` : ""}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
