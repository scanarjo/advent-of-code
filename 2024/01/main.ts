import { fetchPuzzleInputLines } from '../utils.ts';
import { listDistance, listSimilarity, parseData } from './lib.ts';

const lines = await fetchPuzzleInputLines(2024, 1);

const [listA, listB] = parseData(lines);

const distance = listDistance(listA, listB);

console.log('Answer to Part 1:', distance);

const score = listSimilarity(listA, listB);

console.log('Answer to Part 2:', score);
