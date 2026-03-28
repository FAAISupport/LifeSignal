import { CheckoutClient } from '@/components/builder/CheckoutClient';
import { env } from '@/lib/env';

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ sessionId?: string }> }) {
  const { sessionId } = await searchParams;
  if (!sessionId) return <main className='p-6'>Missing session.</main>;

  const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/builder/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
    cache: 'no-store',
  });

  const json = await response.json();
  if (!response.ok) return <main className='p-6'>{json.error}</main>;

  return (
    <main className='mx-auto max-w-3xl px-6 py-10'>
      <h1 className='text-3xl font-semibold'>Checkout</h1>
      <p className='mt-2 text-slate-600'>Activate your subscription securely via Stripe.</p>
      <div className='mt-6'>
        <CheckoutClient checkoutUrl={json.url} />
      </div>
    </main>
  );
}
