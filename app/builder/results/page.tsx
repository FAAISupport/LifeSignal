import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/admin';

export default async function BuilderResultsPage({ searchParams }: { searchParams: Promise<{ sessionId?: string }> }) {
  const { sessionId } = await searchParams;
  const { data } = sessionId
    ? await supabaseAdmin.from('builder_sessions').select('*').eq('id', sessionId).single()
    : { data: null };

  if (!data) return <main className='p-6'>Session not found.</main>;

  return (
    <main className='mx-auto max-w-5xl px-6 py-10'>
      <h1 className='text-3xl font-semibold'>Builder results</h1>
      <p className='mt-2 text-slate-700'>Tier: {data.suggested_tier} · Monthly: ${data.monthly_total}</p>
      <div className='mt-6 flex gap-3'>
        <Link href={`/builder/proposal?sessionId=${data.id}`} className='rounded-xl bg-slate-900 px-4 py-2 text-white'>View proposal</Link>
        <Link href={`/builder/checkout?sessionId=${data.id}`} className='rounded-xl bg-indigo-600 px-4 py-2 text-white'>Checkout</Link>
      </div>
    </main>
  );
}
