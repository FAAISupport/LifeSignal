"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
};

function isE164(v: string) {
  return /^\+\d{10,15}$/.test(v.trim());
}

export default function NewLovedOneWizard({ action }: Props) {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [err, setErr] = React.useState<string>("");

  // Form state
  const [seniorName, setSeniorName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [channel, setChannel] = React.useState<"sms" | "voice" | "both">("sms");
  const [timezone, setTimezone] = React.useState("America/New_York");
  const [checkinTime, setCheckinTime] = React.useState("09:00");

  const [fcName, setFcName] = React.useState("");
  const [fcPhone, setFcPhone] = React.useState("");
  const [fcEmail, setFcEmail] = React.useState("");
  const [consent, setConsent] = React.useState(false);

  function validateStep1() {
    if (!seniorName.trim()) return "Please enter your loved one’s name.";
    if (!phone.trim()) return "Please enter your loved one’s phone number.";
    if (!isE164(phone)) return "Phone must be in E.164 format (example: +13525551234).";
    if (!timezone.trim()) return "Please enter a timezone (example: America/New_York).";
    if (!checkinTime.trim()) return "Please enter a check-in time (example: 09:00).";
    return "";
  }

  function validateStep2() {
    if (!fcName.trim()) return "Please enter an escalation contact name.";
    if (!fcPhone.trim() && !fcEmail.trim()) return "Please provide at least a phone number or an email for the escalation contact.";
    if (fcPhone.trim() && !isE164(fcPhone)) return "Escalation phone must be in E.164 format (example: +13525551234).";
    if (!consent) return "Consent is required to message/call a loved one.";
    return "";
  }

  function next() {
    const m = validateStep1();
    if (m) {
      setErr(m);
      return;
    }
    setErr("");
    setStep(2);
  }

  function back() {
    setErr("");
    setStep(1);
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-brand-navy">
          Step {step} of 2
        </div>
        <div className="h-2 w-40 overflow-hidden rounded-full bg-neutral-100">
          <div className="h-full bg-brand-navy" style={{ width: step === 1 ? "50%" : "100%" }} />
        </div>
      </div>

      {err ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {err}
        </div>
      ) : null}

      {/* FINAL SUBMIT FORM */}
      <form action={action} className="space-y-6">
        {/* Hidden fields that always post */}
        <input type="hidden" name="channel_pref" value={channel} />
        <input type="hidden" name="timezone" value={timezone} />
        <input type="hidden" name="checkin_time" value={checkinTime} />
        <input type="hidden" name="consent_ip" value="" />

        {step === 1 ? (
          <div className="space-y-6">
            <div>
              <div className="text-sm font-semibold text-brand-navy">Loved one</div>
              <div className="mt-1 text-xs text-neutral-600">Who are we checking in on?</div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label>Name</Label>
                  <Input
                    name="senior_name"
                    value={seniorName}
                    onChange={(e) => setSeniorName(e.target.value)}
                    placeholder="e.g. Mom, Dad, Grandma"
                    required
                  />
                </div>

                <div>
                  <Label>Phone (E.164)</Label>
                  <Input
                    name="phone_e164"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+13525551234"
                    inputMode="tel"
                    pattern="^\+\d{10,15}$"
                    required
                  />
                  <div className="mt-1 text-xs text-neutral-500">
                    Must include country code. Example: +13525551234
                  </div>
                </div>

                <div>
                  <Label>Channel</Label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as any)}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm"
                  >
                    <option value="sms">SMS</option>
                    <option value="voice">Voice call</option>
                    <option value="both">Both</option>
                  </select>
                  <div className="mt-1 text-xs text-neutral-500">
                    You can change this later.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-4">
              <div className="text-sm font-semibold text-brand-navy">Daily check-in</div>
              <div className="mt-1 text-xs text-neutral-600">Time & timezone.</div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Timezone</Label>
                  <Input
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    placeholder="America/New_York"
                    required
                  />
                  <div className="mt-1 text-xs text-neutral-500">Example: America/New_York</div>
                </div>

                <div>
                  <Label>Check-in time (24h)</Label>
                  <Input
                    value={checkinTime}
                    onChange={(e) => setCheckinTime(e.target.value)}
                    placeholder="09:00"
                    required
                  />
                  <div className="mt-1 text-xs text-neutral-500">Example: 09:00</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="text-xs text-neutral-500">Next: escalation contact + consent</div>
              <Button
                type="button"
                onClick={next}
                className="w-full md:w-auto"
              >
                Continue
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-neutral-200 p-4">
              <div className="text-sm font-semibold text-brand-navy">Escalation contact</div>
              <div className="mt-1 text-xs text-neutral-600">
                Who should be notified if there’s no response?
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label>Contact name</Label>
                  <Input
                    name="fc_name"
                    value={fcName}
                    onChange={(e) => setFcName(e.target.value)}
                    placeholder="e.g. Judd, Sarah"
                    required
                  />
                </div>

                <div>
                  <Label>Contact phone (E.164)</Label>
                  <Input
                    name="fc_phone_e164"
                    value={fcPhone}
                    onChange={(e) => setFcPhone(e.target.value)}
                    placeholder="+13525551234"
                    inputMode="tel"
                    pattern="^\+\d{10,15}$"
                  />
                  <div className="mt-1 text-xs text-neutral-500">Optional, but recommended</div>
                </div>

                <div>
                  <Label>Contact email</Label>
                  <Input
                    name="fc_email"
                    value={fcEmail}
                    onChange={(e) => setFcEmail(e.target.value)}
                    placeholder="name@example.com"
                    inputMode="email"
                  />
                  <div className="mt-1 text-xs text-neutral-500">Optional</div>
                </div>

                <div className="md:col-span-2 text-xs text-neutral-500">
                  Provide at least a phone number or an email.
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <div className="text-sm font-semibold text-brand-navy">Consent</div>

              <label className="mt-4 flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  name="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-neutral-300"
                  required
                />
                <span>
                  I confirm I have permission to contact this loved one via SMS/voice for daily safety check-ins.
                </span>
              </label>
            </div>

            <div className="flex flex-col-reverse gap-2 md:flex-row md:items-center md:justify-between">
              <Button type="button" variant="outline" onClick={back} className="w-full md:w-auto">
                Back
              </Button>

              <Button
                type="submit"
                className="w-full md:w-auto"
                onClick={(e) => {
                  const m = validateStep2();
                  if (m) {
                    e.preventDefault();
                    setErr(m);
                  }
                }}
              >
                Create loved one
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
