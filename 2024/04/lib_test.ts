import { assertEquals } from '@std/assert';

import { splitIntoLines } from '../utils.ts';
import { countCrossMASOccurrences, countXMASOccurrences } from './lib.ts';

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

const lines = splitIntoLines(sample);

Deno.test('countXMASOccurrences', async (t) => {
  await t.step(
    'it should count all occurrences of the target word in the grid',
    () => {
      assertEquals(countXMASOccurrences(lines), 18);
    },
  );
});

Deno.test('countCrossMASOccurrences', async (t) => {
  await t.step(
    'it should correctly count the occurrences in the sample',
    () => {
      assertEquals(countCrossMASOccurrences(lines), 9);
    },
  );
});
