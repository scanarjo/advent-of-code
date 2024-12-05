import { fetchPuzzleInputLines } from '../utils.ts';
import { calculateUpdatesScore, parseInput, validateUpdates } from './lib.ts';

const lines = await fetchPuzzleInputLines(2024, 5);

const { rules, updates } = parseInput(lines);

const validUpdates = validateUpdates(rules, updates);

const score = calculateUpdatesScore(validUpdates);

console.log('Part 1: The score for the valid updates is', score);
