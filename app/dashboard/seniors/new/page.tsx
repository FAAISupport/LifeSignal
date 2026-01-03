import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { createSeniorAndContacts } from "../../actions";

/**
 * FIX:
 * createSeniorAndContacts returns ActionResult
 * so we must unwrap (res.ok / res.data) before redirect.
 */

export default async function Page({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const sb = await supabaseServer();

  const {
    data: { user },
    error: userErr,
  } = await sb.auth.getUser();

  if (userErr || !user) {
    redirect("/login?next=/dashboard/seniors/new");
  }

  async function action(formData: FormData) {
    "use server";

    const res = await createSeniorAndContacts(formData);

    if (!res.ok) {
      redirect(
        `/dashboard/seniors/new?error=${encodeURIComponent(
          res.error || "Unable to create loved one"
        )}`
      );
    }

    redirect(
      `/dashboard/seniors/${encodeURIComponent(res.data.seniorId)}?created=1`
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-brand-navy">Create a profile</h1>
          <Link href="/dashboard" className="text-sm text-neutral-600 hover:underline">
            ← Back to dashboard
          </Link>
        </div>

        <p className="mt-1 text-sm text-neutral-600">
          Two quick steps. You can adjust details later.
        </p>

        {searchParams?.error ? (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {searchParams.error}
          </div>
        ) : null}

        <form action={action} className="mt-6 grid gap-6">
          {/* STEP 1 */}
          <div>
            <h2 className="font-medium text-brand-navy">Loved one details</h2>

            <div className="mt-3 grid gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  name="senior_name"
                  placeholder="e.g. Mom, Dad, Grandma"
                  required
                />
              </div>

              <div>
                <Label>Phone (E.164)</Label>
                <Input name="phone_e164" placeholder="+13525551234" required />
                <div className="mt-1 text-xs text-neutral-500">
                  Must include country code
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div>
            <h2 className="font-medium text-brand-navy">Check-in preferences</h2>

            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div>
                <Label>Timezone</Label>
                <Input
                  name="timezone"
                  defaultValue="America/New_York"
                  required
                />
              </div>

              <div>
                <Label>Daily check-in time</Label>
                <Input name="checkin_time" defaultValue="09:00" required />
              </div>
            </div>

            <div className="mt-4">
              <Label>Channel preference</Label>
              <select
                name="channel_pref"
                defaultValue="sms"
                className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm"
              >
                <option value="sms">SMS</option>
                <option value="voice">Voice</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>

          {/* ESCALATION CONTACT (optional) */}
          <div>
            <h2 className="font-medium text-brand-navy">Escalation contact</h2>

            <div className="mt-1 text-xs text-neutral-500">
              Optional — but recommended. If you fill any field here, include a
              name and at least a phone or email.
            </div>

            <div className="mt-3 grid gap-4">
              <div>
                <Label>Contact name</Label>
                <Input name="fc_name" placeholder="e.g. Sara" />
              </div>

              <div>
                <Label>Contact phone (E.164)</Label>
                <Input name="fc_phone_e164" placeholder="+13524809565" />
              </div>

              <div>
                <Label>Contact email</Label>
                <Input name="fc_email" placeholder="name@example.com" />
              </div>
            </div>
          </div>

          {/* CONSENT */}
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <label className="flex gap-3 text-sm">
              <input type="checkbox" name="consent" required className="mt-1" />
              <span>
                I confirm I have permission to contact this loved one via SMS or
                voice for daily safety check-ins.
              </span>
            </label>

            <input type="hidden" name="consent_ip" value="" />
          </div>

          <Button type="submit" className="w-full">
            Create loved one
          </Button>
        </form>
      </Card>
    </div>
  );
}
