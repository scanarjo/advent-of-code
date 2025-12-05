import { readLinesFromFile } from 'utils';
import {
  countAllPossibleFreshIngredients,
  countFreshIngredients,
} from './ingredient-checker';

const input = await readLinesFromFile('input.txt');

console.log('Answer for part 1:', countFreshIngredients(input));

console.log('Answer for part 2:', countAllPossibleFreshIngredients(input));
