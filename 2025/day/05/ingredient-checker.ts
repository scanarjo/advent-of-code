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
