import { PageHero } from '@/components/PageHero';
import { VerticalSection } from '@/components/VerticalSection';
import { verticals } from '@/lib/site';

export default function FamiliesPage() {
  return (
    <>
      <PageHero
        eyebrow="Families"
        title="Protect the people you love."
        description="Daily safety check-ins, family visibility, and fast escalation when something feels off. LifeSignal helps families support loved ones living independently without turning care into a complicated tech project."
      />
      <VerticalSection vertical={verticals.find((vertical) => vertical.slug === 'families')!} />
    </>
  );
}
