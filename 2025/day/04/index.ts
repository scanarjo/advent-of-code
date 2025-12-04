import { readLinesFromFile } from 'utils';

import { countAccessibleRolls } from './forklift-checker';

const input = await readLinesFromFile('input.txt');

console.log('Answer for part 1:', countAccessibleRolls(input));
