import { isSafe, parseReport } from './lib.ts';

const decoder = new TextDecoder('utf-8');

const buffer = Deno.readFileSync('./input.txt');

const text = decoder.decode(buffer);

const lines = text.split(/[\r\n]+/).filter((line) => line !== '');

const safeReportCount =
  lines.map(parseReport).map(isSafe).filter((result) => result === true).length;

console.log('Part 1: There are ', safeReportCount, ' safe reports');
