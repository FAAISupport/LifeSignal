import { createServerSupabase } from '@/lib/supabase/server';
import type { ChurchAddon, ChurchModuleKey, ChurchPlan } from '@/lib/churchos/modules';
import { getModulesForPlan, hasAccess } from '@/lib/churchos/modules';

export interface OrgFeatureAccess {
  plan: ChurchPlan;
  addons: ChurchAddon[];
  enabledModules: ChurchModuleKey[];
}

export async function getOrgFeatureAccess(orgId: string): Promise<OrgFeatureAccess> {
  const supabase = await createServerSupabase();

  const [{ data: subscription }, { data: explicitModules }] = await Promise.all([
    supabase
      .from('subscriptions')
      .select('plan, addons')
      .eq('org_id', orgId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase.from('organization_modules').select('module_key').eq('org_id', orgId).eq('active', true),
  ]);

  const plan = (subscription?.plan as ChurchPlan | undefined) ?? 'core';
  const addons = Array.isArray(subscription?.addons) ? (subscription.addons as ChurchAddon[]) : [];
  const enabledModules = (explicitModules ?? []).map((row) => row.module_key as ChurchModuleKey);

  return {
    plan,
    addons,
    enabledModules,
  };
}

export function orgHasModuleAccess(state: OrgFeatureAccess, moduleKey: ChurchModuleKey) {
  return hasAccess({
    plan: state.plan,
    addons: state.addons,
    enabledModules: [...getModulesForPlan(state.plan), ...state.enabledModules],
    moduleKey,
  });
}
