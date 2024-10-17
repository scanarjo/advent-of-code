import { assertEquals } from '@std/assert';
import { countSteps, parseNodeData } from './navigate.ts';

Deno.test('count steps to ZZZ', () => {
  assertEquals(
    countSteps(
      'RL',
      [
        ['AAA', 'BBB', 'CCC'],
        ['BBB', 'DDD', 'EEE'],
        ['CCC', 'ZZZ', 'GGG'],
        ['DDD', 'DDD', 'DDD'],
        ['EEE', 'EEE', 'EEE'],
        ['GGG', 'GGG', 'GGG'],
        ['ZZZ', 'ZZZ', 'ZZZ'],
      ],
    ),
    2,
  );

  assertEquals(
    countSteps(
      'LLR',
      [
        ['AAA', 'BBB', 'BBB'],
        ['BBB', 'AAA', 'ZZZ'],
        ['ZZZ', 'ZZZ', 'ZZZ'],
      ],
    ),
    6,
  );
});

Deno.test('parse node data', () => {
  assertEquals(
    parseNodeData([
      'AAA = (BBB, CCC)',
      'BBB = (DDD, EEE)',
      'CCC = (ZZZ, GGG)',
      'DDD = (DDD, DDD)',
      'EEE = (EEE, EEE)',
      'GGG = (GGG, GGG)',
      'ZZZ = (ZZZ, ZZZ)',
    ]),
    [
      ['AAA', 'BBB', 'CCC'],
      ['BBB', 'DDD', 'EEE'],
      ['CCC', 'ZZZ', 'GGG'],
      ['DDD', 'DDD', 'DDD'],
      ['EEE', 'EEE', 'EEE'],
      ['GGG', 'GGG', 'GGG'],
      ['ZZZ', 'ZZZ', 'ZZZ'],
    ],
  );
});
