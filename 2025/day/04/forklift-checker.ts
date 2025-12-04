type Grid = readonly string[];
type Point = readonly [row: number, column: number];

function isToiletRoll(grid: Grid, [rowIndex, colIndex]: Point): boolean {
  const row = grid[rowIndex];

  if (!row) return false;

  return row.charAt(colIndex) === '@';
}

function isAccessible(grid: Grid, [row, col]: Point): boolean {
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

export function countAccessibleRolls(grid: Grid): number {
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
  grid: Grid,
  [rowIndex, colIndex]: Point,
  char: string
): Grid {
  const row = grid[rowIndex];

  if (!row) return grid;

  const before = row.slice(0, colIndex);
  const after = row.slice(colIndex + 1);

  const newRow = `${before}${char}${after}`;

  const newGrid = [...grid];

  newGrid[rowIndex] = newRow;

  return newGrid;
}

interface RemoveAccessibleRollsResult {
  updatedGrid: Grid;
  rollsRemoved: number;
}

export function removeAccessibleRolls(grid: Grid): RemoveAccessibleRollsResult {
  let rollsRemoved = 0;
  let currentGrid = grid;
  for (let rowIndex = 0; rowIndex < currentGrid.length; rowIndex++) {
    const row = currentGrid[rowIndex]!;

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      if (
        isToiletRoll(currentGrid, [rowIndex, colIndex]) &&
        isAccessible(currentGrid, [rowIndex, colIndex])
      ) {
        currentGrid = updateGrid(currentGrid, [rowIndex, colIndex], '.');
        rollsRemoved++;
      }
    }
  }

  return {
    updatedGrid: currentGrid,
    rollsRemoved,
  };
}

export function countAccessibleRollsProgressively(grid: Grid): number {
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
