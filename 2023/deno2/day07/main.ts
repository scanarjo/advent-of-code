import { readInputFile } from '../utils/fs.ts';
import { calculateWinnings } from './camel-cards.ts';
import { calculateWinningsWithJokers } from './jokers.ts';
import { parseHand } from './parsing.ts';

const input = readInputFile(import.meta.dirname);

const hands = input.map(parseHand);

console.log('Answer for part I:', calculateWinnings(hands));
console.log('Answer for part II:', calculateWinningsWithJokers(hands));

Deno.bench('Part I', () => {
  calculateWinnings(hands);
});

Deno.bench('Part II', () => {
  calculateWinningsWithJokers(hands);
});
