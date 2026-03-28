import Link from 'next/link';

export default function HomePage() {
  return (
    <main className='mx-auto max-w-7xl px-6 py-20'>
      <section className='rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 p-12 text-white shadow-2xl'>
        <p className='text-sm uppercase tracking-widest text-indigo-200'>Care infrastructure SaaS</p>
        <h1 className='mt-3 text-5xl font-semibold'>Build your church care operating system in one workflow.</h1>
        <p className='mt-6 max-w-3xl text-lg text-indigo-100'>ChurchOS Builder V3 unifies sales, onboarding, billing, and LifeSignal Core automation for check-ins, escalations, incidents, and analytics.</p>
        <div className='mt-8 flex gap-3'>
          <Link href='/builder' className='rounded-xl bg-white px-5 py-3 font-semibold text-slate-900'>Start Builder</Link>
          <Link href='/pricing' className='rounded-xl border border-indigo-200 px-5 py-3'>See Pricing</Link>
        </div>
      </section>
    </main>
  );
}
