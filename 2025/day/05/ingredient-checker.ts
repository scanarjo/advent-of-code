import { isInRange, parseDenaryInt } from 'utils';

type Range = [bottom: number, top: number];

export function countFreshIngredients(sampleData: string[]): number {
  const splitIndex = sampleData.findIndex((string) => string === '');

  const freshRanges = sampleData
    .slice(0, splitIndex)
    .map((range) => range.split('-'));

  let ingredientIds = sampleData.slice(splitIndex + 1).map(parseDenaryInt);

  const totalIngredients = ingredientIds.length;
  for (const range of freshRanges) {
    const min = parseDenaryInt(range[0]!);
    const max = parseDenaryInt(range[1]!);

    ingredientIds = ingredientIds.filter((id) => !isInRange(min, max + 1, id));
  }

  return totalIngredients - ingredientIds.length;
}

function parseRange(range: string): Range | undefined {
  const [bottom, top] = range.split('-');

  if (!bottom || !top) return;

  return [parseDenaryInt(bottom), parseDenaryInt(top)];
}

export function countAllPossibleFreshIngredients(sampleData: string[]): number {
  const splitIndex = sampleData.findIndex((string) => string === '');

  const freshRanges = sampleData
    .slice(0, splitIndex)
    .map(parseRange)
    .filter((range) => range !== undefined)
    .sort((rangeA, rangeB) => rangeA[0]! - rangeB[0]!);

  let flattendRanges = <Range[]>[];
  while (freshRanges.length !== 0) {
    let range = freshRanges.shift()!;

    let nextRange = freshRanges.shift();
    while (nextRange !== undefined) {
      const mergedRange = mergeRanges(range, nextRange);

      if (!mergedRange) {
        flattendRanges.push(range);
        range = nextRange;
      } else {
        range = mergedRange;
      }

      nextRange = freshRanges.shift();
    }

    flattendRanges.push(range);
  }

  return flattendRanges.reduce((total, [bottom, top]) => {
    return total + top - bottom + 1;
  }, 0);
}

function isOverlapping(
  [bottomA, topA]: Range,
  [bottomB, topB]: Range
): boolean {
  return (
    isInRange(bottomA, topA + 1, bottomB) || isInRange(bottomA, topA + 1, topB)
  );
}

export function mergeRanges(rangeA: Range, rangeB: Range): Range | undefined {
  if (!isOverlapping(rangeA, rangeB)) return;

  const bottom = Math.min(...[rangeA, rangeB].map(([bottom]) => bottom));
  const top = Math.max(...[rangeA, rangeB].map(([, top]) => top));

  return [bottom, top];
}
