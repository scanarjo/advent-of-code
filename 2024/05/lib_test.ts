import { assertEquals } from '@std/assert/equals';

import { splitIntoLines } from '../utils.ts';
import {
  calculateUpdatesScore,
  fixInvalidUpdates,
  getInvalidUpdates,
  parseInput,
  validateUpdates,
} from './lib.ts';

const sample = `
29|13
47|13
47|29
47|53
47|61
53|13
53|29
61|13
61|29
61|53
75|13
75|29
75|47
75|53
75|61
97|13
97|29
97|47
97|53
97|61
97|75

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

Deno.test('parseInput', async (t) => {
  await t.step('it should parse the rules correctly', () => {
    const input = splitIntoLines(sample);

    const { rules } = parseInput(input);

    assertEquals(rules.get(53), new Set([29, 13]));
  });

  await t.step('it should parse the updates correctly', () => {
    const input = splitIntoLines(sample);

    const { updates } = parseInput(input);

    assertEquals(updates[2], [75, 29, 13]);
  });
});

Deno.test('validateUpdates', async (t) => {
  await t.step('it should identify the valid updates correctly', () => {
    const input = splitIntoLines(sample);

    const { rules, updates } = parseInput(input);

    assertEquals(validateUpdates(rules, updates), [
      [75, 47, 61, 53, 29],
      [97, 61, 53, 29, 13],
      [75, 29, 13],
    ]);
  });
});

Deno.test('calculateUpdatesScore', async (t) => {
  await t.step(
    'it should give the correct score for a sequence of updates',
    () => {
      assertEquals(
        calculateUpdatesScore([
          [75, 47, 61, 53, 29],
          [97, 61, 53, 29, 13],
          [75, 29, 13],
        ]),
        143,
      );
    },
  );
});

Deno.test('fixInvalidUpdates', async (t) => {
  await t.step('it should produce a set of valid updates', () => {
    const input = splitIntoLines(sample);

    const { rules, updates } = parseInput(input);

    const invalidUpdates = getInvalidUpdates(rules, updates);

    assertEquals(invalidUpdates, [
      [75, 97, 47, 61, 53],
      [61, 13, 29],
      [97, 13, 75, 29, 47],
    ]);

    const fixed = fixInvalidUpdates(rules, invalidUpdates);

    assertEquals(fixed, [
      [97, 75, 47, 61, 53],
      [61, 29, 13],
      [97, 75, 47, 29, 13],
    ]);
  });
});
