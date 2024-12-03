import { assertEquals } from '@std/assert';

import { findInstructions, findMulInstructions } from './lib.ts';

Deno.test('findMulInstructions', async (t) => {
  await t.step('it should correctly find all mul instructions', () => {
    assertEquals(
      findMulInstructions(
        'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))',
      ),
      [
        { type: 'mul', x: 2, y: 4 },
        { type: 'mul', x: 5, y: 5 },
        { type: 'mul', x: 11, y: 8 },
        { type: 'mul', x: 8, y: 5 },
      ],
    );
  });
});

Deno.test('findInstructions', async (t) => {
  await t.step('it should pull out "mul", "do" and "dont" instructions', () => {
    assertEquals(
      findInstructions(
        `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
      ),
      [
        { type: 'mul', x: 2, y: 4 },
        { type: 'dont' },
        { type: 'mul', x: 5, y: 5 },
        { type: 'mul', x: 11, y: 8 },
        { type: 'do' },
        { type: 'mul', x: 8, y: 5 },
      ],
    );
  });
});
