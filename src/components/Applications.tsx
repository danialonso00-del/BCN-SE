import { useRef } from 'react';
import type { PointerEvent } from 'react';
import Arrow from './Arrow';
import Icon from './Icons';
import { NEEDS, mailto } from '../content';

export default function Applications() {
  const gridRef = useRef<HTMLUListElement>(null);

  // Spotlight: one pointer position shared by every tile, so the glow flows across borders.
  const onMove = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== 'mouse') return;
    for (const tile of gridRef.current!.children as HTMLCollectionOf<HTMLElement>) {
      const r = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', `${e.clientX - r.left}px`);
      tile.style.setProperty('--my', `${e.clientY - r.top}px`);
    }
  };

  return (
    <section className="applications" aria-labelledby="applications-title">
      <div className="applications__grid-bg" aria-hidden="true" />
      <div className="container">
        <div className="applications__head">
          <h2 id="applications-title" className="h2 h2--light" data-reveal>
            What are you
            <br />
            looking to build?
          </h2>
          <a className="text-link text-link--light" href="#contact" data-reveal>
            Tell us about your idea.
            <Arrow />
          </a>
        </div>

        <ul ref={gridRef} className="needs" onPointerMove={onMove}>
          {NEEDS.map((n, i) => (
            <li key={n.title} className={`need need--${i}`} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <a className="need__link icon-host" href={mailto(n.subject)}>
                <span className="need__top">
                  <Icon name={n.icon} className="need__icon" />
                  <span className="need__num" aria-hidden="true">
                    0{i + 1}
                  </span>
                </span>
                <span className="need__title">{n.title}</span>
                <span className="need__body">{n.body}</span>
                <span className="need__cta">
                  Start the conversation
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
