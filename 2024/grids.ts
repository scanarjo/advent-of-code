export type Point = [X: number, Y: number];

export type Translation = (point: Point, grid: Grid) => Point;

export type Grid = string[];

export const getGridSize = (rows: string[]) => rows.length;

const isInBounds = (rows: string[], [x, y]: Point): boolean => {
  const size = getGridSize(rows);
  return x >= 0 && y >= 0 && x < size && y < size;
};

export const getCharAtPoint = (rows: string[]) => ([x, y]: Point) => {
  if (y >= rows.length) return;

  return rows[y][x];
};

export const traverseGrid = (
  grid: Grid,
  start: Point,
  move: Translation,
): Point[] => {
  const path: Point[] = [];

  let point = start;
  while (isInBounds(grid, point)) {
    path.push(point);
    point = move(point, grid);
  }

  return path;
};

export const walkGrid = (
  rows: string[],
  start: Point,
  move: Translation,
): string => {
  const getChar = getCharAtPoint(rows);

  let path = '';
  let point = start;
  while (isInBounds(rows, point)) {
    path += getChar(point);
    point = move(point, rows);
  }

  return path;
};
