import { useEffect, useRef, useState } from 'react';
import Icon from './Icons';
import Frame from './Frame';
import Picture from './Picture';
import { STEPS } from '../content';

/**
 * Sticky heading on the left; on the right a vertical rail that fills with scroll
 * and lights each step as it passes the middle of the viewport. Scroll is never
 * intercepted: progress is only read from the page position.
 */
export default function Approach() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    const list = listRef.current!;
    const fill = fillRef.current!;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = list.getBoundingClientRect();
      const line = window.innerHeight * 0.55;
      const p = Math.max(0, Math.min(1, (line - r.top) / r.height));
      fill.style.transform = `scaleY(${p.toFixed(4)})`;
      const markers = Array.from(list.querySelectorAll<HTMLElement>('.step__marker'));
      let idx = -1;
      markers.forEach((m, i) => {
        if (m.getBoundingClientRect().top + m.offsetHeight / 2 <= line) idx = i;
      });
      setCurrent(idx);
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

  const shown = Math.max(current, 0);

  return (
    <section id="approach" className="section approach" aria-labelledby="approach-title">
      <div className="container approach__grid">
        <div className="approach__aside">
          <div className="approach__sticky">
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__rule" aria-hidden="true" />
              How we work
            </p>
            <h2 id="approach-title" className="h2" data-reveal>
              A clear process.
              <br />A practical outcome.
            </h2>
            <div className="approach__counter" aria-hidden="true" data-reveal>
              <span className="approach__counter-now" key={shown}>
                0{shown + 1}
              </span>
              <span className="approach__counter-total">/ 0{STEPS.length}</span>
              <span className="approach__counter-name" key={`n${shown}`}>
                {STEPS[shown].title}
              </span>
            </div>
            <Frame className="approach__frame" tag="Lane 1 → 4">
              <Picture
                name="training"
                widths={[640, 1024, 1600]}
                ratio={[1600, 900]}
                alt="Curved lanes of an outdoor running track with starting blocks set in place"
                sizes="(max-width: 1023px) 100vw, 38vw"
              />
            </Frame>
          </div>
        </div>

        <div className="process">
          <span className="process__rail" aria-hidden="true">
            <span ref={fillRef} className="process__fill" />
          </span>
          <ol ref={listRef} className="process__steps">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className={`step${i <= current ? ' is-passed' : ''}${i === current ? ' is-active' : ''}`}
              >
                <span className="step__marker" aria-hidden="true">
                  <Icon name={s.icon} className="step__icon" />
                </span>
                <div className="step__content" data-reveal>
                  <span className="step__num">Step 0{i + 1}</span>
                  <h3 className="step__title">{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
