import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { featureShowcase } from '@/lib/churchos/feature-showcase';

export default function FeatureExamplesPage() {
  return (
    <DashboardShell title='Feature examples (working)'>
      <div className='space-y-4'>
        {featureShowcase.map((item) => (
          <article key={`${item.category}-${item.feature}`} className='rounded-2xl border bg-white p-5'>
            <div className='flex items-center justify-between'>
              <p className='text-xs font-semibold uppercase tracking-wide text-indigo-600'>{item.category}</p>
              <span className='rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700'>
                {item.status}
              </span>
            </div>
            <h2 className='mt-2 text-lg font-semibold text-slate-900'>{item.feature}</h2>
            <ul className='mt-3 space-y-1 text-sm text-slate-700'>
              <li>
                <strong>Trigger:</strong> {item.trigger}
              </li>
              <li>
                <strong>Automation:</strong> {item.automation}
              </li>
              <li>
                <strong>Outcome:</strong> {item.outcome}
              </li>
            </ul>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
