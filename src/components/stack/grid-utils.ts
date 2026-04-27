export interface GridConfig {
  cols: number;
  rows: number;
  hub: string;
}

export function parsePosition(pos: string): { col: number; row: number } {
  const col = pos.charCodeAt(0) - 'A'.charCodeAt(0);
  const row = parseInt(pos.slice(1), 10) - 1;
  return { col, row };
}

export function toPosition(col: number, row: number): string {
  return `${String.fromCharCode('A'.charCodeAt(0) + col)}${row + 1}`;
}

export function neighborsOf(pos: string, grid: GridConfig): string[] {
  const { col, row } = parsePosition(pos);
  const out: string[] = [];
  for (let dc = -1; dc <= 1; dc++) {
    for (let dr = -1; dr <= 1; dr++) {
      if (dc === 0 && dr === 0) continue;
      const nc = col + dc;
      const nr = row + dr;
      if (nc >= 0 && nc < grid.cols && nr >= 0 && nr < grid.rows) {
        out.push(toPosition(nc, nr));
      }
    }
  }
  return out;
}

export function allPositions(grid: GridConfig): string[] {
  const out: string[] = [];
  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      out.push(toPosition(c, r));
    }
  }
  return out;
}

const FILLED_POSITIONS_MAIN = [
  'A1',
  'A2',
  'A4',
  'A5',
  'A6',
  'B1',
  'B3',
  'B5',
  'B6',
  'C1',
  'C6',
  'D1',
  'D2',
  'D4',
  'D5',
  'E1',
  'E3',
  'E4',
  'E5',
  'E6',
];

const FILLED_POSITIONS_DESKTOP = ['F1', 'F3', 'F4', 'F6'];

export function placeOrdered<T extends { name: string }>(
  tiles: readonly T[],
  desktopTiles: readonly T[],
  _grid: GridConfig,
): Map<string, T> {
  const map = new Map<string, T>();

  tiles.forEach((tile, i) => {
    const pos = FILLED_POSITIONS_MAIN[i];
    if (pos) map.set(pos, tile);
  });

  desktopTiles.forEach((tile, i) => {
    const pos = FILLED_POSITIONS_DESKTOP[i];
    if (pos) map.set(pos, tile);
  });

  return map;
}

export function getSmoothBendPath(
  start: { x: number; y: number },
  end: { x: number; y: number },
  tileSize: number,
): string {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
    return `M${start.x},${start.y} L${end.x},${end.y}`;
  }

  const tilesAwayX = Math.round(Math.abs(dx) / tileSize);
  const tilesAwayY = Math.round(Math.abs(dy) / tileSize);

  if (tilesAwayX === 0 || tilesAwayY === 0) {
    return `M${start.x},${start.y} L${end.x},${end.y}`;
  }

  const bendRadius = tileSize * 0.4;
  const xDir = dx > 0 ? 1 : -1;
  const yDir = dy > 0 ? 1 : -1;
  const goHorizontalFirst = Math.abs(dx) > Math.abs(dy);

  if (goHorizontalFirst) {
    const cornerX = start.x + dx - xDir * bendRadius;
    return [
      `M${start.x},${start.y}`,
      `L${cornerX},${start.y}`,
      `Q${start.x + dx},${start.y} ${start.x + dx},${start.y + yDir * bendRadius}`,
      `L${end.x},${end.y}`,
    ].join(' ');
  }

  const cornerY = start.y + dy - yDir * bendRadius;
  return [
    `M${start.x},${start.y}`,
    `L${start.x},${cornerY}`,
    `Q${start.x},${start.y + dy} ${start.x + xDir * bendRadius},${start.y + dy}`,
    `L${end.x},${end.y}`,
  ].join(' ');
}
