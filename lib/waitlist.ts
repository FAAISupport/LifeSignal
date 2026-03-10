import { env } from '@/lib/env';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const REFERRAL_PRIORITY_BONUS = 3;

export type WaitlistRow = {
  id: string;
  email: string;
  full_name: string;
  interest: string | null;
  use_case: string | null;
  referral_code: string;
  referred_by: string | null;
  referrals_count: number;
  priority_score: number;
  created_at: string;
};

function randomCode(length = 8): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
}

export async function generateUniqueReferralCode(): Promise<string> {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const candidate = randomCode();
    const { data, error } = await supabaseAdmin
      .from('waitlist_entries')
      .select('id')
      .eq('referral_code', candidate)
      .maybeSingle();

    if (error) throw error;
    if (!data) return candidate;
  }

  throw new Error('Unable to generate a unique referral code.');
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function buildReferralLink(referralCode: string): string {
  const url = new URL('/beta', env.siteUrl);
  url.searchParams.set('ref', referralCode);
  return url.toString();
}

export async function findEntryByEmail(email: string): Promise<WaitlistRow | null> {
  const { data, error } = await supabaseAdmin
    .from('waitlist_entries')
    .select('id, email, full_name, interest, use_case, referral_code, referred_by, referrals_count, priority_score, created_at')
    .eq('email', normalizeEmail(email))
    .maybeSingle();

  if (error) throw error;
  return data as WaitlistRow | null;
}

export async function findEntryByReferralCode(referralCode: string): Promise<WaitlistRow | null> {
  const { data, error } = await supabaseAdmin
    .from('waitlist_entries')
    .select('id, email, full_name, interest, use_case, referral_code, referred_by, referrals_count, priority_score, created_at')
    .eq('referral_code', referralCode.trim().toUpperCase())
    .maybeSingle();

  if (error) throw error;
  return data as WaitlistRow | null;
}

export async function getWaitlistPosition(entryId: string): Promise<number> {
  const { data, error } = await supabaseAdmin
    .from('waitlist_entries')
    .select('id, priority_score, created_at')
    .order('priority_score', { ascending: false })
    .order('created_at', { ascending: true });

  if (error) throw error;

  const rows = data ?? [];
  const index = rows.findIndex((row) => row.id === entryId);
  return index === -1 ? rows.length + 1 : index + 1;
}

export async function incrementReferrer(referrerId: string): Promise<void> {
  const { data: referrer, error: referrerError } = await supabaseAdmin
    .from('waitlist_entries')
    .select('referrals_count, priority_score')
    .eq('id', referrerId)
    .single();

  if (referrerError) throw referrerError;

  const { error: updateError } = await supabaseAdmin
    .from('waitlist_entries')
    .update({
      referrals_count: (referrer.referrals_count ?? 0) + 1,
      priority_score: (referrer.priority_score ?? 0) + REFERRAL_PRIORITY_BONUS,
    })
    .eq('id', referrerId);

  if (updateError) throw updateError;
}

export async function createWaitlistEntry(input: {
  fullName: string;
  email: string;
  interest: string;
  useCase?: string;
  referredBy?: string;
}) {
  const existing = await findEntryByEmail(input.email);
  if (existing) {
    const position = await getWaitlistPosition(existing.id);
    return {
      entry: existing,
      position,
      alreadyJoined: true,
    };
  }

  let referrer: WaitlistRow | null = null;
  if (input.referredBy) {
    referrer = await findEntryByReferralCode(input.referredBy);
  }

  const referralCode = await generateUniqueReferralCode();

  const { data, error } = await supabaseAdmin
    .from('waitlist_entries')
    .insert({
      full_name: input.fullName.trim(),
      email: normalizeEmail(input.email),
      interest: input.interest.trim(),
      use_case: input.useCase?.trim() || null,
      referred_by: referrer?.id ?? null,
      referral_code: referralCode,
      referrals_count: 0,
      priority_score: 0,
    })
    .select('id, email, full_name, interest, use_case, referral_code, referred_by, referrals_count, priority_score, created_at')
    .single();

  if (error) throw error;

  if (referrer) {
    await incrementReferrer(referrer.id);
  }

  const entry = data as WaitlistRow;
  const position = await getWaitlistPosition(entry.id);

  return {
    entry,
    position,
    alreadyJoined: false,
  };
}

export async function getWaitlistStatus(email: string) {
  const entry = await findEntryByEmail(email);
  if (!entry) return null;

  const position = await getWaitlistPosition(entry.id);
  return {
    entry,
    position,
  };
}
