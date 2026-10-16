type Props = {
  name: string;
  widths: number[];
  ratio: [number, number];
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  parallax?: number;
};

/** Responsive WebP image from /public/images/{name}-{width}.webp */
export default function Picture({ name, widths, ratio, alt, sizes, className, priority, parallax }: Props) {
  const srcSet = widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ');
  const fallback = widths[Math.min(1, widths.length - 1)];
  return (
    <img
      className={className}
      src={`/images/${name}-${fallback}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={ratio[0]}
      height={ratio[1]}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...({ fetchpriority: priority ? 'high' : 'auto' } as Record<string, string>)}
      data-parallax={parallax}
    />
  );
}
