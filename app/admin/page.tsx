import { supabaseServer } from "@/lib/supabase/server";
import { getUserAndProfile } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { toggleSeniorBetaOverride } from "./actions";

export default async function Page() {
  const { profile } = await getUserAndProfile();
  if (!profile || profile.role !== "admin") {
    return (
      <Card>
        <b>Not authorized.</b>
      </Card>
    );
  }

  const sb = await supabaseServer();
  const { data: seniors } = await sb.from("seniors").select("*").order("created_at", { ascending: false }).limit(50);
  const { data: checkins24h } = await sb.from("checkins").select("id").gte("scheduled_for", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  return (
    <div className="space-y-6">
      <Card>
        <div className="text-lg font-semibold">Admin</div>
        <div className="mt-2 text-sm text-neutral-700">
          Seniors: <b>{(seniors ?? []).length}</b> • Check-ins (last 24h): <b>{(checkins24h ?? []).length}</b>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Recent seniors</h2>
        <div className="mt-3 space-y-2 text-sm text-neutral-700">
          {(seniors ?? []).map((s: any) => (
            <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 p-3">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-neutral-500">
                  {s.phone_e164} • owner {s.owner_user_id}
                </div>
              </div>
              <form
                action={async () => {
                  "use server";
                  await toggleSeniorBetaOverride(s.id, !s.beta_override);
                }}
              >
                <Button type="submit" variant="ghost">
                  {s.beta_override ? "Disable beta override" : "Enable beta override"}
                </Button>
              </form>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
