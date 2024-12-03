import { assertEquals } from '@std/assert';
import { isSafe, isSafeEnough, parseReport } from './lib.ts';

Deno.test('Report Safety', async (t) => {
  await t.step(
    'it should identify a report as safe if all numbers are decreasing or increasing',
    () => {
      assertEquals(isSafe([4, 3, 2, 1]), true);
      assertEquals(isSafe([1, 2, 3, 4]), true);

      assertEquals(isSafe([1, 2, 4, 3]), false);
      assertEquals(isSafe([4, 3, 1, 2]), false);
    },
  );

  await t.step(
    'it should identify a report as safe if the numbers only increase or decrease by 1, 2 or 3',
    () => {
      assertEquals(isSafe([1, 3, 5, 7]), true);
      assertEquals(isSafe([10, 7, 5, 4, 1]), true);

      assertEquals(isSafe([1, 5, 6, 7]), false);
      assertEquals(isSafe([1, 1, 2, 3]), false);
    },
  );

  await t.step(
    'if the tolerance it set it should allow a number of failures',
    () => {
      assertEquals(isSafeEnough([1, 3, 2, 4, 5]), true);
    },
  );
});

Deno.test('Report parsing', async (t) => {
  await t.step('it should correctly parse a report', () => {
    assertEquals(parseReport('1 2 3 4 5'), [1, 2, 3, 4, 5]);
    assertEquals(parseReport('5 4 3 2 1'), [5, 4, 3, 2, 1]);
  });
});
