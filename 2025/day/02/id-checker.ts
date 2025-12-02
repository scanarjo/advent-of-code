export function isValidID(id: string): boolean {
  if (id.startsWith('0')) return false;

  if (id.length % 2 === 1) return true;

  const start = id.slice(0, id.length / 2);

  const end = id.slice(id.length / 2);

  return start !== end;
}

const sequenceCache = new Map<number, number[]>();
function getValidSequenceLengths(n: number): number[] {
  const cached = sequenceCache.get(n);

  if (cached) return cached;

  let sequenceLengthsToCheck = [1];

  for (let i = 2; i <= n / 2; i++) {
    if (Number.isInteger(n / i)) sequenceLengthsToCheck.push(i);
  }

  sequenceCache.set(n, sequenceLengthsToCheck);

  return sequenceLengthsToCheck;
}

export function isValidVersion2ID(id: string): boolean {
  if (id.startsWith('0')) return false;

  if (id.length < 2) return true;

  let sequenceLengthsToCheck = getValidSequenceLengths(id.length);

  for (const n of sequenceLengthsToCheck) {
    const seq = id.slice(0, n);

    let slices = [];
    for (let i = n; i + n < id.length + 1; i += n) {
      const slice = id.slice(i, i + n);

      slices.push(slice);
    }

    if (slices.every((slice) => slice === seq)) {
      return false;
    }
  }

  return true;
}

export function findInvalidIDsInRange(
  startID: string,
  endID: string,
  predicate = isValidID
): number[] {
  const startNumber = Number.parseInt(startID, 10);
  const endNumber = Number.parseInt(endID, 10);

  const result = [];
  for (let idNumber = startNumber; idNumber !== endNumber + 1; idNumber++) {
    const id = idNumber.toString();

    if (predicate(id) === false) {
      result.push(idNumber);
    }
  }

  return result;
}
