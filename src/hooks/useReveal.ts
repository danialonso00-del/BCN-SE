import { useEffect } from 'react';

/**
 * Adds `is-in` to every `[data-reveal]` element once it enters the viewport,
 * including elements rendered later (tabs, layout switches).
 * Content is only hidden while `html.js` is set and motion is allowed (see styles.css),
 * so everything stays readable if this never runs.
 */
export function useReveal() {
  useEffect(() => {
    const SELECTOR = '[data-reveal]:not(.is-in)';
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    const scan = (root: ParentNode) => {
      if (root instanceof Element && root.matches(SELECTOR)) io.observe(root);
      root.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    };
    scan(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) m.addedNodes.forEach((n) => n instanceof Element && scan(n));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
