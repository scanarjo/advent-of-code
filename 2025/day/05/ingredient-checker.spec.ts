import { describe, expect, it } from 'bun:test';
import { readLinesFromFile } from 'utils';

import {
  countAllPossibleFreshIngredients,
  countFreshIngredients,
} from './ingredient-checker';

const sampleData = await readLinesFromFile(__dirname + '/sample.txt');

describe('countFreshIngredients', () => {
  it('should count the correct number of fresh ingredients in the sample data', () => {
    expect(countFreshIngredients(sampleData)).toBe(3);
  });

  it('should count the correct number of ingredients when they are all fresh', () => {
    expect(countFreshIngredients(['1-10', '', '1', '2'])).toBe(2);
    expect(countFreshIngredients(['1-10', '', '1', '2', '3', '4'])).toBe(4);
  });
});

describe('countAllPossibleFreshIngredients', () => {
  it('should count the correct number of possible fresh ingredients in the sample data', () => {
    expect(countAllPossibleFreshIngredients(sampleData)).toBe(14);
  });
});
