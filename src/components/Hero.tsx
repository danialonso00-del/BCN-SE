import Picture from './Picture';
import Arrow from './Arrow';

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <picture>
          <source
            media="(max-width: 700px)"
            srcSet="/images/hero-portrait-720.webp 720w, /images/hero-portrait-1080.webp 1080w"
            sizes="100vw"
          />
          <Picture
            name="hero"
            widths={[960, 1600, 2400]}
            ratio={[2400, 1350]}
            alt=""
            sizes="100vw"
            priority
            parallax={0.06}
          />
        </picture>
      </div>
      <div className="hero__shade" aria-hidden="true" />

      {/* Stadium plan linework, decorative */}
      <svg className="hero__plan" viewBox="0 0 600 460" aria-hidden="true" focusable="false">
        <ellipse className="d1" cx="300" cy="230" rx="286" ry="214" pathLength={1} />
        <ellipse className="d2" cx="300" cy="230" rx="244" ry="178" pathLength={1} />
        <ellipse className="d3" cx="300" cy="230" rx="204" ry="144" pathLength={1} />
        <rect className="d4" x="180" y="160" width="240" height="140" pathLength={1} />
        <line className="d5" x1="300" y1="160" x2="300" y2="300" pathLength={1} />
        <circle className="d5" cx="300" cy="230" r="28" pathLength={1} />
        <path className="hero__plan-accent" d="M300 16 A286 214 0 0 1 586 230" pathLength={1} />
      </svg>

      <div className="container hero__content">
        <p className="eyebrow eyebrow--light hero__eyebrow">
          <span className="eyebrow__rule" aria-hidden="true" />
          Dubai · Barcelona
        </p>
        <h1 id="hero-title" className="hero__title">
          <span className="line">
            <span>Shaping</span>
          </span>{' '}
          <span className="line">
            <span>what’s next</span>
          </span>{' '}
          <span className="line">
            <span>
              in sport<em>.</em>
            </span>
          </span>
        </h1>
        <div className="hero__lower">
          <p className="hero__lead">
            <strong>Football academies. Training &amp; knowledge transfer. Sports events, facilities and business.</strong>{' '}
            Based in Dubai, with operations in Barcelona, we help organisations build sporting projects that bring people
            together, develop talent and put knowledge into practice.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#contact">
              Let’s talk
              <Arrow />
            </a>
            <a className="btn btn--ghost" href="#expertise">
              Explore our expertise
            </a>
          </div>
        </div>
      </div>

      <div className="container hero__foot">
        <p className="hero__descriptor">
          <span>Strategy.</span> <span>Knowledge.</span> <span>People.</span>
        </p>
        <span className="hero__scroll" aria-hidden="true">
          <span />
        </span>
      </div>
    </section>
  );
}
