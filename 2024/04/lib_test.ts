import { assertArrayIncludes, assertEquals } from '@std/assert';

import { splitIntoLines } from '../utils.ts';
import {
  countCrossMASOccurrences,
  countGridOccurrences,
  getColumns,
  getDiagonals,
} from './lib.ts';

Deno.test('getColumns', async (t) => {
  await t.step('it should get the correct columns from a set of rows', () => {
    assertEquals(getColumns(['ABC', 'DEF', 'GHI']), ['ADG', 'BEH', 'CFI']);
  });
});

Deno.test('getDiagonals', async (t) => {
  await t.step('it should get the diagonals from left-to-right', () => {
    const diagonals = getDiagonals(['ABC', 'DEF', 'GHI']);

    const expected = [
      'G',
      'DH',
      'AEI',
      'BF',
      'C',
      'A',
      'DB',
      'GEC',
      'HF',
      'I',
    ];

    assertArrayIncludes(diagonals, expected);
    assertEquals(diagonals.length, expected.length);
  });
});

const sample = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

Deno.test('countGridOccurrences', async (t) => {
  await t.step(
    'it should count all occurrences of the target word in the grid',
    () => {
      const rows = splitIntoLines(sample);

      assertEquals(countGridOccurrences('XMAS', rows), 18);
    },
  );
});

Deno.test('countCrossMASOccurrences', async (t) => {
  await t.step('it should correctly count the occurences in the sample', () => {
    const rows = splitIntoLines(sample);

    assertEquals(countCrossMASOccurrences(rows), 9);
  });
});
