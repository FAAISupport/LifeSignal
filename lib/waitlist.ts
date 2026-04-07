export type WaitlistJoinInput = {
  name: string;
  email: string;
  phone: string;
  useCase: string;
  notes: string;
  referralCode: string;
};

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function normalizeReferralCode(value: string) {
  return value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function extractReferralCode(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  try {
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      const url = new URL(trimmed);
      const fromRef = url.searchParams.get("ref");
      const fromCode = url.searchParams.get("code");
      return normalizeReferralCode(fromRef || fromCode || "");
    }
  } catch {
    return normalizeReferralCode(trimmed);
  }

  return normalizeReferralCode(trimmed);
}

export function randomReferralCode(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let output = "";

  for (let i = 0; i < length; i += 1) {
    output += chars[Math.floor(Math.random() * chars.length)];
  }

  return output;
}

export function buildReferralLink(origin: string, code: string) {
  return `${origin}/beta?ref=${encodeURIComponent(code)}`;
}

export function maskName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "Anonymous";
  }

  if (parts.length === 1) {
    const first = parts[0];
    return first.length <= 1 ? `${first}*` : `${first[0]}${"*".repeat(Math.min(first.length - 1, 5))}`;
  }

  const first = parts[0];
  const last = parts[parts.length - 1];

  return `${first} ${last[0]}.`;
}

