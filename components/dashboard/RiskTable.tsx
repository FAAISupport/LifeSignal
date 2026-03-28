export function RiskTable({ snapshots }: { snapshots: any[] }) {
  return (
    <div className='rounded-2xl border bg-white p-4'>
      <h3 className='font-semibold'>Risk distribution</h3>
      <ul className='mt-3 space-y-2 text-sm'>
        {snapshots.map((s) => <li key={s.risk_band + s.count}>{s.risk_band}: {s.count}</li>)}
      </ul>
    </div>
  );
}
