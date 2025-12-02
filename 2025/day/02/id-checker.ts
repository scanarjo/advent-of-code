export function isValidID(id: string): boolean {
  if (id.startsWith('0')) return false;

  if (id.length % 2 === 1) return true;

  const start = id.slice(0, id.length / 2);

  const end = id.slice(id.length / 2);

  return start !== end;
}

export function findInvalidIDsInRange(
  startID: string,
  endID: string
): number[] {
  const startNumber = Number.parseInt(startID, 10);
  const endNumber = Number.parseInt(endID, 10);

  const result = [];
  for (let idNumber = startNumber; idNumber !== endNumber + 1; idNumber++) {
    const id = idNumber.toString();

    if (isValidID(id) === false) {
      result.push(idNumber);
    }
  }

  return result;
}
