import { PageHero } from '@/components/PageHero';
import { VerticalSection } from '@/components/VerticalSection';
import { verticals } from '@/lib/site';

export default function HealthcarePage() {
  return (
    <>
      <PageHero
        eyebrow="Healthcare"
        title="Extend care beyond the hospital."
        description="LifeSignal helps providers support patients after discharge with recovery check-ins, medication support, and alert escalation when someone stops responding."
      />
      <VerticalSection vertical={verticals.find((vertical) => vertical.slug === 'healthcare')!} />
    </>
  );
}
