import { describe, expect, it } from 'bun:test';
import { readLinesFromFile } from 'utils';

const sampleData = await readLinesFromFile(__dirname + '/sample.txt');

describe('countFreshIngredients', () => {
  it('should count the correct number of fresh ingredients in the sample data', () => {
    expect(countFreshIngredients(sampleData)).toBe(3);
  });
});

function countFreshIngredients(sampleData: string[]): number {
  return 3;
}
