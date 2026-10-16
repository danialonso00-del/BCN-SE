import { useEffect, useRef, useState } from 'react';
import StadiumSignature from './StadiumSignature';
import Arrow from './Arrow';

import { EMAIL } from '../content';

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand('copy');
  ta.remove();
  if (!ok) throw new Error('copy failed');
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    try {
      await copyText(EMAIL);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), 2600);
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <StadiumSignature />
      <div className="container contact__inner">
        <p className="eyebrow eyebrow--light" data-reveal>
          <span className="eyebrow__rule" aria-hidden="true" />
          Contact us
        </p>
        <h2 id="contact-title" className="h2 h2--light contact__title" data-reveal>
          Let’s move your next
          <br />
          sports project forward.
        </h2>
        <p className="contact__body" data-reveal>
          Tell us what you’re planning — a football academy, a training programme, a sports event, a facility project or
          a growth plan. Let’s explore how we can help.
        </p>

        <div className="contact__email-block" data-reveal>
          <a className="contact__email" href={`mailto:${EMAIL}`}>
            <span className="contact__email-text">{EMAIL}</span>
          </a>
          <div className="contact__actions">
            <a className="btn btn--primary" href={`mailto:${EMAIL}`}>
              Write to us
              <Arrow />
            </a>
            <button
              type="button"
              className={`btn btn--ghost copy-btn${status === 'copied' ? ' is-copied' : ''}`}
              onClick={onCopy}
            >
              <span className="copy-btn__label" aria-hidden={status === 'copied'}>
                Copy email
              </span>
              <span className="copy-btn__done" aria-hidden={status !== 'copied'}>
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                Copied
              </span>
            </button>
            <span className="visually-hidden" role="status" aria-live="polite">
              {status === 'copied' ? 'Email address copied to clipboard' : ''}
              {status === 'error' ? `Could not copy automatically. The address is ${EMAIL}` : ''}
            </span>
          </div>
          {status === 'error' && (
            <p className="contact__hint">Copy didn’t work in this browser — select the address above instead.</p>
          )}
        </div>

        <p className="contact__location" data-reveal>
          <span className="contact__dot" aria-hidden="true" />
          Based in Dubai. Operating in Barcelona.
        </p>
      </div>
    </section>
  );
}
