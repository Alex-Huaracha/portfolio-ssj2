import { useCallback, useEffect, useRef, useState } from 'react';

export interface Connection {
  from: string;
  to: string;
  direction: 'in' | 'out';
  tick: number;
}

export function useConnectionController(positions: string[], hub: string) {
  const [connection, setConnection] = useState<Connection | null>(null);
  const lastTargetRef = useRef<string | null>(null);
  const tickRef = useRef(0);

  const advance = useCallback(() => {
    if (positions.length === 0) return;
    let target = positions[Math.floor(Math.random() * positions.length)]!;
    if (positions.length > 1 && target === lastTargetRef.current) {
      const idx = (positions.indexOf(target) + 1) % positions.length;
      target = positions[idx]!;
    }
    lastTargetRef.current = target;
    tickRef.current += 1;
    const direction: 'in' | 'out' = Math.random() < 0.5 ? 'out' : 'in';
    setConnection({
      from: direction === 'out' ? hub : target,
      to: direction === 'out' ? target : hub,
      direction,
      tick: tickRef.current,
    });
  }, [positions, hub]);

  useEffect(() => {
    if (positions.length > 0 && tickRef.current === 0) {
      advance();
    }
  }, [positions, advance]);

  return { connection, advance };
}
