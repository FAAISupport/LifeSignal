export function MemberList({ members }: { members: any[] }) {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {members.map((m) => (
        <div key={m.id} className='rounded-2xl border bg-white p-4 shadow-sm'>
          <h3 className='font-semibold'>{m.full_name}</h3>
          <p className='text-sm text-slate-600'>{m.phone}</p>
          <p className='mt-2 text-sm'>Risk: <strong>{m.risk_level}</strong></p>
        </div>
      ))}
    </div>
  );
}
