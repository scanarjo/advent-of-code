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
