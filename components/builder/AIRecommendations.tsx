import type { BuilderRecommendation } from '@/types/builder';

export function AIRecommendations({ recommendation }: { recommendation: BuilderRecommendation | null }) {
  if (!recommendation) return null;
  return (
    <div className='rounded-2xl border border-emerald-200 bg-emerald-50 p-6'>
      <h3 className='text-lg font-semibold'>AI Recommendations</h3>
      <p className='mt-2 text-sm'>Suggested tier: <strong>{recommendation.suggestedTier}</strong></p>
      <p className='mt-1 text-sm text-slate-700'>{recommendation.confidenceNote}</p>
      <ul className='mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700'>
        {recommendation.rationale.map((reason) => <li key={reason}>{reason}</li>)}
      </ul>
    </div>
  );
}
