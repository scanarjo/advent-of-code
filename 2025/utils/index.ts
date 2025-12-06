export async function readLinesFromFile(path: string) {
  const inputFile = Bun.file(path);

  const fileContents = await inputFile.text();

  return fileContents.trimEnd().split(/[\r\n]/);
}

export function parseDenaryInt(n: string): number {
  return Number.parseInt(n, 10);
}
export function isInRange(min: number, max: number, target: number) {
  return target >= min && target < max;
}
