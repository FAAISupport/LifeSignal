import { BetaWaitlistForm } from '@/components/BetaWaitlistForm';
import { PageHero } from '@/components/PageHero';

export default function BetaPage() {
  return (
    <>
      <PageHero
        eyebrow="Beta"
        title="Join the LifeSignal priority waitlist"
        description="We are inviting families, caregivers, senior communities, and healthcare partners to help shape the future of remote human safety monitoring. Join the waitlist, get your referral link, and move up the line when your network joins."
        primaryLabel="Join the waitlist"
        secondaryLabel="Questions first?"
      />

      <section className="section">
        <div className="container two-col">
          <div className="panel">
            <h3>How priority access works</h3>
            <ul>
              <li>Join the beta waitlist in under a minute</li>
              <li>Get your personal referral code and share link instantly</li>
              <li>Every successful referral moves you up the queue</li>
              <li>Perfect for families, caregivers, clinics, and pilot partners</li>
            </ul>
            <div className="badge-row">
              <span className="badge">Daily check-ins</span>
              <span className="badge">Guardian alerts</span>
              <span className="badge">Referral queue</span>
              <span className="badge">Pilot-ready</span>
            </div>
          </div>
          <BetaWaitlistForm />
        </div>
      </section>
    </>
  );
}
