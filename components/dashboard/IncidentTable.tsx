export function IncidentTable({ incidents }: { incidents: any[] }) {
  return (
    <div className='overflow-x-auto rounded-2xl border bg-white'>
      <table className='min-w-full text-sm'>
        <thead className='bg-slate-50 text-left text-slate-600'><tr><th className='p-3'>Member</th><th className='p-3'>Severity</th><th className='p-3'>Status</th><th className='p-3'>Created</th></tr></thead>
        <tbody>
          {incidents.map((i) => <tr key={i.id} className='border-t'><td className='p-3'>{i.monitored_members?.full_name ?? '—'}</td><td className='p-3'>{i.severity}</td><td className='p-3'>{i.escalation_status}</td><td className='p-3'>{new Date(i.created_at).toLocaleString()}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
