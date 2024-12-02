import { readLinesFromFileBuffer } from '../utils.ts';
import { isSafe, parseReport } from './lib.ts';

const buffer = Deno.readFileSync('./input.txt');

const lines = readLinesFromFileBuffer(buffer);

const reports = lines.map(parseReport);

const safeReportCount = reports
  .map((report) => isSafe(report))
  .filter((result) => result === true)
  .length;

console.log('Part 1: There are', safeReportCount, 'safe reports');

const safeEnoughReportCount = reports
  .map((report) => isSafe(report, 1))
  .filter((result) => result === true)
  .length;

console.log('Part 2: There are', safeEnoughReportCount, 'safe enough reports');
