import { resolve } from '@std/path/resolve';
import { readFileIntoLines } from '../utils/fs.ts';
import { marginForError, waysToWin } from './boat-races.ts';

const input = readFileIntoLines(
  resolve(import.meta.dirname ?? Deno.cwd(), './input.txt'),
);

const readLineData = (line: string) => {
  const [, ...dataPoints] = line.split(/[\s]+/);

  return dataPoints.map((n) => parseInt(n, 10));
};

const [times, distances] = input.map(readLineData);

console.log('Answer for part 1:', marginForError(times, distances));

const readLineDataCorrectly = (line: string) => {
  const [, ...dataPoints] = line.split(/[\s]+/);

  return parseInt(dataPoints.join(''), 10);
};

const [time, distance] = input.map(readLineDataCorrectly);

console.log(
  'Answer for part 2:',
  waysToWin(time, distance),
);
