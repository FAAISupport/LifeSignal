// app/dashboard/seniors/[seniorId]/page.tsx
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { updateSeniorSettings, activateMonitoring } from "../../actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isActivePlan(status?: string | null) {
  return status === "active" || status === "trialing";
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { seniorId: string };
  searchParams?: { error?: string; saved?: string; created?: string; activated?: string };
}) {
  const sb = await supabaseServer();

  const {
    data: { user },
    error: userErr,
  } = await sb.auth.getUser();

  if (userErr || !user) redirect("/login");

  // Subscription status (for plan-gated activation UI)
  const { data: sub } = await sb
    .from("subscriptions")
    .select("status, plan")
    .eq("user_id", user.id)
    .maybeSingle();

  const planActive = isActivePlan(sub?.status ?? null);
  const planLabel = planActive
    ? `${String(sub?.plan ?? "plan")} (${String(sub?.status)})`
    : "No active plan";

  const {
    data: senior,
    error: seniorErr,
  } = await sb
    .from("seniors")
    .select("*")
    .eq("id", params.seniorId)
    // IMPORTANT: also enforce ownership here, otherwise someone could guess IDs
    .eq("owner_user_id", user.id)
    .maybeSingle();

  if (seniorErr || !senior) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <Card className="p-6">
          <div className="text-lg font-semibold text-brand-navy">Loved one not found</div>
          <div className="mt-2 text-sm text-neutral-600">
            This profile may not exist, or you may not have access to it.
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition bg-brand-navy text-white hover:opacity-90"
            >
              Back to dashboard
            </Link>
            <Link
              href="/dashboard/seniors/new"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition border border-brand-navy/20 bg-white hover:bg-brand-mist"
            >
              Add a loved one
            </Link>
          </div>
          {seniorErr?.message ? (
            <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-600">
              Debug: {seniorErr.message}
            </div>
          ) : null}
        </Card>
      </div>
    );
  }

  const bannerError = typeof searchParams?.error === "string" ? searchParams.error : "";
  const bannerSaved = searchParams?.saved === "1";
  const bannerCreated = searchParams?.created === "1";
  const bannerActivated = searchParams?.activated === "1";

  const { data: checkins } = await sb
    .from("checkins")
    .select("*")
    .eq("senior_id", params.seniorId)
    .order("scheduled_for", { ascending: false })
    .limit(25);

  const { data: contacts } = await sb
    .from("family_contacts")
    .select("*")
    .eq("senior_id", params.seniorId)
    .order("created_at", { ascending: false });

  const monitoringOn = Boolean(senior.enabled && senior.messaging_enabled);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm text-neutral-600">Loved one</div>
          <h1 className="text-2xl font-semibold text-brand-navy">
            {senior.name ?? "Unnamed loved one"}
          </h1>
          <div className="mt-2 text-sm text-neutral-600">
            Plan: <span className="font-medium">{planLabel}</span>
          </div>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition border border-neutral-200 bg-white hover:bg-neutral-50"
        >
          ← Back to dashboard
        </Link>
      </div>

      {bannerCreated ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Loved one created ✅ Next, confirm the schedule + escalation contact.
        </div>
      ) : null}

      {bannerSaved ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Saved ✅
        </div>
      ) : null}

      {bannerActivated ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Monitoring activated ✅
        </div>
      ) : null}

      {bannerError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {bannerError}
        </div>
      ) : null}

      {/* Activation gate card */}
      <Card className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-brand-navy">Monitoring</h2>
            <div className="mt-1 text-sm text-neutral-600">
              Monitoring must be activated to run daily check-ins and escalations.
            </div>
          </div>

          <span
            className={[
              "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
              monitoringOn
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-amber-200 bg-amber-50 text-amber-800",
            ].join(" ")}
          >
            {monitoringOn ? "Monitoring ON" : "Monitoring OFF"}
          </span>
        </div>

        {!monitoringOn ? (
          <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-4">
            {!planActive ? (
              <div className="space-y-3">
                <div className="text-sm font-semibold text-brand-navy">
                  Choose a plan to activate monitoring
                </div>
                <div className="text-sm text-neutral-600">
                  You can set everything up, but LifeSignal won’t send check-ins or escalations
                  until a plan is active.
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                  >
                    View pricing
                  </Link>
                  <Link
                    href="/terms"
                    className="text-sm font-semibold text-brand-navy underline underline-offset-4"
                  >
                    Terms
                  </Link>
                </div>
              </div>
            ) : (
              <form action={activateMonitoring} className="space-y-3">
                <input type="hidden" name="senior_id" value={String(senior.id)} />

                <div className="text-sm font-semibold text-brand-navy">
                  Ready to activate monitoring
                </div>
                <div className="text-sm text-neutral-600">
                  Confirm the acknowledgement below, then turn on monitoring for this loved one.
                </div>

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
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            Monitoring is active. Daily check-ins and escalation logic will run automatically based on this profile.
          </div>
        )}
      </Card>

      {/* Settings */}
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-brand-navy">Settings</h2>
            <div className="mt-1 text-sm text-neutral-600">
              Check-in time, channel, and wait window.
            </div>
          </div>
        </div>

        <form action={updateSeniorSettings} className="mt-4 grid gap-4">
          <input type="hidden" name="id" value={String(senior.id)} />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Timezone</Label>
              <Input name="timezone" defaultValue={senior.timezone ?? ""} required />
              <div className="mt-1 text-xs text-neutral-500">Example: America/New_York</div>
            </div>
            <div>
              <Label>Check-in time</Label>
              <Input name="checkin_time" defaultValue={senior.checkin_time ?? ""} required />
              <div className="mt-1 text-xs text-neutral-500">24h format, e.g. 09:30</div>
            </div>
          </div>

          <div>
            <Label>Channel preference</Label>
            <select
              name="channel_pref"
              defaultValue={senior.channel_pref ?? "sms"}
              className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm"
            >
              <option value="sms">SMS</option>
              <option value="voice">Voice</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div>
            <Label>Wait window (minutes)</Label>
            <Input
              name="wait_minutes"
              type="number"
              min={5}
              max={240}
              defaultValue={Number(senior.wait_minutes ?? 30)}
            />
            <div className="mt-1 text-xs text-neutral-500">
              How long LifeSignal waits before escalation after a missed check-in.
            </div>
          </div>

          <Button type="submit">Save</Button>
        </form>
      </Card>

      {/* Contacts */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-brand-navy">Escalation contacts</h2>
        <div className="mt-3 space-y-2 text-sm text-neutral-700">
          {(contacts ?? []).length === 0 ? (
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
              No contacts yet.
            </div>
          ) : (
            (contacts ?? []).map((c: any) => (
              <div
                key={c.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-neutral-200 p-3"
              >
                <div>
                  <div className="font-medium">
                    {c.name} {c.verified ? "✅" : "⏳"}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {c.phone_e164 ?? ""} {c.email ? `• ${c.email}` : ""}
                  </div>
                </div>
                <div className="text-xs text-neutral-500">
                  miss:{String(c.notify_on_miss)} help:{String(c.notify_on_help)}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Checkins */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-brand-navy">Recent check-ins</h2>
        <div className="mt-3 space-y-2 text-sm text-neutral-700">
          {(checkins ?? []).length === 0 ? (
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
              No check-ins yet.
            </div>
          ) : (
            (checkins ?? []).map((ci: any) => (
              <div
                key={ci.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-neutral-200 p-3"
              >
                <div>
                  <div className="font-medium">
                    {ci.scheduled_for ? new Date(ci.scheduled_for).toLocaleString() : "—"}
                  </div>
                  <div className="text-xs text-neutral-500">
                    status: {ci.status} {ci.response_type ? `• ${ci.response_type}` : ""}
                  </div>
                </div>
                <div className="text-xs text-neutral-500">{ci.channel ?? ""}</div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
