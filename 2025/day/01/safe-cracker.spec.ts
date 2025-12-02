import { expect, it } from 'bun:test';

import { rotateDial } from './safe-cracker';

it("should give 0 when executing 'R49' from 50", () => {
  const result = rotateDial(50, 'R49');

  expect(result.zeroClicks).toBe(0);
});

it("should give 1 when executing 'R49' from 51", () => {
  const result = rotateDial(51, 'R49');

  expect(result.zeroClicks).toBe(1);
});

it("should give 0 when executing 'R0' from 0", () => {
  const result = rotateDial(0, 'R0');

  expect(result.zeroClicks).toBe(0);
});

it("should give 0 when executing 'L0' from 0", () => {
  const result = rotateDial(0, 'L0');

  expect(result.zeroClicks).toBe(0);
});

it("should give 0 when executing 'R0' from 0", () => {
  const result = rotateDial(0, 'R0');

  expect(result.zeroClicks).toBe(0);
});

it("should give 1 when executing 'R100' from 0", () => {
  const result = rotateDial(0, 'R100');

  expect(result.zeroClicks).toBe(1);
});

it("should give 1 when executing 'L100' from 0", () => {
  const result = rotateDial(0, 'L100');

  expect(result.zeroClicks).toBe(1);
});

it("should give 1 when executing 'R100' from 0", () => {
  const result = rotateDial(0, 'R100');

  expect(result.zeroClicks).toBe(1);
});

it("should give 1 when executing 'L50' from 50", () => {
  const result = rotateDial(50, 'L50');

  expect(result.zeroClicks).toBe(1);
});

it('should give 1 when executing L20 from 10', () => {
  const result = rotateDial(10, 'L20');

  expect(result.zeroClicks).toBe(1);
});

it('should give 1 when executing R20 from 90', () => {
  const result = rotateDial(90, 'R20');

  expect(result.zeroClicks).toBe(1);
});

it('should give 7 when executing L795 from 0', () => {
  const result = rotateDial(0, 'L795');

  expect(result.zeroClicks).toBe(7);
});
