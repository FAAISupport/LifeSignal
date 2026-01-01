export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { createSeniorAndContacts } from "@/app/dashboard/actions";

function clean(s: unknown) {
  return String(s ?? "").trim();
}

async function createLovedOneAction(formData: FormData) {
  "use server";

  // Auth guard
  const sb = await supabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();

  if (!user) {
    redirect(`/login?next=${encodeURIComponent("/dashboard/seniors/new")}`);
  }

  const seniorName = clean(formData.get("senior_name"));
  const phone = clean(formData.get("phone_e164"));
  const timezone = clean(formData.get("timezone")) || "America/New_York";
  const checkinTime = clean(formData.get("checkin_time")) || "09:00";
  const channelPref = clean(formData.get("channel_pref")) || "sms";

  const fcName = clean(formData.get("fc_name"));
  const fcPhone = clean(formData.get("fc_phone_e164"));
  const fcEmail = clean(formData.get("fc_email"));
  const consent = formData.get("consent") === "on";

  // Friendly validation → redirect back with error message
  if (!seniorName) {
    redirect(
      `/dashboard/seniors/new?error=${encodeURIComponent(
        "Loved one name is required."
      )}`
    );
  }
  if (!phone) {
    redirect(
      `/dashboard/seniors/new?error=${encodeURIComponent(
        "Loved one phone number is required."
      )}`
    );
  }
  if (!phone.startsWith("+")) {
    redirect(
      `/dashboard/seniors/new?error=${encodeURIComponent(
        "Phone number must be E.164 format and start with + (example: +13525551234)."
      )}`
    );
  }
  if (!consent) {
    redirect(
      `/dashboard/seniors/new?error=${encodeURIComponent(
        "Consent is required before we can send check-ins."
      )}`
    );
  }
  if (!checkinTime || !/^\d{2}:\d{2}$/.test(checkinTime)) {
    redirect(
      `/dashboard/seniors/new?error=${encodeURIComponent(
        "Check-in time must be HH:MM (example: 09:00)."
      )}`
    );
  }
  if (!["sms", "voice", "both"].includes(channelPref)) {
    redirect(
      `/dashboard/seniors/new?error=${encodeURIComponent(
        "Channel preference must be SMS, Voice, or Both."
      )}`
    );
  }

  // Normalize fields for the existing action (it expects these names)
  formData.set("senior_name", seniorName);
  formData.set("phone_e164", phone);
  formData.set("timezone", timezone);
  formData.set("checkin_time", checkinTime);
  formData.set("channel_pref", channelPref);

  formData.set("fc_name", fcName);
  formData.set("fc_phone_e164", fcPhone);
  formData.set("fc_email", fcEmail);

  // actions.ts expects consent_ip; safe blank
  if (!formData.get("consent_ip")) formData.set("consent_ip", "");

  // IMPORTANT: unwrap ActionResult<{seniorId, inviteUrl}>
  const result = await createSeniorAndContacts(formData);

  if (result && typeof result === "object" && "ok" in result) {
    if (result.ok) {
      const seniorId = result.data?.seniorId;
      if (!seniorId) {
        redirect(
          `/dashboard/seniors/new?error=${encodeURIComponent(
            "Created loved one, but missing seniorId in response."
          )}`
        );
      }
      redirect(
        `/dashboard/seniors/${encodeURIComponent(String(seniorId))}?created=1`
      );
    } else {
      redirect(
        `/dashboard/seniors/new?error=${encodeURIComponent(
          result.error || "Failed to create loved one."
        )}`
      );
    }
  }

  // Fallback if the action ever changes shape
  redirect(
    `/dashboard/seniors/new?error=${encodeURIComponent(
      "Unexpected response while creating loved one."
    )}`
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const errorMsg =
    typeof searchParams?.error === "string" ? searchParams.error : "";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm text-neutral-600">Add a loved one</div>
          <h1 className="mt-2 text-3xl font-semibold text-brand-navy">
            Create a profile
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Two quick steps. You can adjust details after creation.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold transition hover:bg-neutral-50"
        >
          ← Back to dashboard
        </Link>
      </div>

      {errorMsg ? (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-900">
          {errorMsg}
        </div>
      ) : null}

      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-brand-navy">
              Step 1 of 2
            </div>
            <div className="mt-1 text-xs text-neutral-600">
              Loved one details
            </div>
          </div>

          <div className="h-2 w-40 overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full w-1/2 bg-brand-navy" />
          </div>
        </div>

        <form action={createLovedOneAction} className="mt-6 grid gap-6">
          {/* Loved one */}
          <div>
            <div className="text-sm font-semibold text-brand-navy">Loved one</div>
            <div className="mt-1 text-xs text-neutral-600">
              Who are we checking in on?
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-1">
                <Label>Name</Label>
                <Input
                  name="senior_name"
                  placeholder="e.g. Mom, Dad, Grandma"
                  required
                />
              </div>

              <div className="md:col-span-1">
                <Label>Phone (E.164)</Label>
                <Input name="phone_e164" placeholder="+13525551234" required />
                <div className="mt-1 text-xs text-neutral-500">
                  Must include country code. Example: +13525551234
                </div>
              </div>
            </div>
          </div>

          {/* Check-in preferences */}
          <div>
            <div className="text-sm font-semibold text-brand-navy">
              Step 2 of 2
            </div>
            <div className="mt-1 text-xs text-neutral-600">
              Check-in preferences (you can edit later)
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="md:col-span-1">
                <Label>Timezone</Label>
                <Input
                  name="timezone"
                  defaultValue="America/New_York"
                  placeholder="America/New_York"
                  required
                />
                <div className="mt-1 text-xs text-neutral-500">
                  Example: America/New_York
                </div>
              </div>

              <div className="md:col-span-1">
                <Label>Daily check-in time</Label>
                <Input
                  name="checkin_time"
                  defaultValue="09:00"
                  placeholder="09:00"
                  required
                />
                <div className="mt-1 text-xs text-neutral-500">
                  24h format (HH:MM)
                </div>
              </div>

              <div className="md:col-span-1">
                <Label>Channel</Label>
                <select
                  name="channel_pref"
                  defaultValue="sms"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="sms">SMS</option>
                  <option value="voice">Voice</option>
                  <option value="both">Both</option>
                </select>
                <div className="mt-1 text-xs text-neutral-500">
                  “Both” is most reliable
                </div>
              </div>
            </div>
          </div>

          {/* Escalation contact (optional for now) */}
          <div>
            <div className="text-sm font-semibold text-brand-navy">
              Escalation contact (optional)
            </div>
            <div className="mt-1 text-xs text-neutral-600">
              Who should be notified if a check-in is missed?
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="md:col-span-1">
                <Label>Name</Label>
                <Input name="fc_name" placeholder="e.g. Sarah (daughter)" />
              </div>
              <div className="md:col-span-1">
                <Label>Phone (E.164)</Label>
                <Input name="fc_phone_e164" placeholder="+13525551234" />
              </div>
              <div className="md:col-span-1">
                <Label>Email</Label>
                <Input
                  name="fc_email"
                  type="email"
                  placeholder="sarah@email.com"
                />
              </div>
            </div>
          </div>

          {/* Consent */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="text-sm font-semibold text-brand-navy">
              Consent-first messaging
            </div>
            <div className="mt-1 text-xs text-neutral-600">
              You confirm you have permission to send messages/calls to this
              number.
            </div>

            <label className="mt-3 flex items-start gap-3 text-sm text-neutral-700">
              <input
                type="checkbox"
                name="consent"
                className="mt-1 h-4 w-4 rounded border-neutral-300"
                required
              />
              <span>
                I confirm that I have consent to send LifeSignal check-ins to
                this phone number, and I understand message and data rates may
                apply.
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-xs text-neutral-500">
              After creation, you’ll be taken to the loved one page where you
              can send a test check-in.
            </div>

            <Button type="submit">Create loved one</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
