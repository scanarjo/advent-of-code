import { env } from 'node:process';

export const splitIntoLines = (text: string): string[] => {
  return text.trimEnd().split(/\r?\n/);
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

export const fetchPuzzleInputLines = async (year: number, day: number) => {
  const input = await fetchPuzzleInput(year, day);

  return splitIntoLines(input);
};
