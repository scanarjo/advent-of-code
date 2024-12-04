import { assertArrayIncludes, assertEquals } from '@std/assert';

import { splitIntoLines } from '../utils.ts';
import {
  countGridOccurences,
  countOccurences,
  getColumns,
  getDiagonals,
} from './lib.ts';

Deno.test('countOccurrences', async (t) => {
  await t.step(
    'it should count the occurrences of the specified substring',
    () => {
      assertEquals(countOccurences('XMAS', 'ABCXMASXMASDEF'), 2);
    },
  );
});

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

Deno.test('countGridOccurences', async (t) => {
  await t.step(
    'it should count all occurrences of the target word in the grid',
    () => {
      const rows = splitIntoLines(sample);

      assertEquals(countGridOccurences('XMAS', rows), 18);
    },
  );
});
