/**
 * Line icons drawn on a 48×48 grid. Strokes marked `d` draw themselves in when an
 * ancestor becomes `.is-in` (scroll reveal) or `.is-active`; parts marked with
 * `ic-live-*` carry a small looping motion that only plays on hover or while active.
 * All styling lives in styles.css under "Icons".
 */
export type IconName =
  | 'academy'
  | 'knowledge'
  | 'event'
  | 'infrastructure'
  | 'business'
  | 'understand'
  | 'structure'
  | 'prepare'
  | 'transfer';

const P = { pathLength: 1, className: 'd' } as const;

const ICONS: Record<IconName, JSX.Element> = {
  academy: (
    <>
      <g className="ic-live-spin">
        <circle cx="24" cy="22" r="13" {...P} />
        <path d="M24 16.5l5.2 3.8-2 6.1h-6.4l-2-6.1z" {...P} />
        <path d="M24 16.5V9M29.2 20.3l6.6-2.4M27.2 26.4l4 5.6M20.8 26.4l-4 5.6M18.8 20.3l-6.6-2.4" {...P} />
      </g>
      <path d="M8 41h32" {...P} />
      <path className="d ic-accent" d="M6 36h5M4 31h4" pathLength={1} />
    </>
  ),
  knowledge: (
    <>
      <circle cx="11" cy="15" r="5" {...P} />
      <circle cx="37" cy="33" r="5" {...P} />
      <path id="ic-k-a" d="M15 11.5C25 6 36 13 37 28" {...P} />
      <path d="M33 36.5C23 42 12 35 11 20" {...P} />
      <path d="M34.2 25.5 37 28l2.6-2.8M13.8 22.5 11 20l-2.6 2.8" {...P} />
      <circle className="ic-live-travel ic-accent-fill" r="1.8" />
    </>
  ),
  event: (
    <>
      <ellipse cx="24" cy="33" rx="18" ry="7" {...P} />
      <ellipse cx="24" cy="33" rx="10" ry="3.6" {...P} />
      <path d="M6 33v-4M42 33v-4M6 29c0-3.9 8-7 18-7s18 3.1 18 7" {...P} />
      <path d="M24 22V6" {...P} />
      <path className="d ic-accent ic-live-flag" d="M24 6.5h10l-2.6 3.4L34 13.3H24" pathLength={1} />
    </>
  ),
  infrastructure: (
    <>
      <path d="M15 42V17M11 42h8" {...P} />
      <rect x="9" y="7" width="12" height="9" rx="1" {...P} />
      <path d="M13 7v9M17 7v9M9 11.5h12" {...P} />
      <path className="d ic-accent ic-live-beam" d="M21 9l19 7M21 14l17 13" pathLength={1} />
      <path d="M26 42h16v-6H26z" {...P} />
      <path d="M30 36v6M34 36v6M38 36v6" {...P} />
    </>
  ),
  business: (
    <>
      <path d="M6 42h36" {...P} />
      <g className="ic-live-bars">
        <rect x="9" y="30" width="6" height="12" {...P} />
        <rect x="19" y="24" width="6" height="18" {...P} />
        <rect x="29" y="17" width="6" height="25" {...P} />
      </g>
      <path className="d ic-accent" d="M8 23 18 15l7 4 14-12" pathLength={1} />
      <path className="d ic-accent" d="M33 7h6v6" pathLength={1} />
    </>
  ),
  understand: (
    <>
      <g className="ic-live-scan">
        <circle cx="21" cy="21" r="12" {...P} />
        <path d="M30 30l11 11" {...P} />
        <circle className="d ic-accent" cx="21" cy="21" r="4" pathLength={1} />
      </g>
    </>
  ),
  structure: (
    <>
      <rect x="7" y="7" width="13" height="13" {...P} />
      <rect x="28" y="7" width="13" height="13" {...P} />
      <rect x="7" y="28" width="13" height="13" {...P} />
      <rect className="d ic-accent ic-live-pop" x="28" y="28" width="13" height="13" pathLength={1} />
      <path d="M20 13.5h8M13.5 20v8M34.5 20v8M20 34.5h8" {...P} />
    </>
  ),
  prepare: (
    <>
      <rect x="10" y="8" width="28" height="34" rx="2" {...P} />
      <path d="M18 8V5h12v3" {...P} />
      <path className="d ic-accent ic-live-check" d="M15 19l3 3 5-6M15 31l3 3 5-6" pathLength={1} />
      <path d="M27 20h6M27 32h6" {...P} />
    </>
  ),
  transfer: (
    <>
      <rect x="5" y="17" width="14" height="14" rx="2" {...P} />
      <rect x="29" y="17" width="14" height="14" rx="2" {...P} />
      <g className="ic-live-pass">
        <path className="d ic-accent" d="M14 24h20M29.5 19.5 34 24l-4.5 4.5" pathLength={1} />
      </g>
    </>
  ),
};

export default function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <svg
      className={`icon icon--${name} ${className}`}
      viewBox="0 0 48 48"
      width="48"
      height="48"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  );
}
