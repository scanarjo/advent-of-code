import { assertEquals } from '@std/assert';

Deno.test('Example test', async (t) => {
  await t.step('it should pass', () => {
    assertEquals(1, 2);
  });
});
