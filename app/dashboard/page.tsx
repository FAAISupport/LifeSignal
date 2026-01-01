export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import DashboardClientUX from "@/components/dashboard/DashboardClientUX";

async function logoutAction() {
  "use server";
  const sb = await supabaseServer();
  await sb.auth.signOut();
  redirect("/login");
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { created?: string };
}) {
  const sb = await supabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();

  // Dashboard layout enforces auth; user should exist here.
  const { data: sub } = await sb
    .from("subscriptions")
    .select("*")
    .eq("user_id", user!.id)
    .maybeSingle();

  const { data: seniors } = await sb
    .from("seniors")
    .select("*")
    .eq("owner_user_id", user!.id)
    .order("created_at", { ascending: false });

  const lovedOnesCount = (seniors ?? []).length;
  const activeMonitoringCount = (seniors ?? []).filter((s: any) => Boolean(s.enabled)).length;

  const planLabel =
    sub?.status === "active" || sub?.status === "trialing"
      ? `${String(sub.plan ?? "plan")} (${String(sub.status)})`
      : "No active plan";

  const checklistTotal = 4;
  const checklistDone =
    (lovedOnesCount > 0 ? 1 : 0) +
    ((seniors ?? []).some((s: any) => !!s.phone_e164) ? 1 : 0) +
    ((seniors ?? []).some((s: any) => !!s.checkin_time && !!s.timezone) ? 1 : 0) +
    ((seniors ?? []).some((s: any) => !!s.channel_pref) ? 1 : 0);

  const created = searchParams?.created === "1";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Client-only niceties: auto-scroll */}
      <DashboardClientUX created={created} />

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-sm text-neutral-600">
            Signed in as <span className="font-medium">{user!.email}</span>
          </div>

          <h1 className="mt-2 text-3xl font-semibold text-brand-navy">
            LifeSignal Control Panel
          </h1>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900">
              ● Plan: {planLabel}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-800">
              Loved ones: {lovedOnesCount}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-800">
              Active monitoring: {activeMonitoringCount}
            </span>
          </div>

          <p className="mt-3 text-sm text-neutral-600">
            You can set everything up now. When you activate a plan, check-ins and escalations can run automatically.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/seniors/new">
            <Button>+ Add a loved one</Button>
          </Link>

          <div className="relative">
            <details className="group">
              <summary className="inline-flex cursor-pointer list-none items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-neutral-50">
                Tools <span className="ml-2 text-xs opacity-60">▼</span>
              </summary>
              <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg">
                <Link href="/admin" className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50">
                  Admin
                </Link>
                <Link href="/pricing" className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50">
                  Pricing
                </Link>
              </div>
            </details>
          </div>

          {/* IMPORTANT: Use POST (server action) to avoid Link prefetch logging you out */}
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-neutral-50"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      {created ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
          ✅ Loved one created. Next: confirm settings and run a test check-in.
        </div>
      ) : null}

      <div className="mt-10" id="checklist">
        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-brand-navy">Setup checklist</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Complete these once, and LifeSignal becomes effortless.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-neutral-700">
                {checklistDone}/{checklistTotal} complete
              </div>
              <div className="h-2 w-40 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full bg-brand-navy"
                  style={{ width: `${Math.round((checklistDone / checklistTotal) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <ChecklistItem
              title="Add your first loved one"
              desc="Create a profile so LifeSignal knows who to check on."
              done={lovedOnesCount > 0}
              href="/dashboard/seniors/new"
            />
            <ChecklistItem
              title="Confirm phone number"
              desc="SMS/voice check-ins require a valid number."
              done={(seniors ?? []).some((s: any) => !!s.phone_e164)}
              href={lovedOnesCount > 0 ? `/dashboard/seniors/${seniors?.[0]?.id}` : "/dashboard/seniors/new"}
            />
            <ChecklistItem
              title="Set daily check-in time"
              desc="Choose the time & timezone for the check-in window."
              done={(seniors ?? []).some((s: any) => !!s.checkin_time && !!s.timezone)}
              href={lovedOnesCount > 0 ? `/dashboard/seniors/${seniors?.[0]?.id}` : "/dashboard/seniors/new"}
            />
            <ChecklistItem
              title="Choose check-in channel"
              desc="SMS, voice, or both."
              done={(seniors ?? []).some((s: any) => !!s.channel_pref)}
              href={lovedOnesCount > 0 ? `/dashboard/seniors/${seniors?.[0]?.id}` : "/dashboard/seniors/new"}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function ChecklistItem({
  title,
  desc,
  done,
  href,
}: {
  title: string;
  desc: string;
  done: boolean;
  href: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div
          className={[
            "mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs font-bold",
            done
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-neutral-200 bg-neutral-50 text-neutral-500",
          ].join(" ")}
        >
          {done ? "✓" : "•"}
        </div>
        <div>
          <div className="text-sm font-semibold text-brand-navy">{title}</div>
          <div className="mt-1 text-xs text-neutral-600">{desc}</div>
        </div>
      </div>

      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold transition hover:bg-neutral-50"
      >
        {done ? "View" : "Do this"}
      </Link>
    </div>
  );
}
