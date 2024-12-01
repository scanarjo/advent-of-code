import { resolve } from '@std/path';

export const readInputFile = (dir: string = Deno.cwd()): string[] => {
  const path = resolve(dir, 'input.txt');

  const file = Deno.readTextFileSync(path);

  return file.split(Deno.build.os === 'windows' ? '\r\n' : '\n').filter(
    Boolean,
  );
};
