type readFile = (path: string) => Promise<string>

export const readInputFileToLines = (readFile: readFile) => async (path: string): Promise<string[]> => {
  const fileContent = await readFile(path);

  return fileContent.split(/[\r\n]/);
}
