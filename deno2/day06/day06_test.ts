import { assertEquals } from '@std/assert';
import { marginForError, waysToWin } from './boat-races.ts';

Deno.test('calculate the number of ways to win a single race', () => {
  assertEquals(waysToWin(7, 9), 4);
  assertEquals(waysToWin(15, 40), 8);
  assertEquals(waysToWin(30, 200), 9);
});

Deno.test('calculate the margin for error', () => {
  assertEquals(marginForError([7, 15, 30], [9, 40, 200]), 4 * 8 * 9);
});
