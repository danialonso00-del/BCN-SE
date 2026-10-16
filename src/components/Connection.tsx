import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import map from '../data/map.json';
import { prefersReducedMotion } from '../hooks/motion';

const { width: W, height: H, cities, distanceKm } = map;
const BCN = cities.barcelona;
const DXB = cities.dubai;
// Arc control point, lifted above the midpoint so the route reads as a flight path.
const CTRL = { x: (BCN.x + DXB.x) / 2, y: Math.min(BCN.y, DXB.y) - 230 };
const ARC = `M${BCN.x} ${BCN.y} Q${CTRL.x} ${CTRL.y} ${DXB.x} ${DXB.y}`;
const MID = {
  x: 0.25 * BCN.x + 0.5 * CTRL.x + 0.25 * DXB.x,
  y: 0.25 * BCN.y + 0.5 * CTRL.y + 0.25 * DXB.y,
};

/** Maps viewBox coordinates to the stage box, mirroring `object-fit: cover` / `xMidYMid slice`. */
function useStageMapping(ref: React.RefObject<HTMLDivElement>) {
  const [box, setBox] = useState({ s: 1, ox: 0, oy: 0 });
  useEffect(() => {
    const el = ref.current!;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const s = Math.max(w / W, h / H);
      setBox({ s, ox: (w - W * s) / 2, oy: (h - H * s) / 2 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return (p: { x: number; y: number }) =>
    ({ left: `${p.x * box.s + box.ox}px`, top: `${p.y * box.s + box.oy}px` }) as CSSProperties;
}

export default function Connection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const place = useStageMapping(stageRef);
  const [hot, setHot] = useState<'dubai' | 'barcelona' | null>(null);

  // Pause looping animations off-screen; gentle pointer tilt on fine pointers.
  useEffect(() => {
    const section = sectionRef.current!;
    const plane = planeRef.current!;
    const io = new IntersectionObserver(([e]) => section.classList.toggle('is-live', e.isIntersecting), {
      rootMargin: '100px 0px',
    });
    io.observe(section);

    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return () => io.disconnect();

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      plane.style.transform = `rotateX(${(10 - y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = stageRef.current!.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const CITY_CARDS = [
    { key: 'dubai' as const, role: 'Based in', name: 'Dubai', country: 'United Arab Emirates' },
    { key: 'barcelona' as const, role: 'Knowledge in', name: 'Barcelona', country: 'Spain' },
  ];

  return (
    <section ref={sectionRef} className={`connection${hot ? ` is-hot-${hot}` : ''}`} aria-labelledby="connection-title">
      <div className="container">
        <header className="connection__head">
          <p className="eyebrow eyebrow--light" data-reveal>
            <span className="eyebrow__rule" aria-hidden="true" />
            Where we work
          </p>
          <h2 id="connection-title" className="h2 h2--light" data-reveal>
            From the Gulf
            <br />
            to the Mediterranean.
          </h2>
        </header>

        <div className="map" data-reveal>
          <div ref={stageRef} className="map__stage">
            <div ref={planeRef} className="map__plane">
              <img
                className="map__dots"
                src="/map/dots.svg"
                width={W}
                height={H}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <svg
                className="map__overlay"
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
                focusable="false"
              >
                {/* range rings */}
                {[BCN, DXB].map((c, i) => (
                  <g key={i} className={`map__rings map__rings--${i ? 'dxb' : 'bcn'}`} transform={`translate(${c.x} ${c.y})`}>
                    <circle r="70" />
                    <circle r="140" />
                    <circle r="220" />
                  </g>
                ))}
                {/* route */}
                <path className="map__arc-base" d={ARC} pathLength={1} />
                <path className="map__arc-glow" d={ARC} pathLength={1} />
                <path className="map__arc-trail" d={ARC} pathLength={1} />
                <path className="map__arc-head" d={ARC} pathLength={1} />
                {/* markers */}
                {[
                  { c: BCN, k: 'bcn' },
                  { c: DXB, k: 'dxb' },
                ].map(({ c, k }) => (
                  <g key={k} className={`map__marker map__marker--${k}`} transform={`translate(${c.x} ${c.y})`}>
                    <circle className="map__pulse" r="9" />
                    <circle className="map__pulse map__pulse--late" r="9" />
                    <circle className="map__ring" r="15" />
                    <circle className="map__core" r="6.5" />
                  </g>
                ))}
              </svg>

              <span className="map__label map__label--bcn" style={place(BCN)} aria-hidden="true">
                Barcelona
              </span>
              <span className="map__label map__label--dxb" style={place(DXB)} aria-hidden="true">
                Dubai
              </span>
              <span className="map__distance" style={place(MID)} aria-hidden="true">
                {distanceKm.toLocaleString('en-GB')} km
              </span>
            </div>
          </div>
          <p className="visually-hidden">
            Map of Europe, North Africa and the Middle East showing a route between Barcelona, Spain and Dubai, United
            Arab Emirates, about {distanceKm.toLocaleString('en-GB')} kilometres apart.
          </p>
        </div>

        <ul className="cities-grid">
          {CITY_CARDS.map((card, i) => (
            <li
              key={card.key}
              className={`city-card city-card--${card.key}`}
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
              onPointerEnter={() => setHot(card.key)}
              onPointerLeave={() => setHot(null)}
            >
              <span className="city-card__role">{card.role}</span>
              <h3 className="city-card__name">{card.name}</h3>
              <span className="city-card__country">{card.country}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
