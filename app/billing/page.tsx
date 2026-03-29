import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { requireMembership } from "@/lib/auth/org-access";
import { createClient } from "@/lib/supabase/server";

export default async function BillingPage() {
  const membership = await requireMembership(["owner", "admin", "manager"]);
  const supabase = await createClient();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, plan_key, seat_count, current_period_end, cancel_at_period_end")
    .eq("org_id", membership.org_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<{
      status: string;
      plan_key: string;
      seat_count: number;
      current_period_end: string | null;
      cancel_at_period_end: boolean;
    }>();

  return (
    <DashboardShell title="Billing">
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
        {subscription ? (
          <>
            <p>Status: {subscription.status}</p>
            <p>Plan: {subscription.plan_key}</p>
            <p>Seats: {subscription.seat_count}</p>
            <p>Current period end: {subscription.current_period_end ? new Date(subscription.current_period_end).toLocaleString() : "-"}</p>
            <p>Cancel at period end: {subscription.cancel_at_period_end ? "Yes" : "No"}</p>
          </>
        ) : (
          <p>No active subscription found.</p>
        )}

        <form action="/api/billing/portal" method="post" className="mt-4">
          <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Open billing portal
          </button>
        </form>
      </div>
    </DashboardShell>
  );
}
