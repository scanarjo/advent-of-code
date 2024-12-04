import { fetchPuzzleInputLines } from '../utils.ts';
import {
  fastListSimilarity,
  listDistance,
  listSimilarity,
  parseData,
} from './lib.ts';

const lines = await fetchPuzzleInputLines(2024, 1);

const [listA, listB] = parseData(lines);

Deno.bench('distance', () => {
  listDistance(listA, listB);
});

Deno.bench('score', () => {
  listSimilarity(listA, listB);
});

Deno.bench('fastScore', () => {
  fastListSimilarity(listA, listB);
});
