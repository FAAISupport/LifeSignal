'use client';

export function CheckoutClient({ checkoutUrl }: { checkoutUrl: string }) {
  return (
    <button
      type='button'
      onClick={() => { window.location.href = checkoutUrl; }}
      className='rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500'
    >
      Continue to secure checkout
    </button>
  );
}
