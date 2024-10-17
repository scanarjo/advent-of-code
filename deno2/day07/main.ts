import { readFileIntoLines } from '../utils/fs.ts';
import { calculateWinnings } from './camel-cards.ts';
import { calculateWinningsWithJokers } from './jokers.ts';
import { parseHand } from './parsing.ts';

import { resolve } from '@std/path';

const input = readFileIntoLines(
  resolve(import.meta.dirname ?? Deno.cwd(), './input.txt'),
);

const hands = input.map(parseHand);

console.log('Answer for part I:', calculateWinnings(hands));
console.log('Answer for part II:', calculateWinningsWithJokers(hands));

Deno.bench('Part I', () => {
  calculateWinnings(hands);
});

Deno.bench('Part II', () => {
  calculateWinningsWithJokers(hands);
});
