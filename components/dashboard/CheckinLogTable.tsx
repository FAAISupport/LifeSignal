export function CheckinLogTable({ rows }: { rows: any[] }) {
  return (
    <div className='overflow-x-auto rounded-2xl border bg-white'>
      <table className='min-w-full text-sm'>
        <thead className='bg-slate-50'><tr><th className='p-3 text-left'>Member</th><th className='p-3 text-left'>Channel</th><th className='p-3 text-left'>Status</th><th className='p-3 text-left'>Sent</th></tr></thead>
        <tbody>
          {rows.map((r) => <tr key={r.id} className='border-t'><td className='p-3'>{r.monitored_members?.full_name ?? '—'}</td><td className='p-3'>{r.channel}</td><td className='p-3'>{r.status}</td><td className='p-3'>{new Date(r.sent_at).toLocaleString()}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
