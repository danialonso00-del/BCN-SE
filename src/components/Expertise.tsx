import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import Picture from './Picture';
import Frame from './Frame';
import Icon from './Icons';
import { SERVICES } from '../content';
import type { Service } from '../content';
import { useMediaQuery } from '../hooks/useMediaQuery';

const TOTAL = String(SERVICES.length).padStart(2, '0');

function ServiceBody({ s, headingLevel = 3 }: { s: Service; headingLevel?: 3 }) {
  const H = `h${headingLevel}` as const;
  return (
    <div className="svc__body">
      <H className="h3 svc__title">{s.title}</H>
      <p className="svc__text">{s.body}</p>
      <ul className="svc__topics" aria-label={`${s.title} focus areas`}>
        {s.topics.map((t, i) => (
          <li key={t} style={{ animationDelay: `${180 + i * 70}ms` }}>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServiceImage({ s }: { s: Service }) {
  return (
    <Frame tag={`${s.num} / ${TOTAL}`}>
      <Picture
        name={s.image.name}
        widths={[640, 1024, 1600]}
        ratio={s.image.ratio}
        alt={s.image.alt}
        sizes="(max-width: 1023px) 100vw, 52vw"
      />
    </Frame>
  );
}

/** Desktop: accessible tabs (arrow keys, Home/End), image and copy transition on change. */
function ServiceTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = SERVICES[active];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = SERVICES.length - 1;
    const map: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    setActive(map[e.key]);
    tabs.current[map[e.key]]?.focus();
  };

  return (
    <div className="svc-tabs">
      <div className="svc-tabs__list" role="tablist" aria-label="Our services" aria-orientation="vertical" onKeyDown={onKeyDown} data-reveal>
        {SERVICES.map((item, i) => (
          <button
            key={item.id}
            ref={(el) => (tabs.current[i] = el)}
            id={`tab-${item.id}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`panel-${item.id}`}
            tabIndex={i === active ? 0 : -1}
            className={`svc-tab icon-host${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="svc-tab__num">{item.num}</span>
            <Icon name={item.icon} className="svc-tab__icon" />
            <span className="svc-tab__text">
              <span className="svc-tab__title">{item.title}</span>
              <span className="svc-tab__short">{item.short}</span>
            </span>
            <span className="svc-tab__bar" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div
        key={s.id}
        id={`panel-${s.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${s.id}`}
        className="svc-panel"
        tabIndex={0}
      >
        <ServiceImage s={s} />
        <ServiceBody s={s} />
      </div>
    </div>
  );
}

/** Mobile / tablet: every service visible, stacked. */
function ServiceStack() {
  return (
    <ol className="svc-stack">
      {SERVICES.map((s) => (
        <li key={s.id} className="svc-card">
          <div className="svc-card__head" data-reveal>
            <span className="svc-card__num">{s.num}</span>
            <Icon name={s.icon} className="svc-card__icon" />
          </div>
          <ServiceImage s={s} />
          <div data-reveal>
            <ServiceBody s={s} />
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Expertise() {
  const wide = useMediaQuery('(min-width: 1024px)');
  return (
    <section id="expertise" className="section expertise" aria-labelledby="expertise-title">
      <div className="container">
        <header className="section-head section-head--split">
          <div>
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__rule" aria-hidden="true" />
              Our expertise
            </p>
            <h2 id="expertise-title" className="h2" data-reveal>
              From the first idea
              <br />
              to lasting capability.
            </h2>
          </div>
          <p className="section-head__aside" data-reveal>
            Five areas of work, one way of working: clear objectives, practical preparation and the people taking
            part at the centre.
          </p>
        </header>

        {wide ? <ServiceTabs /> : <ServiceStack />}
      </div>
    </section>
  );
}
