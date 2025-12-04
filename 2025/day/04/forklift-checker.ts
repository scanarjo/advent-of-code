function isToiletRoll(
  grid: string[],
  [rowIndex, colIndex]: [number, number]
): boolean {
  const row = grid[rowIndex];

  if (!row) return false;

  return row.charAt(colIndex) === '@';
}

function isAccessible(
  grid: string[],
  [row, col]: [row: number, col: number]
): boolean {
  let toiletRollsFound = 0;

  for (let rowIndex = row - 1; rowIndex < row + 2; rowIndex++) {
    for (let colIndex = col - 1; colIndex < col + 2; colIndex++) {
      if (rowIndex === row && colIndex === col) continue;

      if (isToiletRoll(grid, [rowIndex, colIndex])) {
        toiletRollsFound++;
      }
    }
  }

  return toiletRollsFound < 4;
}

export function countAccessibleRolls(grid: string[]): number {
  let count = 0;
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex]!;

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      if (
        isToiletRoll(grid, [rowIndex, colIndex]) &&
        isAccessible(grid, [rowIndex, colIndex])
      ) {
        count++;
      }
    }
  }

  return count;
}

function updateGrid(
  grid: string[],
  [rowIndex, colIndex]: [number, number],
  char: string
): string[] {
  const row = grid[rowIndex];

  if (!row) return grid;

  const before = colIndex > 0 ? row.slice(0, colIndex) : '';
  const after = row.slice(colIndex + 1);

  const newRow = `${before}${char}${after}`;

  const newGrid = [...grid];

  newGrid[rowIndex] = newRow;

  return newGrid;
}

export function removeAccessibleRolls(grid: string[]): {
  updatedGrid: string[];
  rollsRemoved: number;
} {
  let rollsRemoved = 0;
  let rollsFound = <[number, number][]>[];
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex]!;

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      if (
        isToiletRoll(grid, [rowIndex, colIndex]) &&
        isAccessible(grid, [rowIndex, colIndex])
      ) {
        rollsFound.push([rowIndex, colIndex]);
        rollsRemoved++;
      }
    }
  }

  let updatedGrid = grid;
  for (const point of rollsFound) {
    updatedGrid = updateGrid(updatedGrid, point, '.');
  }

  return {
    updatedGrid,
    rollsRemoved,
  };
}

export function countAccessibleRollsProgressively(grid: string[]): number {
  let totalRollsRemoved = 0;
  let rollsRemoved = 0;
  let currentGrid = grid;

  do {
    const result = removeAccessibleRolls(currentGrid);

    currentGrid = result.updatedGrid;
    rollsRemoved = result.rollsRemoved;

    totalRollsRemoved += rollsRemoved;
  } while (rollsRemoved > 0);

  console.table(currentGrid);

  return totalRollsRemoved;
}
