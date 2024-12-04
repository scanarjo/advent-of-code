export const countOccurences = (target: string, text: string): number => {
  return text.matchAll(new RegExp(target, 'g')).toArray().length;
};

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

const countOccurencesBothWays = (target: string, text: string) => {
  const reversed = reverseString(text);

  return countOccurences(target, text) + countOccurences(target, reversed);
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

const checkForCrossMAS = (rows: string[], [x, y]: Coordinate): boolean => {
  const relevantSquare = rows.slice(y - 1, y + 2).map((row) =>
    row.slice(x - 1, x + 2)
  );

  const diagonals = getDiagonals(relevantSquare);

  const count = diagonals.map((diagonal) =>
    countOccurencesBothWays('MAS', diagonal)
  ).reduce((sum, n) => sum + n, 0);

  return count === 2;
};

export const countCrossMASOccurrences = (rows: string[]): number => {
  let count = 0;

  for (let y = 1; y < rows.length - 1; y++) {
    for (let x = 1; x < rows[0].length - 1; x++) {
      if (rows[y][x] === 'A') {
        if (checkForCrossMAS(rows, [x, y])) count++;
      }
    }
  }

  return count;
};
