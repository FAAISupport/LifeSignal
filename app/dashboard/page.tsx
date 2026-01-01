import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import TestCheckinButton from "@/components/dashboard/TestCheckinButton";

function pillClass(kind: "ok" | "warn" | "off") {
  switch (kind) {
    case "ok":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "warn":
      return "bg-amber-50 text-amber-800 border-amber-200";
    case "off":
    default:
      return "bg-neutral-50 text-neutral-700 border-neutral-200";
  }
}

function ChecklistItem({
  done,
  title,
  description,
  href,
}: {
  done: boolean;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={[
        "flex items-start gap-3 rounded-xl border p-4 transition",
        done
          ? "border-emerald-200 bg-emerald-50/40"
          : "border-neutral-200 bg-white hover:bg-neutral-50",
      ].join(" ")}
    >
      <div
        className={[
          "mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold",
          done
            ? "border-emerald-300 bg-emerald-100 text-emerald-700"
            : "border-neutral-300 bg-white text-neutral-500",
        ].join(" ")}
        aria-hidden
      >
        {done ? "✓" : "•"}
      </div>
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="font-semibold text-brand-navy">{title}</div>
          <span className="shrink-0 text-xs text-neutral-500">
            {done ? "Done" : "Do this"}
          </span>
        </div>
        <div className="mt-1 text-sm text-neutral-600">{description}</div>
      </div>
    </Link>
  );
}

export default async function DashboardPage() {
  const sb = await supabaseServer();

  const {
    data: { user },
    error: userErr,
  } = await sb.auth.getUser();

  if (userErr || !user) redirect("/login");

  const { data: sub } = await sb
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: lovedOnes } = await sb
    .from("seniors")
    .select("*")
    .eq("owner_user_id", user.id)
    .order("created_at", { ascending: false });

  const planStatus = String(sub?.status ?? "");
  const isActive = planStatus === "active" || planStatus === "trialing";
  const planLabel = isActive
    ? `${String(sub?.plan ?? "plan")} (${String(sub?.status)})`
    : "No active plan";

  const all = lovedOnes ?? [];
  const enabledCount = all.filter((x: any) => Boolean(x?.enabled)).length;

  // Setup heuristics
  const first = all[0] as any | undefined;
  const hasLovedOne = all.length > 0;
  const hasPhone = hasLovedOne ? Boolean(first?.phone_e164) : false;
  const hasSchedule = hasLovedOne
    ? Boolean(first?.checkin_time && first?.timezone)
    : false;

  const hasEscalation = hasLovedOne
    ? Boolean(
        first?.escalation_phone_e164 ||
          first?.escalation_contact_phone ||
          first?.primary_contact_phone ||
          first?.emergency_contact_phone ||
          first?.escalation_email ||
          first?.emergency_contact_email
      )
    : false;

  const checklistDoneCount = [hasLovedOne, hasPhone, hasSchedule, hasEscalation].filter(Boolean).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="text-sm text-neutral-600">
            Signed in as{" "}
            <span className="font-medium text-neutral-800">{user.email}</span>
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-brand-navy">
            LifeSignal Control Panel
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={[
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
                isActive ? pillClass("ok") : pillClass("warn"),
              ].join(" ")}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-current opacity-70"
                aria-hidden
              />
              Plan: {planLabel}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700">
              Loved ones: {all.length}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700">
              Active monitoring: {enabledCount}
            </span>
          </div>

          {!isActive && (
            <div className="mt-3 text-sm text-neutral-600">
              You can set everything up now. When you activate a plan, check-ins and escalations can run automatically.
            </div>
          )}
        </div>

        {/* Primary actions + Tools dropdown */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/seniors/new"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition bg-brand-navy text-white hover:opacity-90"
          >
            + Add a loved one
          </Link>

          {/* Tools dropdown (simple + reliable, no JS libs) */}
          <details className="relative">
            <summary className="list-none cursor-pointer inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition border border-brand-navy/20 bg-white hover:bg-brand-mist">
              Tools ▾
            </summary>

            <div className="absolute right-0 z-20 mt-2 w-72 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
              <div className="p-3">
                <div className="text-xs font-semibold text-neutral-500">QUICK ACTIONS</div>

                <div className="mt-3 grid gap-2">
                  {hasLovedOne ? (
                    <TestCheckinButton
                      seniorId={String(first?.id)}
                      label="Send test check-in (first loved one)"
                      variant="primary"
                      channel="both"
                    />
                  ) : (
                    <Link
                      href="/dashboard/seniors/new"
                      className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition bg-brand-navy text-white hover:opacity-90"
                    >
                      Add a loved one to enable testing
                    </Link>
                  )}

                  <Link
                    href="/admin"
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition border border-neutral-200 bg-white hover:bg-neutral-50"
                  >
                    Admin tools
                  </Link>

                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition border border-neutral-200 bg-white hover:bg-neutral-50"
                  >
                    Plans & pricing
                  </Link>
                </div>

                <div className="mt-3 text-xs text-neutral-500">
                  Tip: “Test check-in” sends one SMS/voice immediately and logs it.
                </div>
              </div>
            </div>
          </details>

          <Link
            href="/logout"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition border border-neutral-200 bg-white hover:bg-neutral-50"
          >
            Log out
          </Link>
        </div>
      </div>

      {/* Setup checklist */}
      <div className="mt-8">
        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-lg font-semibold text-brand-navy">
                Setup checklist
              </div>
              <div className="mt-1 text-sm text-neutral-600">
                Complete these once, and LifeSignal becomes effortless.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-700">
                {checklistDoneCount}/4 complete
              </span>
              <div className="h-2 w-40 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full bg-brand-navy"
                  style={{
                    width: `${Math.round((checklistDoneCount / 4) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <ChecklistItem
              done={hasLovedOne}
              title="Add your first loved one"
              description="Create a profile so LifeSignal knows who to check on."
              href="/dashboard/seniors/new"
            />
            <ChecklistItem
              done={hasPhone}
              title="Confirm phone number"
              description="SMS/voice check-ins require a valid number."
              href={
                hasLovedOne ? `/dashboard/seniors/${first?.id ?? ""}` : "/dashboard/seniors/new"
              }
            />
            <ChecklistItem
              done={hasSchedule}
              title="Set daily check-in time"
              description="Choose the time & timezone for the check-in window."
              href={
                hasLovedOne ? `/dashboard/seniors/${first?.id ?? ""}` : "/dashboard/seniors/new"
              }
            />
            <ChecklistItem
              done={hasEscalation}
              title="Add escalation contact"
              description="If your loved one doesn’t respond, who gets notified?"
              href={
                hasLovedOne ? `/dashboard/seniors/${first?.id ?? ""}` : "/dashboard/seniors/new"
              }
            />
          </div>
        </Card>
      </div>

      {/* Loved ones list */}
      <div className="mt-8 grid gap-4">
        <Card>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-lg font-semibold text-brand-navy">
                Loved ones
              </div>
              <div className="mt-1 text-sm text-neutral-600">
                Monitor status, schedules, and escalation settings.
              </div>
            </div>

            <Link
              href="/dashboard/seniors/new"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition bg-brand-navy text-white hover:opacity-90"
            >
              + Add
            </Link>
          </div>

          <div className="mt-5 grid gap-3">
            {all.length === 0 ? (
              <div className="rounded-xl border border-neutral-200 bg-white p-6">
                <div className="text-base font-semibold text-brand-navy">
                  No loved ones yet
                </div>
                <div className="mt-2 text-sm text-neutral-600">
                  Add one person to begin. Then set a daily check-in time and escalation contact.
                </div>
                <div className="mt-4">
                  <Link
                    href="/dashboard/seniors/new"
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition bg-brand-navy text-white hover:opacity-90"
                  >
                    + Add your first loved one
                  </Link>
                </div>
              </div>
            ) : (
              all.map((s: any) => {
                const enabled = Boolean(s?.enabled);
                const tz = s?.timezone ? String(s.timezone) : "—";
                const time = s?.checkin_time ? String(s.checkin_time) : "—";
                const channel = s?.channel_pref ? String(s.channel_pref) : "—";

                const ready =
                  Boolean(s?.phone_e164) &&
                  Boolean(s?.checkin_time) &&
                  Boolean(s?.timezone);

                return (
                  <div
                    key={s.id}
                    className="rounded-2xl border border-neutral-200 bg-white p-4 transition hover:bg-neutral-50"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="text-base font-semibold text-brand-navy">
                            {s.name ?? "Unnamed loved one"}
                          </div>

                          <span
                            className={[
                              "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
                              enabled ? pillClass("ok") : pillClass("off"),
                            ].join(" ")}
                          >
                            {enabled ? "Monitoring" : "Paused"}
                          </span>

                          <span
                            className={[
                              "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
                              ready ? pillClass("ok") : pillClass("warn"),
                            ].join(" ")}
                            title={
                              ready ? "Setup looks good" : "Missing phone/time/timezone"
                            }
                          >
                            {ready ? "Ready" : "Needs setup"}
                          </span>
                        </div>

                        <div className="mt-2 grid gap-2 text-sm text-neutral-700 md:grid-cols-3">
                          <div className="rounded-xl border border-neutral-200 bg-white px-3 py-2">
                            <div className="text-xs text-neutral-500">Phone</div>
                            <div className="font-medium">{s.phone_e164 ?? "—"}</div>
                          </div>

                          <div className="rounded-xl border border-neutral-200 bg-white px-3 py-2">
                            <div className="text-xs text-neutral-500">Daily check-in</div>
                            <div className="font-medium">
                              {time} <span className="text-neutral-500">({tz})</span>
                            </div>
                          </div>

                          <div className="rounded-xl border border-neutral-200 bg-white px-3 py-2">
                            <div className="text-xs text-neutral-500">Channel</div>
                            <div className="font-medium">{channel}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/dashboard/seniors/${s.id}`}
                          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition border border-brand-navy/20 bg-white hover:bg-brand-mist"
                        >
                          Open
                        </Link>

                        <Link
                          href={`/dashboard/seniors/${s.id}`}
                          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition bg-brand-navy text-white hover:opacity-90"
                        >
                          Edit settings
                        </Link>

                        <TestCheckinButton
                          seniorId={String(s.id)}
                          label="Test check-in"
                          variant="secondary"
                          channel="both"
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
