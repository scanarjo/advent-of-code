import { describe, expect, it } from 'bun:test';
import { readLinesFromFile } from 'utils';

import {
  countAccessibleRolls,
  removeAllAccessibleRolls,
} from './forklift-checker';

const sampleData = await readLinesFromFile(__dirname + '/sample.txt');

describe('countAccessibleRolls', () => {
  it('should correctly count the accessible rolls in the sample data', () => {
    expect(countAccessibleRolls(sampleData)).toBe(13);
  });

  it('should correctly count the rolls in a single row grid', () => {
    expect(countAccessibleRolls(['...@...'])).toBe(1);
  });
});

describe('countAccessibleRollsProgressively', () => {
  it('should correctly count the accessible rolls with successive passes for the sample data', () => {
    expect(removeAllAccessibleRolls(sampleData)).toBe(43);
  });
});
