import Link from 'next/link';

export function LockedModuleState({ moduleName }: { moduleName: string }) {
  return (
    <div className='rounded-2xl border border-amber-200 bg-amber-50 p-6'>
      <h2 className='text-lg font-semibold text-amber-900'>{moduleName} is locked on your current plan</h2>
      <p className='mt-2 text-sm text-amber-800'>Upgrade your plan to unlock this module and continue building retention workflows.</p>
      <Link href='/billing' className='mt-4 inline-flex rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white'>
        View plans and upgrade
      </Link>
    </div>
  );
}
