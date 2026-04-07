$script = @'
$ErrorActionPreference = "Stop"

function Write-FileUtf8NoBom {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][string]$Content
  )

  $dir = Split-Path -Parent $Path
  if ($dir -and -not (Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
  Write-Host "Created $Path"
}

$migration = @'
create extension if not exists pgcrypto;

create table if not exists public.message_consent_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  phone_e164 text not null,
  email text null,
  full_name text null,
  source text not null check (source in ('website','beta_form','caregiver_enrollment','manual_admin','inbound_sms','voice_opt_in')),
  status text not null check (status in ('opted_in','opted_out','help_requested','pending')),
  channel text not null check (channel in ('sms','voice','both')) default 'both',
  consent_text text not null,
  consent_version text not null default 'v1',
  consent_url text null,
  ip_address inet null,
  user_agent text null,
  form_path text null,
  referrer text null,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists idx_message_consent_logs_phone on public.message_consent_logs (phone_e164);
create index if not exists idx_message_consent_logs_created_at on public.message_consent_logs (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_message_consent_logs_updated_at on public.message_consent_logs;
create trigger trg_message_consent_logs_updated_at
before update on public.message_consent_logs
for each row
execute function public.set_updated_at();

create or replace view public.current_message_consent as
with ranked as (
  select
    mcl.*,
    row_number() over (
      partition by mcl.phone_e164
      order by mcl.created_at desc, mcl.id desc
    ) as rn
  from public.message_consent_logs mcl
)
select
  id,
  created_at,
  updated_at,
  phone_e164,
  email,
  full_name,
  source,
  status,
  channel,
  consent_text,
  consent_version,
  consent_url,
  ip_address,
  user_agent,
  form_path,
  referrer,
  metadata
from ranked
where rn = 1;

alter table public.message_consent_logs enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'message_consent_logs'
      and policyname = 'service_role_full_access_message_consent_logs'
  ) then
    create policy service_role_full_access_message_consent_logs
      on public.message_consent_logs
      for all
      to service_role
      using (true)
      with check (true);
  end if;
end
$$;
'@

$consentLib = @'
import { createClient } from "@supabase/supabase-js";

export const CONSENT_VERSION = "v1";
export const CONSENT_URL = "https://lifesignal.app/consent";
export const CONSENT_TEXT =
  "I agree to receive transactional SMS and/or voice safety check-ins, reminders, and caregiver notifications from LifeSignal. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.";

type ConsentStatus = "opted_in" | "opted_out" | "help_requested" | "pending";
type ConsentSource =
  | "website"
  | "beta_form"
  | "caregiver_enrollment"
  | "manual_admin"
  | "inbound_sms"
  | "voice_opt_in";

type ConsentChannel = "sms" | "voice" | "both";

export type RecordConsentInput = {
  phoneE164: string;
  email?: string | null;
  fullName?: string | null;
  source: ConsentSource;
  status: ConsentStatus;
  channel?: ConsentChannel;
  ipAddress?: string | null;
  userAgent?: string | null;
  formPath?: string | null;
  referrer?: string | null;
  metadata?: Record<string, unknown>;
};

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function normalizePhone(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Phone number is required.");
  }

  if (trimmed.startsWith("+")) {
    return `+${trimmed.slice(1).replace(/\D/g, "")}`;
  }

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  throw new Error("Phone number must be valid E.164 or a 10-digit US number.");
}

export function normalizeIncomingKeyword(input: string): string {
  return input.trim().toUpperCase();
}

export async function recordConsent(input: RecordConsentInput) {
  const supabase = createClient(
    getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );

  const payload = {
    phone_e164: normalizePhone(input.phoneE164),
    email: input.email ?? null,
    full_name: input.fullName ?? null,
    source: input.source,
    status: input.status,
    channel: input.channel ?? "both",
    consent_text: CONSENT_TEXT,
    consent_version: CONSENT_VERSION,
    consent_url: CONSENT_URL,
    ip_address: input.ipAddress ?? null,
    user_agent: input.userAgent ?? null,
    form_path: input.formPath ?? null,
    referrer: input.referrer ?? null,
    metadata: input.metadata ?? {},
  };

  const { data, error } = await supabase
    .from("message_consent_logs")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to record consent: ${error.message}`);
  }

  return data;
}

export async function getCurrentConsent(phone: string) {
  const supabase = createClient(
    getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );

  const normalized = normalizePhone(phone);

  const { data, error } = await supabase
    .from("current_message_consent")
    .select("*")
    .eq("phone_e164", normalized)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch consent: ${error.message}`);
  }

  return data;
}

export async function hasActiveMessagingConsent(phone: string): Promise<boolean> {
  const current = await getCurrentConsent(phone);
  return !!current && current.status === "opted_in";
}

export function getTwilioComplianceReply(keyword: string): string | null {
  switch (normalizeIncomingKeyword(keyword)) {
    case "STOP":
    case "STOPALL":
    case "UNSUBSCRIBE":
    case "CANCEL":
    case "END":
    case "QUIT":
      return "You have successfully opted out of LifeSignal messages. You will receive no further messages unless you opt back in by replying START.";
    case "START":
    case "UNSTOP":
      return "You have successfully opted back in to LifeSignal safety messages. Reply HELP for help or STOP to opt out.";
    case "HELP":
      return "LifeSignal: Daily safety check-ins and reminders. Reply YES to confirm safety. Reply STOP to opt out. Support: https://lifesignal.app";
    default:
      return null;
  }
}

export async function syncInboundKeywordConsent(phone: string, keyword: string) {
  const normalized = normalizeIncomingKeyword(keyword);

  if (["STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT"].includes(normalized)) {
    await recordConsent({
      phoneE164: phone,
      source: "inbound_sms",
      status: "opted_out",
      channel: "sms",
      metadata: { keyword: normalized },
    });
    return "opted_out" as const;
  }

  if (["START", "UNSTOP"].includes(normalized)) {
    await recordConsent({
      phoneE164: phone,
      source: "inbound_sms",
      status: "opted_in",
      channel: "sms",
      metadata: { keyword: normalized },
    });
    return "opted_in" as const;
  }

  if (normalized === "HELP") {
    await recordConsent({
      phoneE164: phone,
      source: "inbound_sms",
      status: "help_requested",
      channel: "sms",
      metadata: { keyword: normalized },
    });
    return "help_requested" as const;
  }

  return null;
}
'@

$guard = @'
import { hasActiveMessagingConsent } from "@/lib/compliance/consent";

export async function assertMessagingConsentOrThrow(phone: string) {
  const ok = await hasActiveMessagingConsent(phone);

  if (!ok) {
    throw new Error(`Blocked outbound message. No active messaging consent for ${phone}.`);
  }
}

export async function canSendLifecycleMessage(phone: string): Promise<boolean> {
  return hasActiveMessagingConsent(phone);
}
'@

$consentRoute = @'
import { NextRequest, NextResponse } from "next/server";
import { recordConsent } from "@/lib/compliance/consent";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const forwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() ?? null;
    const userAgent = req.headers.get("user-agent");

    const result = await recordConsent({
      phoneE164: body.phone,
      email: body.email ?? null,
      fullName: body.fullName ?? null,
      source: body.source ?? "website",
      status: body.status ?? "opted_in",
      channel: body.channel ?? "both",
      ipAddress,
      userAgent,
      formPath: body.formPath ?? "/beta",
      referrer: req.headers.get("referer"),
      metadata: body.metadata ?? {},
    });

    return NextResponse.json({ ok: true, consent: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
'@

$checkbox = @'
"use client";

type ComplianceCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
};

export default function ComplianceCheckbox({
  checked,
  onChange,
  id = "messaging-consent",
}: ComplianceCheckboxProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300"
          required
        />
        <span className="text-sm leading-6 text-slate-700">
          I agree to receive transactional SMS and/or voice safety check-ins, reminders,
          and caregiver notifications from LifeSignal. Message frequency varies. Msg &amp;
          data rates may apply. Reply STOP to opt out and HELP for help. View our{" "}
          <a className="font-medium underline" href="/consent">Consent Policy</a>,{" "}
          <a className="font-medium underline" href="/privacy">Privacy Policy</a>, and{" "}
          <a className="font-medium underline" href="/terms">Terms</a>.
        </span>
      </label>
    </div>
  );
}
'@

$consentPage = @'
export default function ConsentPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">LifeSignal Consent &amp; Opt-In Policy</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">
          LifeSignal provides transactional safety monitoring messages for seniors,
          caregivers, and individuals who want structured wellness check-ins.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">How users opt in</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Submitting a LifeSignal form on our website</li>
            <li>Being enrolled by a caregiver, family member, or authorized organization</li>
            <li>Providing express consent during onboarding</li>
            <li>Replying START after previously opting out</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Message types</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Daily wellness and safety check-ins</li>
            <li>Medication and recovery reminders</li>
            <li>Missed check-in alerts to designated caregivers</li>
            <li>Operational account notifications related to the service</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Frequency</h2>
          <p className="text-slate-700">
            Message frequency varies based on the user's care plan, schedule,
            reminder settings, and escalation rules.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Opt-out instructions</h2>
          <p className="text-slate-700">
            Users may opt out of SMS messages at any time by replying STOP.
            Users may opt back in by replying START.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Help</h2>
          <p className="text-slate-700">
            For help, reply HELP to any LifeSignal message or visit{" "}
            <a className="font-medium underline" href="https://lifesignal.app">
              https://lifesignal.app
            </a>.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">No marketing or promotional messaging</h2>
          <p className="text-slate-700">
            LifeSignal messaging is strictly transactional and service-related.
            We do not use this channel for promotional campaigns.
          </p>
        </section>

        <p className="mt-12 text-sm text-slate-500">Last updated: March 24, 2026</p>
      </div>
    </main>
  );
}
'@

$privacyPage = @'
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 leading-7 text-slate-700">
          LifeSignal collects only the information reasonably necessary to deliver
          safety check-ins, reminders, caregiver notifications, and account support.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Information we collect</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Name, phone number, and email address</li>
            <li>Check-in preferences and reminder schedules</li>
            <li>Consent records, timestamps, and support interactions</li>
            <li>Technical data such as IP address, device, and browser information</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">How we use information</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Operate the LifeSignal service</li>
            <li>Send transactional safety and reminder messages</li>
            <li>Notify designated caregivers or responders when configured</li>
            <li>Maintain security, compliance, and audit records</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">SMS and voice privacy</h2>
          <p className="text-slate-700">
            Consent to receive SMS or voice communications is used only for
            transactional and operational purposes related to LifeSignal services.
            Message frequency varies. Msg &amp; data rates may apply.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Data sharing</h2>
          <p className="text-slate-700">
            We do not sell personal information. We may share information with service
            providers that support platform operations, communications delivery, hosting,
            analytics, fraud prevention, or legal compliance.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Your choices</h2>
          <p className="text-slate-700">
            You may opt out of SMS at any time by replying STOP. For assistance, reply
            HELP or contact us through our website.
          </p>
        </section>

        <p className="mt-12 text-sm text-slate-500">Last updated: March 24, 2026</p>
      </div>
    </main>
  );
}
'@

$termsPage = @'
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">Terms &amp; Conditions</h1>
        <p className="mt-4 leading-7 text-slate-700">
          By using LifeSignal, you agree to these terms for access to safety
          check-ins, reminders, caregiver notifications, and related platform features.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Service nature</h2>
          <p className="text-slate-700">
            LifeSignal is a monitoring and notification service. It is not emergency
            dispatch, medical advice, or a replacement for calling 911 or local emergency services.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Messaging consent</h2>
          <p className="text-slate-700">
            By opting in, you agree to receive transactional SMS and/or voice messages
            related to safety check-ins, reminders, caregiver alerts, and service operations.
            Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out
            and HELP for help.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">User responsibilities</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Provide accurate enrollment and contact information</li>
            <li>Keep caregiver and emergency contact details current</li>
            <li>Use the service lawfully and with proper authorization</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Availability</h2>
          <p className="text-slate-700">
            Delivery of text or voice communications may depend on carrier networks,
            connectivity, third-party providers, and device availability.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Limitation of liability</h2>
          <p className="text-slate-700">
            To the maximum extent allowed by law, LifeSignal is provided on an as-available
            basis without guarantees of uninterrupted delivery or emergency intervention.
          </p>
        </section>

        <p className="mt-12 text-sm text-slate-500">Last updated: March 24, 2026</p>
      </div>
    </main>
  );
}
'@

$twilioRoute = @'
import { NextRequest } from "next/server";
import {
  getTwilioComplianceReply,
  syncInboundKeywordConsent,
} from "@/lib/compliance/consent";

function xml(message: string) {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(message)}</Message></Response>`,
    {
      status: 200,
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    }
  );
}

function escapeXml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const from = String(formData.get("From") ?? "");
  const body = String(formData.get("Body") ?? "").trim();

  const complianceReply = getTwilioComplianceReply(body);

  if (complianceReply) {
    await syncInboundKeywordConsent(from, body);
    return xml(complianceReply);
  }

  return xml("LifeSignal received your message. If this is a safety check-in, reply YES. Reply HELP for help or STOP to opt out.");
}
'@

$readme = @'
# LifeSignal Compliance Stack

## Files added
- app/consent/page.tsx
- app/privacy/page.tsx
- app/terms/page.tsx
- app/api/consent/record/route.ts
- app/api/twilio/compliance/route.ts
- components/forms/ComplianceCheckbox.tsx
- lib/compliance/consent.ts
- lib/compliance/guards.ts
- supabase/migrations/20260324_lifesignal_compliance.sql

## Required env vars
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

## Next steps
1. Run your Supabase migration.
2. Add ComplianceCheckbox to your beta or signup form.
3. On successful form submit, POST to /api/consent/record.
4. Point Twilio inbound SMS webhook to /api/twilio/compliance if you want centralized STOP/START/HELP handling.
5. Before sending scheduled outbound SMS, call assertMessagingConsentOrThrow(phone).
'@

Write-FileUtf8NoBom -Path "supabase/migrations/20260324_lifesignal_compliance.sql" -Content $migration
Write-FileUtf8NoBom -Path "lib/compliance/consent.ts" -Content $consentLib
Write-FileUtf8NoBom -Path "lib/compliance/guards.ts" -Content $guard
Write-FileUtf8NoBom -Path "app/api/consent/record/route.ts" -Content $consentRoute
Write-FileUtf8NoBom -Path "components/forms/ComplianceCheckbox.tsx" -Content $checkbox
Write-FileUtf8NoBom -Path "app/consent/page.tsx" -Content $consentPage
Write-FileUtf8NoBom -Path "app/privacy/page.tsx" -Content $privacyPage
Write-FileUtf8NoBom -Path "app/terms/page.tsx" -Content $termsPage
Write-FileUtf8NoBom -Path "app/api/twilio/compliance/route.ts" -Content $twilioRoute
Write-FileUtf8NoBom -Path "LIFESIGNAL_COMPLIANCE_STACK_README.md" -Content $readme

Write-Host ""
Write-Host "✅ LifeSignal compliance stack created."
'@

[System.IO.File]::WriteAllText((Join-Path $PWD "build-lifesignal-compliance-stack.ps1"), $script, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Created ./build-lifesignal-compliance-stack.ps1"
