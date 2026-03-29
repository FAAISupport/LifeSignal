import type { ChurchModuleDefinition } from '@/lib/churchos/modules';

export function ChurchModuleCard({
  module,
  unlocked,
}: {
  module: ChurchModuleDefinition;
  unlocked: boolean;
}) {
  return (
    <article className={`rounded-2xl border p-5 ${unlocked ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
      <div className='flex items-start justify-between gap-3'>
        <div>
          <h3 className='text-base font-semibold text-slate-900'>{module.name}</h3>
          <p className='mt-1 text-sm text-slate-600'>{module.subtitle}</p>
        </div>
        <span className={`rounded-full px-2 py-1 text-xs font-medium ${unlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
          {unlocked ? 'Unlocked' : 'Locked'}
        </span>
      </div>

      <p className='mt-3 text-sm text-slate-700'>{module.description}</p>

      <ul className='mt-3 list-disc space-y-1 pl-5 text-xs text-slate-600'>
        {module.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>

      {!unlocked ? (
        <p className='mt-4 text-xs font-medium text-indigo-700'>
          Available in: {module.availableIn.join(', ')}{module.addonRequired ? ` + ${module.addonRequired} add-on` : ''}
        </p>
      ) : null}
    </article>
  );
}
