import { BuilderFlow } from '@/components/builder/BuilderFlow';

export default async function BuilderPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const params = await searchParams;
  return (
    <main className='mx-auto max-w-7xl px-6 py-10'>
      <h1 className='text-3xl font-semibold'>ChurchOS Builder</h1>
      <p className='mt-2 text-slate-600'>Design your care system, get AI recommendations, and launch with billing in minutes.</p>
      <div className='mt-8'>
        <BuilderFlow referralCode={params.ref} />
      </div>
    </main>
  );
}
