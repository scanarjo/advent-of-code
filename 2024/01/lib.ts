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

export const parseData = (data: string): [number[], number[]] => {
  const listA: number[] = [];
  const listB: number[] = [];

  const lines = data.split(/[\r\n]+/);
  for (const line of lines) {
    const [a, b] = line.split(/\s+/);

    if (a === "") continue;

    listA.push(parseInt(a, 10));
    listB.push(parseInt(b, 10));
  }

  return [listA, listB];
};

export const similarity = (target: number, list: number[]): number => {
  let score = 0;
  for (const n of list) {
    if (n === target) score += target;
  }
  return score;
};

export const listSimilarity = (listA: number[], listB: number[]): number => {
  let totalScore = 0;

  for (const a of listA) {
    totalScore += similarity(a, listB);
  }

  return totalScore;
};

export const fastListSimilarity = (
  listA: number[],
  listB: number[]
): number => {
  const occurrences = listB.reduce((map, n) => {
    const count = map.get(n) ?? 0;

    map.set(n, count + 1);

    return map;
  }, new Map<number, number>());

  return listA.reduce((total, n) => {
    const occurrencesOfN = occurrences.get(n) ?? 0;
    return total + n * occurrencesOfN;
  }, 0);
};
