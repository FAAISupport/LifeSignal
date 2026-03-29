import { moduleCatalog } from '@/lib/pricing';

export default function PricingPage() {
  return (
    <main className='mx-auto max-w-7xl px-6 py-10'>
      <h1 className='text-3xl font-semibold'>Transparent modular pricing</h1>
      <p className='mt-2 text-slate-600'>Platform base + selected care modules.</p>
      <div className='mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {moduleCatalog.slice(0, 18).map((m) => (
          <article key={m.key} className='rounded-2xl border bg-white p-5 shadow-sm'>
            <p className='text-xs uppercase text-slate-500'>{m.category}</p>
            <h3 className='mt-1 font-semibold'>{m.label}</h3>
            <p className='mt-2 text-sm text-slate-600'>{m.description}</p>
            <p className='mt-4 text-lg font-semibold'>${m.monthlyPrice}/mo</p>
          </article>
        ))}
      </div>
    </main>
  );
}
