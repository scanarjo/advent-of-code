export function isValidID(id: string): boolean {
  if (id.startsWith('0')) return false;

  if (id.length % 2 === 1) return true;

  const start = id.slice(0, id.length / 2);

  const end = id.slice(id.length / 2);

  return start !== end;
}

export function isValidVersion2ID(id: string): boolean {
  if (id.startsWith('0')) return false;

  if (id.length < 2) return true;

  let sequenceLengthsToCheck = [1];

  for (let n = 2; n <= id.length / 2; n++) {
    if (Number.isInteger(id.length / n)) sequenceLengthsToCheck.push(n);
  }

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
