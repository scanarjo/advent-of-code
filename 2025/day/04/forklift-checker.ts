type Grid = readonly string[];
type MutGrid = string[];
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
  grid: MutGrid,
  [rowIndex, colIndex]: Point,
  char: string
): void {
  const row = grid[rowIndex];

  if (!row) return;

  const before = row.slice(0, colIndex);
  const after = row.slice(colIndex + 1);

  grid[rowIndex] = `${before}${char}${after}`;
}

export function removeAllAccessibleRolls(grid: MutGrid): number {
  let rollsRemoved = 0;
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    let rowUpdated = false;

    const row = grid[rowIndex]!;
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      if (
        isToiletRoll(grid, [rowIndex, colIndex]) &&
        isAccessible(grid, [rowIndex, colIndex])
      ) {
        updateGrid(grid, [rowIndex, colIndex], '.');
        rollsRemoved++;
        rowUpdated = true;
      }
    }

    if (rowUpdated) rowIndex = Math.max(rowIndex - 2, -1);
  }

  console.table(grid);

  return rollsRemoved;
}
