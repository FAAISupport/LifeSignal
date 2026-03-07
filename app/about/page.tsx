import { PageHero } from '@/components/PageHero';

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A modern safety platform built for real people."
        description="LifeSignal was created around a simple but urgent problem: people living alone deserve the peace of mind that someone will notice if something goes wrong. The platform is designed to blend technology, care, reliability, and dignity into one clear experience."
      />

      <section className="section">
        <div className="container two-col">
          <div className="feature-card">
            <h3>Mission</h3>
            <p>
              Ensure that every life has a signal by making check-ins, escalation, and human awareness easier for families and care teams.
            </p>
          </div>
          <div className="feature-card">
            <h3>Positioning</h3>
            <p>
              LifeSignal is not framed as a medical device company. It is a human-centered safety platform for people, families, communities, and organizations that want a smarter way to notice when something is wrong.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
