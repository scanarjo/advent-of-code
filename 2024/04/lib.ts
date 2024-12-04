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

type Translation = (coord: Coordinate) => Coordinate;

const walkGrid = (
  rows: string[],
  start: Coordinate,
  move: Translation,
): string => {
  const getChar = getCharAtCoord(rows);
  const [width, height] = getDimensions(rows);
  const inBounds = isInBounds(width, height);

  let path = '';
  let coord = start;
  while (inBounds(coord)) {
    path += getChar(coord);
    coord = move(coord);
  }

  return path;
};

type Coordinate = [X: number, Y: number];
const getUpRightDiagonals = (
  rows: string[],
): string[] => {
  const [width, height] = getDimensions(rows);

  const firstColumn: Coordinate[] = [];
  for (let y = 0; y < height; y++) {
    firstColumn.push([0, y]);
  }

  const lastRow: Coordinate[] = [];
  for (let x = 1; x < width; x++) {
    lastRow.push([x, height - 1]);
  }

  const startingCoords = firstColumn.concat(lastRow);

  return startingCoords.map((start) => {
    return walkGrid(rows, start, ([x, y]) => [x + 1, y - 1]);
  });
};

const getDownRightDiagonals = (
  rows: string[],
): string[] => {
  const [width, height] = getDimensions(rows);

  const firstColumn: Coordinate[] = [];
  for (let y = 0; y < height; y++) {
    firstColumn.push([0, y]);
  }

  const firstRow: Coordinate[] = [];
  for (let x = 1; x < width; x++) {
    firstRow.push([x, 0]);
  }

  const startingCoords = firstColumn.concat(firstRow);

  return startingCoords.map((start) => {
    return walkGrid(rows, start, ([x, y]) => [x + 1, y + 1]);
  });
};

const isInBounds =
  (width: number, height: number) => ([x, y]: Coordinate): boolean => {
    return x >= 0 && y >= 0 && x < width && y < height;
  };

const getCharAtCoord = (rows: string[]) => ([x, y]: Coordinate) => {
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

const getCross = (rows: string[], centre: Coordinate) => {
  const getChar = getCharAtCoord(rows);

  const centreChar = getChar(centre);

  const [x, y] = centre;
  return [
    `${getChar([x - 1, y - 1])}${centreChar}${getChar([x + 1, y + 1])}`,
    `${getChar([x - 1, y + 1])}${centreChar}${getChar([x + 1, y - 1])}`,
  ];
};

const sum = (numbers: number[]) => numbers.reduce((sum, n) => sum + n, 0);

const checkForCrossMAS = (rows: string[], coord: Coordinate): boolean => {
  const cross = getCross(rows, coord);

  const counts = cross
    .map((diagonal) => countOccurrencesBothWays('MAS', diagonal));

  return sum(counts) === 2;
};

const getDimensions = (rows: string[]): [width: number, height: number] => {
  return [rows[0].length, rows.length];
};

export const countCrossMASOccurrences = (rows: string[]): number => {
  const [width, height] = getDimensions(rows);

  let count = 0;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (rows[y][x] === 'A') {
        if (checkForCrossMAS(rows, [x, y])) count++;
      }
    }
  }

  return count;
};
