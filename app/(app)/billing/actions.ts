'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { requireOrgContext } from '@/lib/supabase/org';
import {
  calculateSubscriptionTotal,
  getModulesForPlan,
  type ChurchAddon,
  type ChurchModuleKey,
  type ChurchPlan,
} from '@/lib/churchos/modules';

function normalizePlan(value: FormDataEntryValue | null): ChurchPlan {
  if (value === 'growth' || value === 'care') {
    return value;
  }

  return 'core';
}

function normalizeAddons(values: FormDataEntryValue[]): ChurchAddon[] {
  return values.filter((value): value is ChurchAddon => value === 'giving' || value === 'sms');
}

export async function simulatePlanCheckoutAction(formData: FormData) {
  const context = await requireOrgContext();
  const supabase = await createServerSupabase();

  const plan = normalizePlan(formData.get('plan'));
  const addons = normalizeAddons(formData.getAll('addons'));
  const pricing = calculateSubscriptionTotal(plan, addons);

  const { data: existingSubscription } = await supabase
    .from('subscriptions')
    .select('id, stripe_customer_id')
    .eq('org_id', context.orgId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const subscriptionPayload = {
    org_id: context.orgId,
    stripe_customer_id: existingSubscription?.stripe_customer_id ?? `sim_customer_${context.orgId}`,
    stripe_subscription_id: existingSubscription?.id
      ? `sim_sub_${existingSubscription.id}`
      : `sim_sub_${context.orgId}_${plan}`,
    status: 'active',
    plan,
    addons,
    amount_monthly: pricing.total,
    currency: 'usd',
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };

  const { error: subscriptionError } = await supabase.from('subscriptions').upsert(subscriptionPayload, {
    onConflict: 'stripe_subscription_id',
  });

  if (subscriptionError) {
    redirect('/billing?error=subscription_update_failed');
  }

  const { error: organizationError } = await supabase
    .from('organizations')
    .update({ plan, status: 'active' })
    .eq('id', context.orgId);

  if (organizationError) {
    redirect('/billing?error=organization_update_failed');
  }

  const moduleKeys = [...getModulesForPlan(plan), ...(addons.includes('giving') ? (['giving'] as ChurchModuleKey[]) : [])];

  await supabase.from('organization_modules').delete().eq('org_id', context.orgId);
  const { error: modulesError } = await supabase
    .from('organization_modules')
    .insert(moduleKeys.map((moduleKey) => ({ org_id: context.orgId, module_key: moduleKey, active: true })));

  if (modulesError) {
    redirect('/billing?error=module_enable_failed');
  }

  revalidatePath('/billing');
  revalidatePath('/dashboard');
  revalidatePath('/members');
  revalidatePath('/checkins');
  revalidatePath('/analytics');

  redirect('/billing?success=plan_updated');
}
