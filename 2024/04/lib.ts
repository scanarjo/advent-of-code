export const getColumns = (rows: string[]): string[] => {
  const columns: string[][] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    for (let j = 0; j < row.length; j++) {
      const char = row[j];

      if (!columns[j]) {
        columns[j] = [];
      }

      columns[j].push(char);
    }
  }

  return columns.map((column) => column.join(''));
};

type Translation = (point: Point) => Point;

const walkGrid = (
  rows: string[],
  start: Point,
  move: Translation,
): string => {
  const getChar = getCharAtPoint(rows);

  let path = '';
  let point = start;
  while (isInBounds(rows, point)) {
    path += getChar(point);
    point = move(point);
  }

  return path;
};

type Point = [X: number, Y: number];
const getUpRightDiagonals = (
  rows: string[],
): string[] => {
  const size = getGridSize(rows);

  const startingPoints: Point[] = [];
  for (let y = 0; y < size; y++) {
    startingPoints.push([0, y]);
  }

  for (let x = 1; x < size; x++) {
    startingPoints.push([x, size - 1]);
  }

  return startingPoints.map((start) => {
    return walkGrid(rows, start, ([x, y]) => [x + 1, y - 1]);
  });
};

const getDownRightDiagonals = (
  rows: string[],
): string[] => {
  const size = getGridSize(rows);

  const startingPoints: Point[] = [];
  for (let y = 0; y < size; y++) {
    startingPoints.push([0, y]);
  }

  for (let x = 1; x < size; x++) {
    startingPoints.push([x, 0]);
  }

  return startingPoints.map((start) => {
    return walkGrid(rows, start, ([x, y]) => [x + 1, y + 1]);
  });
};

const isInBounds = (rows: string[], [x, y]: Point): boolean => {
  const size = getGridSize(rows);
  return x >= 0 && y >= 0 && x < size && y < size;
};

const getCharAtPoint = (rows: string[]) => ([x, y]: Point) => {
  return rows[y][x];
};

export const getDiagonals = (rows: string[]): string[] => {
  return [
    ...getUpRightDiagonals(rows),
    ...getDownRightDiagonals(rows),
  ];
};

const reverseString = (input: string): string => {
  return input.split('').toReversed().join('');
};

const countMatches = (target: string, text: string): number => {
  let index = text.indexOf(target, 0);

  let matches = 0;
  while (index !== -1) {
    matches++;
    index = text.indexOf(target, index + target.length - 1);
  }

  return matches;
};

const countOccurrencesBothWays = (target: string, text: string) => {
  return countMatches(target, text) + countMatches(reverseString(target), text);
};

export const countGridOccurrences = (
  target: string,
  rows: string[],
): number => {
  const columns = getColumns(rows);

  const diagonals = getDiagonals(rows);

  const allRows = [
    ...rows,
    ...columns,
    ...diagonals,
  ];

  const superstring = allRows.join(';');

  return countOccurrencesBothWays(target, superstring);
};

const getCross = (rows: string[], centre: Point) => {
  const getChar = getCharAtPoint(rows);

  const centreChar = getChar(centre);

  const [x, y] = centre;
  return [
    `${getChar([x - 1, y - 1])}${centreChar}${getChar([x + 1, y + 1])}`,
    `${getChar([x - 1, y + 1])}${centreChar}${getChar([x + 1, y - 1])}`,
  ];
};

const sum = (numbers: number[]) => numbers.reduce((sum, n) => sum + n, 0);

const checkForCrossMAS = (rows: string[], coord: Point): boolean => {
  const cross = getCross(rows, coord);

  const counts = cross
    .map((diagonal) => countOccurrencesBothWays('MAS', diagonal));

  return sum(counts) === 2;
};

const getGridSize = (rows: string[]) => rows.length;

export const countCrossMASOccurrences = (rows: string[]): number => {
  const size = getGridSize(rows);

  let count = 0;
  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      if (rows[y][x] === 'A') {
        if (checkForCrossMAS(rows, [x, y])) count++;
      }
    }
  }

  return count;
};
