import { describe, expect, it } from 'bun:test';

import { findMaxJoltage } from './max-joltage';

describe('findMaxJoltage', () => {
  it('should return "98" for "987654321111111"', () => {
    expect(findMaxJoltage('987654321111111')).toBe(98);
  });

  it('should return 89 for "811111111111119"', () => {
    expect(findMaxJoltage('811111111111119')).toBe(89);
  });

  it('should return 0 for battery banks with less than 2 batteries', () => {
    expect(findMaxJoltage('')).toBe(0);
    expect(findMaxJoltage('1')).toBe(0);
  });

  it('should return 78 for "234234234234278"', () => {
    expect(findMaxJoltage('234234234234278')).toBe(78);
  });
});
