import { fetchPuzzleInputLines } from '../utils.ts';
import { isSafe, isSafeEnough, parseReport } from './lib.ts';

const lines = await fetchPuzzleInputLines(2024, 2);

const reports = lines.map(parseReport);

Deno.bench('isSafe', () => {
  reports.map(isSafe);
});

Deno.bench('isSafeEnough', () => {
  reports.map(isSafeEnough);
});
