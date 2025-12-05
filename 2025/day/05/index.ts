import { readLinesFromFile } from 'utils';
import { countFreshIngredients } from './ingredient-checker';

const input = await readLinesFromFile('input.txt');

console.log('Answer for part 1:', countFreshIngredients(input));
