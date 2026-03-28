export function MemberStatusCard({ member }: { member: any }) {
  return (
    <div className='rounded-2xl border bg-white p-6 shadow-sm'>
      <h2 className='text-xl font-semibold'>{member.full_name}</h2>
      <p className='text-slate-600'>{member.phone} · {member.timezone}</p>
      <p className='mt-2'>Status: <strong>{member.status}</strong></p>
      <p>Risk: <strong>{member.risk_level}</strong></p>
      <p className='mt-2 text-sm text-slate-700'>{member.notes}</p>
    </div>
  );
}
