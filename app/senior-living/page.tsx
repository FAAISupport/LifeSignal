import { PageHero } from '@/components/PageHero';
import { VerticalSection } from '@/components/VerticalSection';
import { verticals } from '@/lib/site';

export default function SeniorLivingPage() {
  return (
    <>
      <PageHero
        eyebrow="Senior Living"
        title="Enhance safety for independent residents."
        description="Communities need a better balance of freedom and reassurance. LifeSignal adds a digital safety layer for independent residents without heavy hardware or an institutional feel."
      />
      <VerticalSection vertical={verticals.find((vertical) => vertical.slug === 'senior-living')!} />
    </>
  );
}
