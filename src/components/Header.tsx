import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#approach', label: 'Approach' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, keep focus inside, return focus on close.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('menu-open');
    const panel = panelRef.current!;
    panel.querySelector<HTMLElement>('a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = [toggleRef.current!, ...Array.from(panel.querySelectorAll<HTMLElement>('a'))];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 960) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="site-header__inner">
        <a className="brand" href="#top" aria-label="BCN Sport Events — back to top" onClick={close}>
          <img
            src="/brand/logo-320.webp"
            srcSet="/brand/logo-320.webp 320w, /brand/logo-640.webp 640w"
            sizes="(max-width: 600px) 132px, 168px"
            width={852}
            height={306}
            alt="BCN Sport Events"
          />
        </a>

        <nav className="nav" aria-label="Primary">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--primary btn--sm header-cta" href="#contact">
          Let’s talk
        </a>

        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="menu-toggle__bars" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div id="mobile-menu" ref={panelRef} className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          <ol>
            {NAV.map((item, i) => (
              <li key={item.href} style={{ '--i': i } as CSSProperties}>
                <a href={item.href} onClick={close}>
                  <span className="mobile-menu__num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <a className="btn btn--primary mobile-menu__cta" href="#contact" onClick={close}>
          Let’s talk
        </a>
        <p className="mobile-menu__meta">Dubai · Barcelona</p>
      </div>
    </header>
  );
}
