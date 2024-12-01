export const distance = (a: number, b: number): number => {
  return Math.abs(a - b);
};

export const listDistance = (listA: number[], listB: number[]): number => {
  const sortedA = listA.toSorted();
  const sortedB = listB.toSorted();

  let totalDistance = 0;
  for (let i = 0; i < sortedA.length; i++) {
    totalDistance += distance(sortedA[i], sortedB[i]);
  }

  return totalDistance;
};
