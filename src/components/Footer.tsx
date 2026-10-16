export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <a className="site-footer__brand" href="#top" aria-label="BCN Sport Events — back to top">
          <img src="/brand/logo-320.webp" width={852} height={306} alt="BCN Sport Events" loading="lazy" />
        </a>
        <p className="site-footer__meta">
          © {year} BCN Sport Events. Dubai · Barcelona.
          <span className="site-footer__credit">
            Photography is illustrative; see <a href="/CREDITS.txt">image credits</a>.
          </span>
        </p>
        <a className="site-footer__top" href="#top">
          Back to top
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
            <path d="M7 12V2M2.5 6.5 7 2l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
