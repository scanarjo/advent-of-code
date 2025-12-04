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
