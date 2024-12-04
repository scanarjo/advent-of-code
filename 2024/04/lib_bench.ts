import { fetchPuzzleInputLines } from '../utils.ts';
import { countCrossMASOccurrences, countGridOccurrences } from './lib.ts';

const lines = await fetchPuzzleInputLines(2024, 4);

Deno.bench('XMAS search', () => {
  countGridOccurrences('XMAS', lines);
});

Deno.bench('X-MAS search', () => {
  countCrossMASOccurrences(lines);
});
