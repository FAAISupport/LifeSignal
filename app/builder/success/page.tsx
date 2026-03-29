import Link from 'next/link';

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <div className='rounded-3xl border bg-white p-10 text-center shadow-sm'>
        <h1 className='text-3xl font-semibold'>Subscription activated</h1>
        <p className='mt-2 text-slate-600'>Stripe session: {session_id ?? 'N/A'}</p>
        <Link href='/onboarding' className='mt-6 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-white'>Begin onboarding</Link>
      </div>
    </main>
  );
}
