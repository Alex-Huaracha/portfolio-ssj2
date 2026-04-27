import { useEffect, useRef, useState } from 'react';
import type { Connection } from './use-connection-controller';
import { getSmoothBendPath } from './grid-utils';

interface Props {
  connection: Connection | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  pixelsPerSecond: number;
  onDuration?: (ms: number) => void;
}

interface PathState {
  d: string;
  length: number;
  durationMs: number;
  key: number;
  gradientId: string;
}

function getCenter(
  el: HTMLElement,
  container: HTMLElement,
): { x: number; y: number } {
  const rect = el.getBoundingClientRect();
  const cRect = container.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 - cRect.left,
    y: rect.top + rect.height / 2 - cRect.top,
  };
}

export function ConnectorOverlay({
  connection,
  containerRef,
  pixelsPerSecond,
  onDuration,
}: Props) {
  const [path, setPath] = useState<PathState | null>(null);
  const measureRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!connection || !containerRef.current) return;
    const container = containerRef.current;
    const fromEl = container.querySelector<HTMLElement>(
      `#stack-tile-${connection.from}`,
    );
    const toEl = container.querySelector<HTMLElement>(
      `#stack-tile-${connection.to}`,
    );
    if (!fromEl || !toEl) return;

    const start = getCenter(fromEl, container);
    const end = getCenter(toEl, container);
    const tileSize = fromEl.getBoundingClientRect().width;
    const d = getSmoothBendPath(start, end, tileSize);

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    let gradientId = 'stack-blue-gradient';
    if (Math.abs(dx) < 5) gradientId = 'stack-vertical-gradient';
    else if (Math.abs(dy) < 5) gradientId = 'stack-horizontal-gradient';

    requestAnimationFrame(() => {
      if (!measureRef.current) return;
      measureRef.current.setAttribute('d', d);
      const length = measureRef.current.getTotalLength();
      const durationMs = (length / pixelsPerSecond) * 1000;
      setPath({ d, length, durationMs, key: connection.tick, gradientId });
      onDuration?.(durationMs);
    });
  }, [connection, containerRef, pixelsPerSecond, onDuration]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="stack-blue-gradient"
          gradientUnits="userSpaceOnUse"
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop stopColor="#7a6ded" offset="0%" />
          <stop stopColor="#591885" offset="100%" />
        </linearGradient>
        <linearGradient
          id="stack-horizontal-gradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop stopColor="#7a6ded" offset="0%" />
          <stop stopColor="#591885" offset="100%" />
        </linearGradient>
        <linearGradient
          id="stack-vertical-gradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop stopColor="#7a6ded" offset="0%" />
          <stop stopColor="#591885" offset="100%" />
        </linearGradient>
      </defs>
      <path ref={measureRef} fill="none" stroke="none" />
      {path && (
        <path
          key={path.key}
          d={path.d}
          fill="none"
          stroke={`url(#${path.gradientId})`}
          strokeWidth={2}
          strokeLinecap="butt"
          strokeLinejoin="butt"
          className="stack-line"
          style={
            {
              '--path-length': `${path.length}px`,
              strokeDasharray: `${path.length} ${path.length}`,
              strokeDashoffset: `${path.length}`,
              animation: `stack-draw-and-reset ${path.durationMs}ms ease-in-out forwards`,
            } as React.CSSProperties
          }
        />
      )}
    </svg>
  );
}
