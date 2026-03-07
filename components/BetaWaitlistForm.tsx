'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type SignupResponse = {
  ok: boolean;
  message?: string;
  referralCode?: string;
  referralLink?: string;
  position?: number;
  referrals?: number;
  pointsPerReferral?: number;
  alreadyJoined?: boolean;
};

const initialForm = {
  fullName: '',
  email: '',
  interest: '',
  useCase: '',
};

export function BetaWaitlistForm() {
  const searchParams = useSearchParams();
  const referredBy = searchParams.get('ref')?.trim().toUpperCase() ?? '';
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SignupResponse | null>(null);
  const [error, setError] = useState<string>('');

  const referralNotice = useMemo(() => {
    if (!referredBy) return null;
    return `Referral code ${referredBy} applied. Join the waitlist and your friend gets moved up.`;
  }, [referredBy]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/waitlist/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          interest: form.interest,
          useCase: form.useCase,
          referredBy,
        }),
      });

      const data = (await response.json()) as SignupResponse;

      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Unable to join the waitlist right now.');
      }

      setResult(data);
      setForm(initialForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel">
      <h3>Join the priority waitlist</h3>
      <p>
        Get your personal referral link after signup. Every successful referral moves you up the
        waitlist.
      </p>

      {referralNotice ? <div className="notice success">{referralNotice}</div> : null}
      {error ? <div className="notice error">{error}</div> : null}
      {result ? (
        <div className="notice success">
          <strong>{result.alreadyJoined ? 'You are already on the waitlist.' : 'You are in.'}</strong>
          <div style={{ marginTop: 8 }}>
            Current position: <strong>#{result.position ?? '—'}</strong>
          </div>
          <div>
            Referrals credited: <strong>{result.referrals ?? 0}</strong>
          </div>
          <div>
            Successful referrals move you up by <strong>{result.pointsPerReferral ?? 3}</strong>{' '}
            spots each.
          </div>
          {result.referralLink ? (
            <>
              <div style={{ marginTop: 12 }}>Your referral link:</div>
              <div className="referral-box">{result.referralLink}</div>
            </>
          ) : null}
        </div>
      ) : null}

      <form className="form" onSubmit={onSubmit}>
        <input
          className="input"
          placeholder="Full name"
          value={form.fullName}
          onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
          required
        />
        <input
          className="input"
          placeholder="Email address"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          required
        />
        <select
          className="select"
          value={form.interest}
          onChange={(event) => setForm((current) => ({ ...current, interest: event.target.value }))}
          required
        >
          <option value="" disabled>
            I am most interested in...
          </option>
          <option value="Family use">Family use</option>
          <option value="Caregiver use">Caregiver use</option>
          <option value="Senior living pilot">Senior living pilot</option>
          <option value="Healthcare / recovery monitoring">Healthcare / recovery monitoring</option>
        </select>
        <textarea
          className="textarea"
          placeholder="Tell us about your use case"
          value={form.useCase}
          onChange={(event) => setForm((current) => ({ ...current, useCase: event.target.value }))}
        />
        <button className="button primary" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Join the waitlist'}
        </button>
      </form>
    </div>
  );
}
