import type { Hand } from './types.ts';

export const parseHand = (input: string): Hand => {
  const [hand, count] = input.split(' ');

  return { cards: hand, bet: parseInt(count, 10) };
};
