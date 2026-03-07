import Link from 'next/link';
import { features, pricing, verticals } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Human safety platform</span>
            <h1>Peace of mind for the people you love most.</h1>
            <p className="lead">
              LifeSignal automatically checks in on loved ones living alone. If they do not respond, the right people know.
              Built for families, caregivers, senior communities, healthcare teams, and recovery monitoring.
            </p>
            <div className="button-row">
              <Link href="/beta" className="button primary">
                Join the beta
              </Link>
              <Link href="/how-it-works" className="button secondary">
                How it works
              </Link>
            </div>
            <div className="metrics">
              <div className="stat">
                <strong>6</strong>
                <span>Core verticals supported from one platform.</span>
              </div>
              <div className="stat">
                <strong>24/7</strong>
                <span>Always-on digital check-in logic and escalation workflows.</span>
              </div>
              <div className="stat">
                <strong>1 tap</strong>
                <span>Simple confirmation flow designed for real people, not technicians.</span>
              </div>
            </div>
          </div>
          <div className="mockup card">
            <div className="phone">
              <div className="phone-screen">
                <div className="mini-card">
                  <div className="kicker">Today’s check-in</div>
                  <h3 style={{ marginBottom: 8 }}>Good morning, Mary. Are you okay today?</h3>
                  <div className="button-row" style={{ marginTop: 12 }}>
                    <span className="button primary">I’m okay</span>
                    <span className="button secondary">Need help</span>
                  </div>
                </div>
                <div className="mini-card">
                  <div className="kicker">Guardian network</div>
                  <p style={{ marginBottom: 0 }}>
                    If Mary misses her check-in, notify her daughter, son, and caregiver in order.
                  </p>
                </div>
                <div className="mini-card">
                  <div className="kicker">Recovery mode</div>
                  <p style={{ marginBottom: 0 }}>
                    10-day post-discharge monitoring active with medication reminders at 9:00 AM and 7:00 PM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="page-hero">
            <div className="kicker">The problem</div>
            <h2>Millions of people live alone. Families worry every day.</h2>
            <p className="lead">
              Did mom wake up today? Is dad okay after surgery? Did grandma take her medication? LifeSignal exists to make sure someone notices when something is wrong.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kicker">How LifeSignal works</div>
          <h2>Simple for the person receiving care. Powerful for everyone supporting them.</h2>
          <div className="steps" style={{ marginTop: 24 }}>
            <div className="feature-card">
              <h3>1. Schedule the check-in</h3>
              <p>Set one or more daily check-ins based on routine, recovery plan, or resident needs.</p>
            </div>
            <div className="feature-card">
              <h3>2. Confirm safety</h3>
              <p>The person checks in with a simple text-based response that feels calm and familiar.</p>
            </div>
            <div className="feature-card">
              <h3>3. Escalate when needed</h3>
              <p>If no response arrives, alerts move through a trusted contact network so somebody knows fast.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kicker">Built for every vertical</div>
          <h2>One platform. Multiple real-world uses.</h2>
          <div className="grid-3" style={{ marginTop: 24 }}>
            {verticals.map((vertical) => (
              <div key={vertical.slug} className="feature-card">
                <h3>{vertical.label}</h3>
                <p>{vertical.summary}</p>
                <Link href={`/${vertical.slug}`} className="button secondary">
                  Explore {vertical.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kicker">Core platform features</div>
          <h2>Designed to feel human, not clinical.</h2>
          <div className="grid-3" style={{ marginTop: 24 }}>
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
        <div className="container two-col">
          <div className="cta-band">
            <div className="kicker">Trusted use cases</div>
            <h2>From aging in place to post-discharge monitoring.</h2>
            <p className="lead">
              LifeSignal can serve independent seniors, caregivers, facilities, clinics, discharge teams, and community safety programs from a single product foundation.
            </p>
            <div className="badge-row">
              <span className="badge">Families</span>
              <span className="badge">Caregivers</span>
              <span className="badge">Senior living</span>
              <span className="badge">Healthcare</span>
              <span className="badge">Recovery</span>
              <span className="badge">Community networks</span>
            </div>
          </div>
          <div className="panel">
            <div className="kicker">Starter pricing</div>
            <h3 style={{ fontSize: '1.8rem' }}>Launch with a clear pricing story.</h3>
            <div className="pricing-grid" style={{ marginTop: 18 }}>
              {pricing.map((plan) => (
                <div key={plan.name} className="pricing-card">
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                  <div className="price">
                    {plan.price}
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: '#475569' }}>{plan.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div className="two-col">
              <div>
                <div className="kicker">Final call to action</div>
                <h2>Because every life deserves a signal.</h2>
                <p className="lead">
                  Launch the beta, start conversations with families and partners, and position LifeSignal as the safety layer for people living independently.
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <div className="button-row">
                  <Link href="/beta" className="button primary">
                    Join the beta
                  </Link>
                  <Link href="/contact" className="button secondary">
                    Contact LifeSignal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
