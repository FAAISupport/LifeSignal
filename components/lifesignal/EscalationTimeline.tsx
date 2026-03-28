export function EscalationTimeline({ events }: { events: any[] }) {
  return (
    <ol className='space-y-3'>
      {events.map((e) => (
        <li key={e.id} className='rounded-xl border bg-white p-3'>
          <p className='font-medium'>{e.event_type}</p>
          <p className='text-sm text-slate-600'>{e.detail}</p>
        </li>
      ))}
    </ol>
  );
}
