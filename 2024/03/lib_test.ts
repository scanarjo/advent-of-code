import { assertEquals } from '@std/assert';

import { executeInstruction, findMulInstructions } from './lib.ts';

Deno.test('FindMulInstructions', async (t) => {
  await t.step('it should correctly find all mul instructions', () => {
    assertEquals(
      findMulInstructions(
        'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))',
      ),
      [
        { instruction: 'mul', x: 2, y: 4 },
        { instruction: 'mul', x: 5, y: 5 },
        { instruction: 'mul', x: 11, y: 8 },
        { instruction: 'mul', x: 8, y: 5 },
      ],
    );
  });
});

Deno.test('ExecuteInstruction', async (t) => {
  await t.step('it should correctly execute a "mul" instruction', () => {
    assertEquals(executeInstruction({ instruction: 'mul', x: 2, y: 3 }), 6);
    assertEquals(executeInstruction({ instruction: 'mul', x: 3, y: 5 }), 15);
  });
});
