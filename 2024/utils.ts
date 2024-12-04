import { env } from 'node:process';

export const readLinesFromFileBuffer = (buffer: Uint8Array) => {
  const decoder = new TextDecoder('utf-8');

  const text = decoder.decode(buffer);

  return text.split(/\r?\n/).filter((line) => line !== '');
};

export const fetchPuzzleInput = async (
  year: number,
  day: number,
): Promise<string> => {
  const sessionToken = env.SESSION;

  if (!sessionToken) throw new Error('SESSION variable must be set');

  const response = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: {
        cookie: `session=${sessionToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.text();
};
