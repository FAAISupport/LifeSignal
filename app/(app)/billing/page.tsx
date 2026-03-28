import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SubscriptionCard } from '@/components/billing/SubscriptionCard';
import { requireOrgContextOrRedirect } from '@/lib/supabase/org';
import { createServerSupabase } from '@/lib/supabase/server';
import { addonPricing, moduleCatalog, planPricing, type ChurchAddon, type ChurchPlan } from '@/lib/churchos/modules';
import { simulatePlanCheckoutAction } from './actions';

const planOrder: ChurchPlan[] = ['core', 'growth', 'care'];
const addonOrder: ChurchAddon[] = ['giving', 'sms'];

interface BillingPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function BillingPage({ searchParams }: BillingPageProps) {
  const context = await requireOrgContextOrRedirect();
  const supabase = await createServerSupabase();

  const [{ data: subscription }, { data: activeModules }] = await Promise.all([
    supabase
      .from('subscriptions')
      .select('plan, status, amount_monthly, addons')
      .eq('org_id', context.orgId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase.from('organization_modules').select('module_key').eq('org_id', context.orgId).eq('active', true),
  ]);

  const activePlan = (subscription?.plan as ChurchPlan | undefined) ?? 'core';
  const activeAddons = Array.isArray(subscription?.addons) ? (subscription.addons as ChurchAddon[]) : [];
  const enabledModules = (activeModules ?? []).map((row) => row.module_key);

  const params = (await searchParams) ?? {};
  const successCode = Array.isArray(params.success) ? params.success[0] : params.success;
  const errorCode = Array.isArray(params.error) ? params.error[0] : params.error;

  return (
    <DashboardShell title='Billing'>
      <div className='space-y-6'>
        {successCode ? (
          <p className='rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700'>
            Billing updated successfully. Plan and module access are now active.
          </p>
        ) : null}

        {errorCode ? (
          <p className='rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
            Could not update subscription: {errorCode}
          </p>
        ) : null}

        <SubscriptionCard
          subscription={{
            plan: activePlan,
            status: subscription?.status ?? 'inactive',
            amount_monthly: subscription?.amount_monthly ?? planPricing[activePlan].amountMonthly,
            addons: activeAddons,
          }}
        />

        <section className='rounded-2xl border bg-white p-6'>
          <h2 className='text-lg font-semibold'>Change plan</h2>
          <p className='mt-2 text-sm text-slate-600'>Simulated checkout for Phase 2. Stripe webhook wiring will finalize in next phase.</p>

          <form action={simulatePlanCheckoutAction} className='mt-5 space-y-6'>
            <div className='grid gap-4 lg:grid-cols-3'>
              {planOrder.map((plan) => (
                <label
                  key={plan}
                  className='flex cursor-pointer flex-col rounded-xl border border-slate-200 p-4 hover:border-indigo-400'
                >
                  <div className='flex items-center justify-between'>
                    <span className='font-semibold text-slate-900'>{planPricing[plan].label}</span>
                    <input type='radio' name='plan' value={plan} defaultChecked={plan === activePlan} />
                  </div>
                  <span className='mt-2 text-sm text-slate-600'>${planPricing[plan].amountMonthly}/month</span>
                </label>
              ))}
            </div>

            <div>
              <h3 className='text-sm font-semibold text-slate-900'>Add-ons</h3>
              <div className='mt-3 grid gap-3 lg:grid-cols-2'>
                {addonOrder.map((addon) => (
                  <label key={addon} className='flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3'>
                    <div>
                      <p className='font-medium text-slate-900'>{addonPricing[addon].label}</p>
                      <p className='text-sm text-slate-600'>+${addonPricing[addon].amountMonthly}/month</p>
                    </div>
                    <input type='checkbox' name='addons' value={addon} defaultChecked={activeAddons.includes(addon)} />
                  </label>
                ))}
              </div>
            </div>

            <button type='submit' className='rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white'>
              Simulate checkout + activate plan
            </button>
          </form>
        </section>

        <section className='rounded-2xl border bg-white p-6'>
          <h2 className='text-lg font-semibold'>Active module access</h2>
          <div className='mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
            {moduleCatalog.map((module) => {
              const unlocked = enabledModules.includes(module.key);

              return (
                <article
                  key={module.key}
                  className={`rounded-xl border p-4 ${unlocked ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}
                >
                  <p className='text-sm font-semibold text-slate-900'>{module.name}</p>
                  <p className='mt-1 text-xs text-slate-600'>{module.subtitle}</p>
                  <p className='mt-2 text-xs font-medium text-slate-700'>
                    {unlocked ? 'Unlocked' : `Locked · Available in ${module.availableIn.join(', ')}`}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
