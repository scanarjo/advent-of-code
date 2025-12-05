export function countFreshIngredients(sampleData: string[]): number {
  const splitIndex = sampleData.findIndex((string) => string === '');

  const freshRanges = sampleData.slice(0, splitIndex);

  const ingredientIds = sampleData.slice(splitIndex + 1);

  return ingredientIds.length;
}
