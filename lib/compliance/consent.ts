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
    .maybeSingle();

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



