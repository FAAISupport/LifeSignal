import { PageHero } from '@/components/PageHero';
import { VerticalSection } from '@/components/VerticalSection';
import { verticals } from '@/lib/site';

export default function RecoveryPage() {
  return (
    <>
      <PageHero
        eyebrow="Recovery"
        title="Recovery should never happen alone."
        description="From surgery to illness to short-term wellness follow-up, LifeSignal gives families and caregivers a simple safety net during the days that matter most."
      />
      <VerticalSection vertical={verticals.find((vertical) => vertical.slug === 'recovery')!} />
    </>
  );
}
