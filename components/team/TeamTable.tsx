export function TeamTable({ members }: { members: any[] }) {
  return (
    <div className='rounded-2xl border bg-white'>
      <table className='min-w-full text-sm'>
        <thead className='bg-slate-50'><tr><th className='p-3 text-left'>Email</th><th className='p-3 text-left'>Role</th><th className='p-3 text-left'>Joined</th></tr></thead>
        <tbody>
          {members.map((m) => <tr key={m.user_id} className='border-t'><td className='p-3'>{m.email}</td><td className='p-3'>{m.role}</td><td className='p-3'>{new Date(m.created_at).toLocaleDateString()}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
