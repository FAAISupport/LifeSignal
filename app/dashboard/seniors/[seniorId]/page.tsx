import { supabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { updateSeniorSettings } from "../../actions";

export default async function Page({ params }: { params: { seniorId: string } }) {
  const sb = await supabaseServer();
  const { data: senior } = await sb.from("seniors").select("*").eq("id", params.seniorId).single();
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

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-semibold">Settings</h2>
        <form action={updateSeniorSettings} className="mt-4 grid gap-4">
          <input type="hidden" name="id" value={senior.id} />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Timezone</Label>
              <Input name="timezone" defaultValue={senior.timezone} required />
            </div>
            <div>
              <Label>Check-in time</Label>
              <Input name="checkin_time" defaultValue={senior.checkin_time} required />
            </div>
          </div>

          <div>
            <Label>Channel preference</Label>
            <select
              name="channel_pref"
              defaultValue={senior.channel_pref}
              className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm"
            >
              <option value="sms">SMS</option>
              <option value="voice">Voice</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div>
            <Label>Wait window (minutes)</Label>
            <Input name="wait_minutes" type="number" min={5} max={240} defaultValue={senior.wait_minutes} />
          </div>

          <Button type="submit">Save</Button>
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Family contacts</h2>
        <div className="mt-3 space-y-2 text-sm text-neutral-700">
          {(contacts ?? []).map((c: any) => (
            <div key={c.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-neutral-200 p-3">
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
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Recent check-ins</h2>
        <div className="mt-3 space-y-2 text-sm text-neutral-700">
          {(checkins ?? []).map((ci: any) => (
            <div key={ci.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-neutral-200 p-3">
              <div>
                <div className="font-medium">{new Date(ci.scheduled_for).toLocaleString()}</div>
                <div className="text-xs text-neutral-500">
                  status: {ci.status} {ci.response_type ? `• ${ci.response_type}` : ""}
                </div>
              </div>
              <div className="text-xs text-neutral-500">{ci.channel ?? ""}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
