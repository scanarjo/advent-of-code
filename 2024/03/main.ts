import { fetchPuzzleInput } from '../utils.ts';
import { executeInstruction, findMulInstructions } from './lib.ts';

const input = await fetchPuzzleInput(2024, 3);

const instructions = findMulInstructions(input);

const total = instructions.map(executeInstruction).reduce(
  (sum, n) => sum += n,
  0,
);

console.log('Part 1: Total is', total);
