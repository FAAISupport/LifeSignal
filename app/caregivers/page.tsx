import { PageHero } from '@/components/PageHero';
import { VerticalSection } from '@/components/VerticalSection';
import { verticals } from '@/lib/site';

export default function CaregiversPage() {
  return (
    <>
      <PageHero
        eyebrow="Caregivers"
        title="Support the people you care for."
        description="LifeSignal gives caregivers a calmer way to monitor safety, routine, and responsiveness through automated check-ins, alerting, and simple status visibility."
      />
      <VerticalSection vertical={verticals.find((vertical) => vertical.slug === 'caregivers')!} />
    </>
  );
}
