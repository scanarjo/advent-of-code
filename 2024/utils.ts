import { env } from 'node:process';

export const splitIntoLines = (text: string): string[] => {
  return text.trim().split(/\r?\n/);
};

const fetchPuzzleInputFromAOCWebsite = async (
  year: number,
  day: number,
  sessionToken: string,
) => {
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

    const text = await fetchPuzzleInputFromAOCWebsite(year, day, sessionToken);

    console.log('Input fetched from network');

    await Deno.writeTextFile('input.txt', text);

    console.log('File cached');

    return text;
  }
};

export const fetchPuzzleInputLines = async (year: number, day: number) => {
  const input = await fetchPuzzleInput(year, day);

  return splitIntoLines(input);
};
