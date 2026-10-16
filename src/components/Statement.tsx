import Picture from './Picture';

export default function Statement() {
  return (
    <section className="statement" aria-label="Our perspective">
      <div className="statement__media" aria-hidden="true">
        <Picture
          name="statement"
          widths={[960, 1600, 2400]}
          ratio={[2400, 1702]}
          alt=""
          sizes="100vw"
          parallax={0.1}
        />
      </div>
      <div className="statement__shade" aria-hidden="true" />
      <div className="container statement__inner">
        <blockquote className="statement__quote" data-reveal>
          <p>
            Great sporting experiences begin long before the <em>first whistle.</em>
          </p>
        </blockquote>
      </div>
    </section>
  );
}
