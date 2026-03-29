import Link from 'next/link';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ChurchModuleCard } from '@/components/builder/ChurchModuleCard';
import { moduleCatalog, planPricing } from '@/lib/churchos/modules';
import { getOrgFeatureAccess, orgHasModuleAccess } from '@/lib/churchos/access';
import { requireOrgContextOrRedirect } from '@/lib/supabase/org';

export default async function BuilderPage() {
  const context = await requireOrgContextOrRedirect();
  const featureAccess = await getOrgFeatureAccess(context.orgId);

  const unlockedCount = moduleCatalog.filter((module) => orgHasModuleAccess(featureAccess, module.key)).length;

  return (
    <DashboardShell title='Builder'>
      <section className='rounded-2xl border bg-white p-6'>
        <h2 className='text-lg font-semibold text-slate-900'>Module Builder</h2>
        <p className='mt-2 text-sm text-slate-600'>
          Plan: <strong className='capitalize'>{featureAccess.plan}</strong> (${planPricing[featureAccess.plan].amountMonthly}/mo)
          {' · '}Unlocked modules: <strong>{unlockedCount}</strong> / {moduleCatalog.length}
        </p>

        <div className='mt-4 flex flex-wrap gap-3'>
          <Link href='/billing' className='rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white'>
            Upgrade plan
          </Link>
          <Link href='/billing' className='rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700'>
            Manage add-ons
          </Link>
        </div>
      </section>

      <section className='mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {moduleCatalog.map((module) => (
          <ChurchModuleCard key={module.key} module={module} unlocked={orgHasModuleAccess(featureAccess, module.key)} />
        ))}
      </section>
    </DashboardShell>
  );
}
