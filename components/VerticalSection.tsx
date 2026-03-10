import Link from 'next/link';
import { Vertical } from '@/lib/site';

export function VerticalSection({ vertical }: { vertical: Vertical }) {
  return (
    <section className="section">
      <div className="container two-col">
        <div>
          <div className="kicker">{vertical.label}</div>
          <h2>{vertical.title}</h2>
          <p className="lead">{vertical.hero}</p>
          <div className="button-row">
            <Link href="/beta" className="button primary">
              {vertical.cta}
            </Link>
            <Link href="/contact" className="button secondary">
              Contact sales
            </Link>
          </div>
        </div>
        <div className="panel">
          <h3>Built for this vertical</h3>
          <ul>
            {vertical.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <h3 style={{ marginTop: 22 }}>Outcomes</h3>
          <div className="badge-row">
            {vertical.outcomes.map((item) => (
              <span key={item} className="badge">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
