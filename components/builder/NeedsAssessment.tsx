'use client';

const painPoints = [
  'members living alone',
  'people slipping away unnoticed',
  'poor follow-up after hospital stays',
  'volunteer coordination problems',
  'senior safety needs',
  'prayer intake overload',
  'missed Sunday attendance follow-up',
  'lack of pastoral visibility',
];

export function NeedsAssessment({ selected, onToggle }: { selected: string[]; onToggle: (value: string) => void }) {
  return (
    <div className='grid gap-3 md:grid-cols-2'>
      {painPoints.map((item) => (
        <button
          key={item}
          type='button'
          onClick={() => onToggle(item)}
          className={`rounded-2xl border p-4 text-left transition ${selected.includes(item) ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 bg-white'}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
