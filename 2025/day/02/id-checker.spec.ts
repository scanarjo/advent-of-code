import { describe, expect, it } from 'bun:test';

import { findInvalidIDsInRange, isValidID } from './id-checker';

describe('isValidID', () => {
  it('should report "0101" as invalid due to the leading 0', () => {
    expect(isValidID('0101')).toBe(false);
  });

  it('should report "101" as valid', () => {
    expect(isValidID('101')).toBe(true);
  });

  it('should report "11" as invalid as it repeats itself', () => {
    expect(isValidID('11')).toBe(false);
  });

  it('should report "123" as valid as it does not repeat itself', () => {
    expect(isValidID('123')).toBe(true);
  });
});

describe('findInvalidIDsInRange', () => {
  it('should report the same number of results as there are in the range', () => {
    expect(findInvalidIDsInRange('11', '22')).toBeArrayOfSize(2);
  });

  it('should correctly identify invalid IDs in the range', () => {
    const result = findInvalidIDsInRange('11', '22');

    expect(result).toEqual([11, 22]);
  });
});
