import { assertEquals } from '@std/assert';
import { calculateWinnings, sortHands } from './camel-cards.ts';
import { calculateWinningsWithJokers } from './jokers.ts';
import { parseHand } from './parsing.ts';

Deno.test('parse hand from encoded text', () => {
  assertEquals(parseHand('AAAAA 123'), { cards: 'AAAAA', bet: 123 });
});

Deno.test('sort hands', () => {
  assertEquals(
    sortHands([
      { cards: 'KKKKK', bet: 0 },
      { cards: 'A2345', bet: 0 },
      { cards: 'AAAAA', bet: 0 },
      { cards: 'QQQKK', bet: 0 },
      { cards: 'AAAKK', bet: 0 },
      { cards: '23459', bet: 0 },
    ]),
    [
      { cards: '23459', bet: 0 },
      { cards: 'A2345', bet: 0 },
      { cards: 'QQQKK', bet: 0 },
      { cards: 'AAAKK', bet: 0 },
      { cards: 'KKKKK', bet: 0 },
      { cards: 'AAAAA', bet: 0 },
    ],
  );
});

Deno.test('calculate winnings', () => {
  assertEquals(
    calculateWinnings([
      { cards: '32T3K', bet: 765 },
      { cards: 'T55J5', bet: 684 },
      { cards: 'KK677', bet: 28 },
      { cards: 'KTJJT', bet: 220 },
      { cards: 'QQQJA', bet: 483 },
    ]),
    6440,
  );
});

Deno.test('calculate winnings using Jokers', () => {
  assertEquals(
    calculateWinningsWithJokers([
      { cards: '32T3K', bet: 765 },
      { cards: 'T55J5', bet: 684 },
      { cards: 'KK677', bet: 28 },
      { cards: 'KTJJT', bet: 220 },
      { cards: 'QQQJA', bet: 483 },
    ]),
    5905,
  );
});
