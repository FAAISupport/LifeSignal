import { PageHero } from '@/components/PageHero';
import { VerticalSection } from '@/components/VerticalSection';
import { verticals } from '@/lib/site';

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="Community Safety"
        title="Build safer communities together."
        description="LifeSignal can grow beyond a family tool into a trusted safety network that includes neighbors, community partners, and local support systems."
      />
      <VerticalSection vertical={verticals.find((vertical) => vertical.slug === 'community')!} />
    </>
  );
}
