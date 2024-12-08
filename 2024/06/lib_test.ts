import { assertEquals } from '@std/assert';

import { splitIntoLines } from '../utils.ts';
import { countVisited, findStart } from './lib.ts';

const sample = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`;

const grid = splitIntoLines(sample);

Deno.test('findStart', async (t) => {
  await t.step('it should find the correct starting point', () => {
    assertEquals(findStart(grid), [4, 6]);
  });
});

Deno.test('countVisited', async (t) => {
  await t.step('it should correctly count the visited squares', () => {
    assertEquals(countVisited(grid), 41);
  });
});
