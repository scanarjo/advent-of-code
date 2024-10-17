export const readFileIntoLines = (path: string): string[] => {
  const file = Deno.readTextFileSync(path);

  return file.split(Deno.build.os === 'windows' ? '\r\n' : '\n').filter(
    Boolean,
  );
};
