import { redirect } from 'next/navigation';
import { createOrganizationAction } from './actions';
import { getOrgContext } from '@/lib/supabase/org';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

const errorMessages: Record<string, string> = {
  invalid_org_fields: 'Please provide a valid church name and workspace slug.',
  slug_taken: 'This workspace slug is already taken. Please choose another one.',
  org_create_failed: 'Could not create organization workspace. Please try again.',
  membership_create_failed: 'Workspace created, but membership setup failed. Please retry.',
};

interface OnboardingPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const context = await getOrgContext();

  if (context) {
    redirect('/dashboard');
  }

  const params = (await searchParams) ?? {};
  const errorCode = Array.isArray(params.error) ? params.error[0] : params.error;
  const errorMessage = errorCode ? errorMessages[errorCode] : null;

  return (
    <DashboardShell title='Create Your ChurchOS Workspace'>
      <div className='grid gap-6 lg:grid-cols-[1.2fr_1fr]'>
        <section className='rounded-2xl border bg-white p-6'>
          <h2 className='text-lg font-semibold text-slate-900'>Phase 1 Setup</h2>
          <p className='mt-2 text-sm text-slate-600'>
            Start by creating your church workspace. You will invite staff, choose billing, and enable modules in the
            next phases.
          </p>

          {errorMessage ? (
            <p className='mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700'>{errorMessage}</p>
          ) : null}

          <form action={createOrganizationAction} className='mt-6 space-y-4'>
            <div className='space-y-2'>
              <label htmlFor='name' className='text-sm font-medium text-slate-700'>
                Church name
              </label>
              <input
                id='name'
                name='name'
                required
                placeholder='Grace Community Church'
                className='w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring'
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='slug' className='text-sm font-medium text-slate-700'>
                Workspace slug
              </label>
              <input
                id='slug'
                name='slug'
                required
                placeholder='grace-community'
                className='w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring'
              />
              <p className='text-xs text-slate-500'>Used in URLs and internal tenant routing.</p>
            </div>

            <button type='submit' className='rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white'>
              Create workspace
            </button>
          </form>
        </section>

        <section className='rounded-2xl border bg-white p-6'>
          <h3 className='text-sm font-semibold uppercase tracking-wide text-indigo-700'>What happens next</h3>
          <ol className='mt-3 space-y-3 text-sm text-slate-700'>
            <li>1. Choose your ChurchOS plan (Core, Growth, Care).</li>
            <li>2. Enable modules for members, events, care, and LifeSignal.</li>
            <li>3. Invite pastors, admins, and volunteers with role-based access.</li>
            <li>4. Configure billing and onboarding automations.</li>
          </ol>
        </section>
      </div>
    </DashboardShell>
  );
}
