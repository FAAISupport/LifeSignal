export function SubscriptionCard({ subscription }: { subscription: any }) {
  return (
    <div className='rounded-2xl border bg-white p-6 shadow-sm'>
      <h3 className='text-lg font-semibold'>Subscription</h3>
      <p className='mt-2 text-sm'>Plan: <strong>{subscription?.plan ?? '—'}</strong></p>
      <p className='text-sm'>Status: <strong>{subscription?.status ?? '—'}</strong></p>
      <p className='text-sm'>MRR: <strong>${subscription?.amount_monthly ?? 0}</strong></p>
    </div>
  );
}
