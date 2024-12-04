import { fetchPuzzleInput } from '../utils.ts';
import { listDistance, listSimilarity, parseData } from './lib.ts';

const input = await fetchPuzzleInput(2024, 1);

const [listA, listB] = parseData(input);

const distance = listDistance(listA, listB);

console.log('Answer to Part 1:', distance);

const score = listSimilarity(listA, listB);

console.log('Answer to Part 2:', score);
