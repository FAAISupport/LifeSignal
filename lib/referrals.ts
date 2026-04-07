export function normalizeReferralCode(value?: string | null): string | null {
  if (!value) return null

  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")

  return normalized.length ? normalized : null
}

export function generateReferralLink(referralCode: string, baseUrl?: string): string {
  const origin =
    baseUrl ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"

  const code = normalizeReferralCode(referralCode) || referralCode
  return `${origin.replace(/\/$/, "")}/?ref=${encodeURIComponent(code)}`
}

export async function persistReferralAttribution(...args: any[]): Promise<void> {
  let supabase: any = null
  let payload: Record<string, any> | null = null

  if (args.length >= 2) {
    supabase = args[0]
    payload = args[1]
  } else if (args.length === 1) {
    payload = args[0]
  }

  if (!payload) return

  const referralCode = normalizeReferralCode(
    payload.referralCode ?? payload.referral_code ?? payload.ref ?? null
  )

  if (!referralCode) return

  if (!supabase || typeof supabase.from !== "function") {
    return
  }

  const row = {
    referral_code: referralCode,
    organization_id: payload.organizationId ?? payload.organization_id ?? null,
    user_id: payload.userId ?? payload.user_id ?? null,
    email: payload.email ?? null,
    source: payload.source ?? "builder",
    metadata: payload.metadata ?? {},
    created_at: new Date().toISOString(),
  }

  for (const table of ["referral_attributions", "referrals"]) {
    try {
      const result = await supabase.from(table).insert(row)
      if (!result?.error) return
    } catch {
    }
  }
}

