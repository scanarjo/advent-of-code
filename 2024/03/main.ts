import { fetchPuzzleInput } from '../utils.ts';
import {
  executeInstructions,
  findInstructions,
  findMulInstructions,
} from './lib.ts';

const input = await fetchPuzzleInput(2024, 3);

const instructions = findMulInstructions(input);

const total = executeInstructions(instructions);

console.log('Part 1: Total is', total);

const newInstructions = findInstructions(input);

console.log('Part 2: Total is', executeInstructions(newInstructions));
