import crypto from "crypto";

export function normalizeInboundText(input: string | null | undefined) {
  return (input || "").trim().toLowerCase();
}

export function parseTwilioFormBody(raw: string) {
  const params = new URLSearchParams(raw);
  const result: Record<string, string> = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }

  return result;
}

export function getE164Candidates(phone: string | null | undefined) {
  const value = (phone || "").trim();
  if (!value) return [];

  const digits = value.replace(/\D/g, "");
  const candidates = new Set<string>();

  if (value.startsWith("+")) {
    candidates.add(value);
  }

  if (digits.length === 10) {
    candidates.add(`+1${digits}`);
    candidates.add(digits);
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    candidates.add(`+${digits}`);
    candidates.add(digits);
  }

  candidates.add(value);
  return Array.from(candidates);
}

export function matchKeyword(message: string, keywords: string[]) {
  const normalized = normalizeInboundText(message);
  return keywords.some((keyword) => normalized === keyword.trim().toLowerCase());
}

export function containsKeyword(message: string, keywords: string[]) {
  const normalized = normalizeInboundText(message);
  return keywords.some((keyword) => normalized.includes(keyword.trim().toLowerCase()));
}

export function generateWebhookReceiptId() {
  return `twilio_${crypto.randomUUID().replace(/-/g, "").slice(0, 18)}`;
}
