import { PageHero } from '@/components/PageHero';

const steps = [
  {
    title: '1. Schedule the check-in',
    body: 'Choose the time, cadence, and contacts for a family member, resident, patient, or client.'
  },
  {
    title: '2. Confirm safety',
    body: 'The person responds with a simple confirmation. The experience is built to feel easy and familiar.'
  },
  {
    title: '3. Trigger escalation',
    body: 'If they do not respond, LifeSignal notifies trusted contacts based on the escalation order you define.'
  }
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Simple for users. Powerful for support teams."
        description="LifeSignal is designed around one clear promise: if something is wrong, someone should know. Here is how the platform turns that promise into action."
      />

      <section className="section">
        <div className="container">
          <div className="steps">
            {steps.map((step) => (
              <div key={step.title} className="feature-card">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
