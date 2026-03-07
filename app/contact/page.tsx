import { PageHero } from '@/components/PageHero';
import { site } from '@/lib/site';

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk with the LifeSignal team."
        description="Questions about pilots, partnerships, beta access, or product fit? Start the conversation here."
        primaryLabel="Email us"
        primaryHref={`mailto:${site.email}`}
        secondaryLabel="Join beta"
        secondaryHref="/beta"
      />

      <section className="section">
        <div className="container two-col">
          <div className="panel">
            <h3>Contact details</h3>
            <p>Email: {site.email}</p>
            <p>Website: {site.domain}</p>
            <p style={{ marginBottom: 0 }}>
              Best for: pilot discussions, local launch partnerships, caregiver interest, and healthcare/community use cases.
            </p>
          </div>
          <div className="panel">
            <h3>Contact form placeholder</h3>
            <form className="form">
              <input className="input" placeholder="Your name" />
              <input className="input" placeholder="Your email" />
              <textarea className="textarea" placeholder="How can we help?" />
              <button type="button" className="button primary">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
