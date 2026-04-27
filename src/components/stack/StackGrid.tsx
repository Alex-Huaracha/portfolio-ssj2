import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  stackDesktopTiles,
  stackGrid,
  stackTiles,
  type StackTile as Tile,
} from '@/data/stack';
import { placeOrdered } from './grid-utils';
import { useConnectionController } from './use-connection-controller';
import { ConnectorOverlay } from './ConnectorOverlay';
import { StackTile } from './StackTile';

export function StackGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<Map<string, Tile> | null>(null);
  const [emphasizedTileId, setEmphasizedTileId] = useState<string | null>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    setPlacement(placeOrdered(stackTiles, stackDesktopTiles, stackGrid));
  }, []);

  const filledPositions = useMemo(
    () => (placement ? Array.from(placement.keys()) : []),
    [placement],
  );

  const { connection, advance } = useConnectionController(
    filledPositions,
    stackGrid.hub,
  );

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const handleAnimationDuration = useCallback(
    (durationMs: number) => {
      clearTimers();
      if (!connection) return;

      const isFromHub = connection.from === stackGrid.hub;
      const isToHub = connection.to === stackGrid.hub;
      const targetId = isFromHub ? connection.to : connection.from;

      setEmphasizedTileId(null);

      if (isFromHub) {
        timersRef.current.push(
          window.setTimeout(() => {
            setEmphasizedTileId(targetId);
          }, durationMs * 0.25),
        );
      } else if (isToHub) {
        setEmphasizedTileId(targetId);
      }

      timersRef.current.push(
        window.setTimeout(() => {
          setEmphasizedTileId(null);
        }, durationMs),
      );

      timersRef.current.push(
        window.setTimeout(() => {
          advance();
        }, durationMs),
      );
    },
    [connection, advance, clearTimers],
  );

  useEffect(() => () => clearTimers(), [clearTimers]);

  return (
    <div className="relative w-full overflow-hidden p-3">
      <div
        ref={containerRef}
        className="relative mx-auto"
        style={{
          display: 'grid',
          gap: '0.75rem',
          gridTemplateColumns: 'var(--stack-grid-cols)',
          gridTemplateRows: 'var(--stack-grid-rows)',
          gridTemplateAreas: 'var(--stack-grid-areas)',
          width: 'fit-content',
        }}
      >
        {placement && (
          <StackTile
            key={stackGrid.hub}
            position={stackGrid.hub}
            isHub
            hubLabel={stackGrid.hubLabel}
            emphasized
          />
        )}
        {placement &&
          Array.from(placement.entries()).map(([pos, tile]) => (
            <StackTile
              key={pos}
              position={pos}
              name={tile.name}
              icon={tile.icon}
              emphasized={emphasizedTileId === pos}
            />
          ))}
        <ConnectorOverlay
          connection={connection}
          containerRef={containerRef}
          pixelsPerSecond={stackGrid.pixelsPerSecond}
          onDuration={handleAnimationDuration}
        />
      </div>
    </div>
  );
}
