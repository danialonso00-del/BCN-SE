import { useEffect, useRef, useState } from 'react';
import type { StadiumHandle } from '../three/stadium';
import { prefersReducedMotion } from '../hooks/motion';

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

function modestDevice() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return (nav.deviceMemory !== undefined && nav.deviceMemory < 4) || nav.connection?.saveData === true;
}

/**
 * Decorative 3D stadium for the contact section. Three.js is only fetched when
 * the section approaches the viewport; rendering pauses off-screen and in hidden
 * tabs. Falls back to a static line drawing without WebGL or on modest devices.
 * With reduced motion, a single still frame is rendered.
 */
export default function StadiumSignature() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current!;
    if (!webglAvailable() || modestDevice()) return;

    let handle: StadiumHandle | null = null;
    let visible = false;
    let cancelled = false;
    const still = prefersReducedMotion();

    const sync = () => {
      if (!handle) return;
      if (still) return handle.renderOnce();
      if (visible && !document.hidden) handle.start();
      else handle.stop();
    };

    const load = async () => {
      const { mountStadium } = await import('../three/stadium');
      if (cancelled) return;
      try {
        handle = mountStadium(canvasRef.current!);
      } catch {
        return; // keep the static fallback
      }
      handle.renderOnce();
      setReady(true);
      sync();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !handle) load();
        sync();
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(wrap);
    const onVis = () => sync();
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelled = true;
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      handle?.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className={`stadium${ready ? ' is-ready' : ''}`} aria-hidden="true">
      <svg className="stadium__fallback" viewBox="0 0 600 360" focusable="false">
        <g fill="none">
          {Array.from({ length: 8 }, (_, k) => (
            <ellipse
              key={k}
              cx="300"
              cy={232 - k * 12}
              rx={150 + k * 17}
              ry={58 + k * 8}
              stroke={k === 0 || k === 7 ? '#DCE6F2' : '#5C8BD6'}
              strokeOpacity={k === 0 || k === 7 ? 0.45 : 0.28}
            />
          ))}
          <ellipse cx="300" cy="118" rx="300" ry="122" stroke="#DCE6F2" strokeOpacity="0.4" />
          <ellipse cx="300" cy="112" rx="216" ry="84" stroke="#DCE6F2" strokeOpacity="0.6" />
          <rect x="230" y="216" width="140" height="34" stroke="#E2366E" strokeOpacity="0.85" />
          <line x1="300" y1="216" x2="300" y2="250" stroke="#E2366E" strokeOpacity="0.85" />
        </g>
      </svg>
      <canvas ref={canvasRef} className="stadium__canvas" />
    </div>
  );
}
