import { describe, expect, it } from 'bun:test';
import { readLinesFromFile } from 'utils';

import {
  countAllPossibleFreshIngredients,
  countFreshIngredients,
  mergeRanges,
} from './ingredient-checker';

const sampleData = await readLinesFromFile(__dirname + '/sample.txt');
const inputDate = await readLinesFromFile(__dirname + '/input.txt');

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

  it('should count the correct number of possible fresh ingredients in the input data', () => {
    expect(countAllPossibleFreshIngredients(inputDate)).toBe(352340558684863);
  });
});

describe('mergeRanges', () => {
  it('should merge overlapping ranges correctly', () => {
    expect(mergeRanges([5, 10], [7, 15])).toEqual([5, 15]);
    expect(mergeRanges([7, 15], [5, 10])).toEqual([5, 15]);
  });

  it('should return undefined if ranges do not overlap', () => {
    expect(mergeRanges([0, 5], [6, 10])).toBe(undefined);
    expect(mergeRanges([6, 10], [0, 5])).toBe(undefined);
  });
});
