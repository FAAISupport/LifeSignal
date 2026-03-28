'use client';
import { moduleCatalog } from '@/lib/pricing';

export function ModuleSelector({ selectedModules, onToggle }: { selectedModules: string[]; onToggle: (key: string) => void }) {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {moduleCatalog.map((m) => (
        <button
          type='button'
          key={m.key}
          onClick={() => onToggle(m.key)}
          className={`rounded-2xl border p-4 text-left shadow-sm transition ${selectedModules.includes(m.key) ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 bg-white hover:border-indigo-300'}`}
        >
          <p className='text-xs uppercase tracking-wide text-slate-500'>{m.category}</p>
          <h4 className='mt-1 font-semibold'>{m.label}</h4>
          <p className='mt-2 text-sm text-slate-600'>{m.description}</p>
          <p className='mt-3 text-sm font-medium'>${m.monthlyPrice}/mo</p>
        </button>
      ))}
    </div>
  );
}
