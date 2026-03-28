import Link from 'next/link';
import { getOrgContext } from '@/lib/supabase/org';
import { getOrgFeatureAccess, orgHasModuleAccess } from '@/lib/churchos/access';
import type { ChurchModuleKey } from '@/lib/churchos/modules';

const navItems: Array<{ label: string; href: string; moduleKey?: ChurchModuleKey }> = [
  { label: 'dashboard', href: '/dashboard' },
  { label: 'members', href: '/members', moduleKey: 'members' },
  { label: 'checkins', href: '/checkins', moduleKey: 'lifesignal' },
  { label: 'incidents', href: '/incidents', moduleKey: 'care' },
  { label: 'analytics', href: '/analytics', moduleKey: 'analytics' },
  { label: 'team', href: '/team' },
  { label: 'billing', href: '/billing' },
  { label: 'settings', href: '/settings' },
];

export async function DashboardShell({ title, children }: { title: string; children: React.ReactNode }) {
  const orgContext = await getOrgContext();
  const featureAccess = orgContext ? await getOrgFeatureAccess(orgContext.orgId) : null;

  return (
    <main className='min-h-screen bg-slate-50'>
      <nav className='border-b bg-white'>
        <div className='mx-auto flex max-w-7xl flex-wrap gap-4 px-6 py-4 text-sm'>
          {navItems.map((item) => {
            const locked = item.moduleKey && featureAccess ? !orgHasModuleAccess(featureAccess, item.moduleKey) : false;

            return (
              <Link
                key={item.label}
                className={`capitalize ${locked ? 'text-slate-400' : 'text-slate-700 hover:text-indigo-700'}`}
                href={locked ? '/billing' : item.href}
              >
                {item.label}
                {locked ? ' 🔒' : ''}
              </Link>
            );
          })}
        </div>
      </nav>
      <div className='mx-auto max-w-7xl p-6'>
        <h1 className='mb-6 text-2xl font-semibold'>{title}</h1>
        {children}
      </div>
    </main>
  );
}
