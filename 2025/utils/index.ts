export async function readLinesFromFile(path: string) {
  const inputFile = Bun.file(path);

  const fileContents = await inputFile.text();

  return fileContents.trimEnd().split(/[\r\n]/);
}
