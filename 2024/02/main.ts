import { readLinesFromFileBuffer } from '../utils.ts';
import { isSafe, parseReport } from './lib.ts';

const buffer = Deno.readFileSync('./input.txt');

const lines = readLinesFromFileBuffer(buffer);

const reports = lines.map(parseReport);

const countResults = (results: boolean[]) => results.filter(Boolean).length;

const safeReportCount = countResults(
  reports.map((report) => isSafe(report)),
);

console.log('Part 1: There are', safeReportCount, 'safe reports');

const safeEnoughReportCount = countResults(
  reports.map((report) => isSafe(report, 1)),
);

console.log('Part 2: There are', safeEnoughReportCount, 'safe enough reports');
