import { parseDenaryInt } from 'utils';

function isInRange(min: number, max: number, n: number) {
  return n >= min && n < max;
}

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
export function countAllPossibleFreshIngredients(sampleData: string[]): number {
  const splitIndex = sampleData.findIndex((string) => string === '');

  const freshRanges = sampleData
    .slice(0, splitIndex)
    .map((range) => range.split('-'))
    .map((range) => range.map(parseDenaryInt))
    .sort((rangeA, rangeB) => rangeA[0]! - rangeB[0]!);

  const min = freshRanges[0]![0]!;

  const adjustedRanges = freshRanges.map((range) => range.map((n) => n - min));

  console.log(adjustedRanges);

  const freshIds = new Set<number>();
  for (const range of freshRanges) {
    const min = range[0]!;
    const max = range[1]!;

    for (let n = min; n < max + 1; n++) {
      freshIds.add(n);
    }
  }

  return freshIds.size;
}
