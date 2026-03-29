import { moduleCatalog, calculateMonthlyPrice } from '@/lib/pricing';
import type { BuilderChurchProfile } from '@/types/builder';

export function ProposalView({ profile, selectedModules, tier }: { profile: BuilderChurchProfile; selectedModules: string[]; tier: string }) {
  const chosen = moduleCatalog.filter((m) => selectedModules.includes(m.key));
  const pricing = calculateMonthlyPrice(selectedModules);
  return (
    <article className='space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm'>
      <header>
        <h1 className='text-3xl font-bold'>FaithSignal Builder Proposal</h1>
        <p className='text-slate-600'>{profile.churchName} · {profile.cityState}</p>
      </header>
      <section>
        <h2 className='text-xl font-semibold'>Recommended Tier: {tier}</h2>
        <p className='text-slate-700'>Designed for {profile.ministryFocus} with operational confidence for your care team.</p>
      </section>
      <section>
        <h3 className='font-semibold'>Selected Modules ({chosen.length})</h3>
        <ul className='mt-2 space-y-2 text-sm text-slate-700'>
          {chosen.map((m) => <li key={m.key}>• {m.label} — {m.outcome}</li>)}
        </ul>
      </section>
      <footer className='rounded-2xl bg-slate-100 p-4'>
        <p className='text-lg font-semibold'>Monthly investment: ${pricing.total}</p>
      </footer>
    </article>
  );
}
