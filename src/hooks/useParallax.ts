import { useEffect } from 'react';
import { prefersReducedMotion } from './motion';

/**
 * Very light vertical drift on `[data-parallax]` images. Only on fine pointers
 * with motion allowed; transforms only, so no layout shift.
 */
export function useParallax() {
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    if (!els.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of els) {
        const host = el.parentElement!;
        const r = host.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const strength = Number(el.dataset.parallax) || 0.08;
        const progress = (r.top + r.height / 2 - vh / 2) / (vh + r.height);
        el.style.transform = `translate3d(0, ${(progress * strength * -100).toFixed(2)}%, 0) scale(${1 + strength * 1.2})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}
