import { fetchPuzzleInputLines } from '../utils.ts';
import { countCrossMASOccurrences, countXMASOccurrences } from './lib.ts';

const lines = await fetchPuzzleInputLines(2024, 4);

Deno.bench('XMAS search', () => {
  countXMASOccurrences(lines);
});

Deno.bench('X-MAS search', () => {
  countCrossMASOccurrences(lines);
});
