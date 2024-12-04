import { env } from 'node:process';

const splitIntoLines = (text: string): string[] => {
  return text.trimEnd().split(/\r?\n/);
};

export const fetchPuzzleInput = async (
  year: number,
  day: number,
): Promise<string> => {
  try {
    console.log('Reading cached input file...');

    const text = await Deno.readTextFile('input.txt');

    console.log('File found');

    return text;
  } catch {
    console.log('Failed to read cached file. Fetching from network...');

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

    console.log('Input fetched from network');

    const text = await response.text();

    await Deno.writeTextFile('input.txt', text);

    console.log('File cached');

    return text;
  }
};

export const fetchPuzzleInputLines = async (year: number, day: number) => {
  const input = await fetchPuzzleInput(year, day);

  return splitIntoLines(input);
};
