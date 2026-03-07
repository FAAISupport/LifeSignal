import { PageHero } from '@/components/PageHero';
import { features, verticals } from '@/lib/site';

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="The LifeSignal Safety Platform"
        description="LifeSignal is a remote human safety monitoring platform designed to protect people living independently. It connects families, caregivers, communities, and healthcare teams through automated check-ins and real-time alert escalation."
        bullets={[
          'Automated check-ins with simple responses',
          'Guardian escalation network',
          'Recovery monitoring and reminders',
          'Multi-tenant platform foundation'
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kicker">Supported verticals</div>
          <h2>One product foundation, many market stories.</h2>
          <div className="grid-3" style={{ marginTop: 24 }}>
            {verticals.map((vertical) => (
              <div key={vertical.slug} className="feature-card">
                <h3>{vertical.label}</h3>
                <p>{vertical.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
