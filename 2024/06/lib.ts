import {
  getCharAtPoint,
  Grid,
  Point,
  Translation,
  traverseGrid,
} from '../grids.ts';

export const findStart = (rows: Grid): Point | undefined => {
  const y = rows.findIndex((row) => row.includes('^'));

  if (y === -1) return;

  const x = rows[y].indexOf('^');

  return [x, y];
};

type Direction = 'UP' | 'LEFT' | 'DOWN' | 'RIGHT';

const possibleMoves = {
  UP: ([x, y]) => [x, y - 1],
  LEFT: ([x, y]) => [x - 1, y],
  DOWN: ([x, y]) => [x, y + 1],
  RIGHT: ([x, y]) => [x + 1, y],
} satisfies Record<Direction, Translation>;

const patrol = [
  possibleMoves.UP,
  possibleMoves.RIGHT,
  possibleMoves.DOWN,
  possibleMoves.LEFT,
];

const getVisited = (grid: Grid): Point[] => {
  const start = findStart(grid);

  if (!start) {
    return [];
  }

  let currentHeading = 0;
  const move: Translation = (current, grid) => {
    const next = patrol[currentHeading](current);

    const nextChar = getCharAtPoint(grid)(next);

    if (nextChar === '#') {
      currentHeading = (currentHeading + 1) % 4;
      return current;
    }

    return next;
  };

  const path = traverseGrid(grid, start, move);

  return path;
};

const groupByRow = (points: Point[]): Point[][] => {
  const groupedPoints: Point[][] = [];
  for (const [x, y] of points) {
    if (!groupedPoints[y]) {
      groupedPoints[y] = [];
    }

    groupedPoints[y].push([x, y]);
  }

  return groupedPoints;
};

export const printVisited = (grid: Grid): void => {
  const visited = getVisited(grid);

  const groupedPoints = groupByRow(visited);

  const mapped = grid.map((row, y) => {
    const visitedOnRow = groupedPoints.at(y);

    if (!visitedOnRow) return row;

    return row.split('').map((char, x) => {
      const found = visitedOnRow.find(([xVisited]) => xVisited === x);

      if (found && char === '.') return 'X';

      return char;
    }).join('');
  });

  console.log(mapped.join('\n'));
};

export const countVisited = (grid: Grid): number => {
  const path = getVisited(grid);

  const visited = new Set(path.map(([x, y]) => {
    return `${x},${y}`;
  }));

  return visited.size;
};
