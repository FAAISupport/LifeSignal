export function SubscriptionCard({
  subscription,
}: {
  subscription: { plan?: string; status?: string; amount_monthly?: number; addons?: string[] };
}) {
  return (
    <div className='rounded-2xl border bg-white p-6 shadow-sm'>
      <h3 className='text-lg font-semibold'>Subscription</h3>
      <p className='mt-2 text-sm'>
        Plan: <strong className='capitalize'>{subscription?.plan ?? '—'}</strong>
      </p>
      <p className='text-sm'>
        Status: <strong>{subscription?.status ?? '—'}</strong>
      </p>
      <p className='text-sm'>
        MRR: <strong>${subscription?.amount_monthly ?? 0}</strong>
      </p>
      <p className='text-sm'>
        Add-ons: <strong>{subscription?.addons?.length ? subscription.addons.join(', ') : 'None'}</strong>
      </p>
    </div>
  );
}
