import { calculateMonthlyPrice } from '@/lib/pricing';

export function PricingEngine({ selectedModules }: { selectedModules: string[] }) {
  const pricing = calculateMonthlyPrice(selectedModules);
  return (
    <div className='rounded-2xl bg-slate-900 p-6 text-white'>
      <p className='text-sm text-slate-300'>Platform base: ${pricing.platformBase}</p>
      <p className='text-sm text-slate-300'>Module subtotal: ${pricing.subtotal}</p>
      <p className='mt-3 text-2xl font-semibold'>${pricing.total}/month</p>
    </div>
  );
}
