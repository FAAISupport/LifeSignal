import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { createSeniorAndContacts } from "@/app/dashboard/actions";


async function createAction(formData: FormData) {
  "use server";

  // If you want the client IP, you’d normally set it in middleware.
  // For now, keep it optional.
  if (!formData.get("consent_ip")) {
    formData.set("consent_ip", "");
  }

  const res = await createSeniorAndContacts(formData);

  if (!res.ok) {
    redirect("/dashboard/seniors/new?error=" + encodeURIComponent(res.error));
  }

  // After create, go directly to that loved one’s page
  redirect(`/dashboard/seniors/${res.data.seniorId}?created=1`);
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { error?: string; created?: string };
}) {
  // Require auth (don’t show form to logged-out users)
  const sb = await supabaseServer();
  const {
    data: { user },
    error: userErr,
  } = await sb.auth.getUser();

  if (userErr || !user) redirect("/login");

  const errorMsg = typeof searchParams?.error === "string" ? searchParams.error : "";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm text-neutral-600">Add a loved one</div>
          <h1 className="text-2xl font-semibold text-brand-navy">Create a profile</h1>
          <p className="mt-1 text-sm text-neutral-600">
            This takes about 60 seconds. You can fine-tune settings after.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition border border-neutral-200 bg-white hover:bg-neutral-50"
        >
          ← Back to dashboard
        </Link>
      </div>

      <Card>
        <div className="text-sm font-semibold text-brand-navy">Step 1 — Loved one</div>
        <div className="mt-1 text-xs text-neutral-600">Who are we checking on?</div>

        {errorMsg ? (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {errorMsg}
          </div>
        ) : null}

        <form action={createAction} className="mt-5 grid gap-6">
          {/* Loved one */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2 md:col-span-2">
              <Label>Loved one’s name</Label>
              <Input name="senior_name" placeholder="e.g. Mom, Dad, Grandma" required />
            </div>

            <div className="grid gap-2">
              <Label>Phone (E.164 format)</Label>
              <Input name="phone_e164" placeholder="+13525551234" required />
              <div className="text-xs text-neutral-500">
                Must include country code (example: +1…)
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Channel preference</Label>
              <select
                name="channel_pref"
                defaultValue="sms"
                className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm"
              >
                <option value="sms">SMS</option>
                <option value="voice">Voice call</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>

          {/* Schedule */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="text-sm font-semibold text-brand-navy">Step 2 — Daily check-in</div>
            <div className="mt-1 text-xs text-neutral-600">
              What time should we send the daily check-in?
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Timezone</Label>
                <Input name="timezone" defaultValue="America/New_York" required />
                <div className="text-xs text-neutral-500">Example: America/New_York</div>
              </div>

              <div className="grid gap-2">
                <Label>Check-in time (24h)</Label>
                <Input name="checkin_time" defaultValue="09:00" required />
                <div className="text-xs text-neutral-500">Example: 09:00</div>
              </div>
            </div>
          </div>

          {/* Escalation contact */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="text-sm font-semibold text-brand-navy">Step 3 — Escalation contact</div>
            <div className="mt-1 text-xs text-neutral-600">
              If your loved one doesn’t respond, who do we alert?
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="grid gap-2 md:col-span-2">
                <Label>Contact name</Label>
                <Input name="fc_name" placeholder="e.g. Judd, Sarah, John" required />
              </div>

              <div className="grid gap-2">
                <Label>Contact phone (recommended)</Label>
                <Input name="fc_phone_e164" placeholder="+13525551234" />
              </div>

              <div className="grid gap-2">
                <Label>Contact email (optional)</Label>
                <Input name="fc_email" placeholder="name@example.com" />
              </div>

              <div className="md:col-span-2 text-xs text-neutral-500">
                Provide at least a phone or an email. Phone is best for urgent alerts.
              </div>
            </div>
          </div>

          {/* Consent */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <div className="text-sm font-semibold text-brand-navy">Consent</div>
            <div className="mt-1 text-xs text-neutral-600">
              Required for SMS/voice outreach. Keep it simple and compliant.
            </div>

            <label className="mt-4 flex items-start gap-3 text-sm text-neutral-800">
              <input
                type="checkbox"
                name="consent"
                className="mt-1 h-4 w-4 rounded border-neutral-300"
                required
              />
              <span className="leading-relaxed">
                I confirm I have permission to contact this loved one using SMS/voice for daily check-ins and safety alerts.
              </span>
            </label>

            {/* Optional hidden field for IP if you later populate it */}
            <input type="hidden" name="consent_ip" value="" />
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="text-xs text-neutral-500">
              After creation, you’ll land on settings where you can fine-tune everything.
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Create loved one
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
