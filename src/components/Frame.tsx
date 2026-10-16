import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Small index shown on the frame, e.g. "01 / 05" */
  tag?: string;
  /** Visual tone of the linework: on light or dark sections */
  tone?: 'light' | 'dark';
};

/**
 * Wraps an image in plan-like linework: registration corners, an offset outline
 * that draws itself, a measuring scale and a small index tag. The image wipes in
 * when the frame enters the viewport. All decoration is aria-hidden.
 */
export default function Frame({ children, className = '', tag, tone = 'light' }: Props) {
  return (
    <figure className={`frame frame--${tone} ${className}`} data-reveal>
      <div className="frame__media">{children}</div>
      <span className="frame__outline" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="frame__corner frame__corner--tl" aria-hidden="true" />
      <span className="frame__corner frame__corner--tr" aria-hidden="true" />
      <span className="frame__corner frame__corner--bl" aria-hidden="true" />
      <span className="frame__corner frame__corner--br" aria-hidden="true" />
      <span className="frame__scale" aria-hidden="true" />
      <span className="frame__sweep" aria-hidden="true" />
      {tag && (
        <span className="frame__tag" aria-hidden="true">
          {tag}
        </span>
      )}
    </figure>
  );
}
