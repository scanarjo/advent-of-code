import {
  always,
  cond,
  equals,
  matchArrayElementsFromStart,
} from '../utils/fp.ts';
import type { Card, Hand } from './types.ts';

export const groupCardsInHand = (hand: string): Record<Card, number> => {
  const counts = {} as Record<Card, number>;

  for (const card of getCardsInHand(hand)) {
    counts[card] = counts[card] ? counts[card] + 1 : 1;
  }

  return counts;
};

const sortNumbersDesc = (list: number[]) => list.sort((a, b) => b - a);

export const countCards = (hand: string): number[] => {
  const counts = groupCardsInHand(hand);

  return sortNumbersDesc(Object.values(counts));
};

const matchCardCounts = (counts: number[]) => (hand: string) =>
  matchArrayElementsFromStart(countCards(hand), counts);

const isFiveOfAKind = matchCardCounts([5]); // [5]

const isFourOfAKind = matchCardCounts([4]); // [4, 1]

const isFullHouse = matchCardCounts([3, 2]); // [3, 2]

const isThreeOfAKind = matchCardCounts([3, 1]); // [3, 1, 1]

const isTwoPair = matchCardCounts([2, 2]); // [2, 2, 1]

const isOnePair = matchCardCounts([2, 1]); // [2, 1, 1, 1]

const NUMBER_OF_CARDS = 13;

const BONUS_BASE = NUMBER_OF_CARDS ** 5;

const getHandBonus = cond([
  [isFiveOfAKind, always(BONUS_BASE * 6)],
  [isFourOfAKind, always(BONUS_BASE * 5)],
  [isFullHouse, always(BONUS_BASE * 4)],
  [isThreeOfAKind, always(BONUS_BASE * 3)],
  [isTwoPair, always(BONUS_BASE * 2)],
  [isOnePair, always(BONUS_BASE)],
]);

const isNumberCard = (card: Card) => !isNaN(parseInt(card, 10));

export const scoreCard = cond<Card, number>([
  [isNumberCard, (card) => parseInt(card, 10) - 2],
  [equals('T'), always(8)],
  [equals('J'), always(9)],
  [equals('Q'), always(10)],
  [equals('K'), always(11)],
  [equals('A'), always(12)],
]);

export const getCardsInHand = (hand: string): Card[] =>
  hand.split('') as Card[];

const scoreHand = (hand: string): number => {
  const score = getHandBonus(hand) ?? 0;

  return score + getCardsInHand(hand).reduce(
    (total, card, i) => {
      const cardPosition = hand.length - i - 1;

      return total + (scoreCard(card) ?? NaN) * NUMBER_OF_CARDS ** cardPosition;
    },
    0,
  );
};

const compareHands = (firstHand: Hand, secondHand: Hand) => {
  return scoreHand(firstHand.cards) - scoreHand(secondHand.cards);
};

export const sortHands = (hands: Hand[]) => {
  return hands.sort(compareHands);
};

export const calculateWinnings = (hands: Hand[]) => {
  const sortedHands = sortHands(hands);

  return sortedHands.reduce((total, hand, i) => {
    return total + hand.bet * (i + 1);
  }, 0);
};
