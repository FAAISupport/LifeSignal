export function MetricsCards({ metrics }: { metrics: Array<{ label: string; value: string | number }> }) {
  return (
    <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-6'>
      {metrics.map((m) => (
        <div key={m.label} className='rounded-2xl border bg-white p-4 shadow-sm'>
          <p className='text-xs uppercase text-slate-500'>{m.label}</p>
          <p className='mt-2 text-2xl font-semibold'>{m.value}</p>
        </div>
      ))}
    </div>
  );
}
