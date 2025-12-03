import { readLinesFromFile } from 'utils';
import { findTotalJoltage } from './max-joltage';

const lines = await readLinesFromFile('input.txt');

const part1Answer = findTotalJoltage(lines);

console.log(`The answer for part 1 is: ${part1Answer}`);
