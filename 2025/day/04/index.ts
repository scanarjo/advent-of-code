import { readLinesFromFile } from 'utils';

import {
  countAccessibleRolls,
  removeAllAccessibleRolls,
} from './forklift-checker';

const input = await readLinesFromFile('input.txt');

console.log('Answer for part 1:', countAccessibleRolls(input));

console.log('Answer for part 2:', removeAllAccessibleRolls(input));
