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

const createCoordGenerator = (getNextCoord: Translation) =>
  function* (start: Coordinate, width: number, height: number) {
    const inBounds = isInBounds(width, height);

    let coord = start;
    while (inBounds(coord)) {
      yield coord;

      coord = getNextCoord(coord);
    }
  };

const upRightDiagonal = createCoordGenerator(([x, y]) => [x + 1, y - 1]);
const downRightDiagonal = createCoordGenerator(([x, y]) => [x + 1, y + 1]);

type Coordinate = [X: number, Y: number];
const getUpRightDiagonals = (
  width: number,
  height: number,
): Coordinate[][] => {
  const firstColumn: Coordinate[] = [];
  for (let y = 0; y < height; y++) {
    firstColumn.push([0, y]);
  }

  const lastRow: Coordinate[] = [];
  for (let x = 1; x < width; x++) {
    lastRow.push([x, height - 1]);
  }

  const startingCoords = firstColumn.concat(lastRow);

  return startingCoords.map((coord) => {
    return [...upRightDiagonal(coord, width, height)];
  });
};

const getDownRightDiagonals = (
  width: number,
  height: number,
): Coordinate[][] => {
  const firstColumn: Coordinate[] = [];
  for (let y = 0; y < height; y++) {
    firstColumn.push([0, y]);
  }

  const firstRow: Coordinate[] = [];
  for (let x = 1; x < width; x++) {
    firstRow.push([x, 0]);
  }

  const startingCoords = firstColumn.concat(firstRow);

  return startingCoords.map((coord) => {
    return [...downRightDiagonal(coord, width, height)];
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
  const firstRow = rows[0];
  const width = firstRow.length;
  const height = rows.length;

  const coords = [
    ...getUpRightDiagonals(width, height),
    ...getDownRightDiagonals(width, height),
  ];

  return coords.map((diagonal) => {
    const chars = diagonal.map(getCharAtCoord(rows));

    return chars.join('');
  });
};

const reverseString = (input: string): string => {
  return input.split('').toReversed().join('');
};

const countMatches = (regex: RegExp, text: string): number => {
  return text.matchAll(regex).toArray().length;
};

const countOccurencesBothWays = (target: string, text: string) => {
  const reversed = reverseString(text);

  const regex = new RegExp(target, 'g');

  return countMatches(regex, text) + countMatches(regex, reversed);
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

  return allRows
    .map((row) => countOccurencesBothWays(target, row))
    .reduce((sum, n) => sum + n, 0);
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
    .map((diagonal) => countOccurencesBothWays('MAS', diagonal));

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
