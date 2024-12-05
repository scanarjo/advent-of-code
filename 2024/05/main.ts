import { fetchPuzzleInputLines } from '../utils.ts';
import {
  calculateUpdatesScore,
  fixInvalidUpdates,
  getInvalidUpdates,
  parseInput,
  validateUpdates,
} from './lib.ts';

const lines = await fetchPuzzleInputLines(2024, 5);

const { rules, updates } = parseInput(lines);

const validUpdates = validateUpdates(rules, updates);

console.log(
  'Part 1: The score for the valid updates is',
  calculateUpdatesScore(validUpdates),
);

const invalidUpdates = getInvalidUpdates(rules, updates);

const fixed = fixInvalidUpdates(rules, invalidUpdates);

console.log(
  'Part 2: The score for the fixed updates is',
  calculateUpdatesScore(fixed),
);
