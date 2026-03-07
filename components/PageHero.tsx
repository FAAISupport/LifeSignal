import Link from 'next/link';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  bullets,
  primaryHref = '/beta',
  primaryLabel = 'Join the beta',
  secondaryHref = '/contact',
  secondaryLabel = 'Talk with us'
}: PageHeroProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="page-hero">
          <span className="eyebrow">{eyebrow}</span>
          <h1 style={{ marginTop: 18 }}>{title}</h1>
          <p className="lead">{description}</p>
          {bullets && bullets.length > 0 ? (
            <ul className="check-list" style={{ marginTop: 20 }}>
              {bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          <div className="button-row">
            <Link className="button primary" href={primaryHref}>
              {primaryLabel}
            </Link>
            <Link className="button secondary" href={secondaryHref}>
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
