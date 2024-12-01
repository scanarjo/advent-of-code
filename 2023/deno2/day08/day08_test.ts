import { assertEquals } from '@std/assert';
import {
  countSteps,
  countStepsWithSecondStrategy,
  parseNodeData,
} from './navigate.ts';

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

Deno.test('count steps with second strategy', () => {
  assertEquals(
    countStepsWithSecondStrategy(
      'LR',
      parseNodeData([
        '11A = (11B, XXX)',
        '11B = (XXX, 11Z)',
        '11Z = (11B, XXX)',
        '22A = (22B, XXX)',
        '22B = (22C, 22C)',
        '22C = (22Z, 22Z)',
        '22Z = (22B, 22B)',
        'XXX = (XXX, XXX)',
      ]),
    ),
    6,
  );
});
