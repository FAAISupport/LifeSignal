import { PageHero } from '@/components/PageHero';
import { pricing } from '@/lib/site';

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing for launch, pilots, and growth."
        description="Start with a clear pricing story for families, caregivers, and organizational pilots. Adjust plan structure as you validate demand and deployment models."
      />

      <section className="section">
        <div className="container pricing-grid">
          {pricing.map((plan) => (
            <div key={plan.name} className="pricing-card">
              <div className="kicker">{plan.name}</div>
              <h3>{plan.name} plan</h3>
              <p>{plan.description}</p>
              <div className="price">
                {plan.price}
                <span style={{ fontSize: '1rem', fontWeight: 600, color: '#475569' }}>{plan.period}</span>
              </div>
              <ul style={{ marginTop: 16 }}>
                {plan.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
