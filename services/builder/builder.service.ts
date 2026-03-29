import { supabaseAdmin } from '@/lib/supabase/admin';
import { calculateMonthlyPrice, suggestTier } from '@/lib/pricing';
import { createReferralCode } from '@/lib/referrals';
import type { BuilderSessionPayload } from '@/types/builder';

export async function saveBuilderSession(payload: BuilderSessionPayload) {
  const referralCode = payload.referralCode ?? createReferralCode(payload.profile.churchName);
  const pricing = calculateMonthlyPrice(payload.selectedModules);

  const { data, error } = await supabaseAdmin
    .from('builder_sessions')
    .insert({
      profile: payload.profile,
      pains: payload.pains,
      selected_modules: payload.selectedModules,
      suggested_tier: suggestTier(payload.selectedModules.length),
      monthly_total: pricing.total,
      referral_code: referralCode,
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}
