import { always, cond, matchArrayElementsFromStart } from '../utils/fp.ts';
import { clamp } from '../utils/math.ts';
import {
  countCards,
  getCardsInHand,
  groupCardsInHand,
  scoreCard,
} from './camel-cards.ts';
import type { Hand } from './types.ts';

const matchCardCounts = (counts: number[]) => (hand: string) =>
  matchArrayElementsFromStart(countCardsWithJokers(hand), counts);

const isFiveOfAKind = matchCardCounts([5]); // [5]

const isFourOfAKind = matchCardCounts([4]); // [4, 1]

const isFullHouse = matchCardCounts([3, 2]); // [3, 2]

const isThreeOfAKind = matchCardCounts([3, 1]); // [3, 1, 1]

const isTwoPair = matchCardCounts([2, 2]); // [2, 2, 1]

const isOnePair = matchCardCounts([2, 1]); // [2, 1, 1, 1]

const rankHand = (hand: Hand) => {
  const rank = cond([
    [isFiveOfAKind, always(6)],
    [isFourOfAKind, always(5)],
    [isFullHouse, always(4)],
    [isThreeOfAKind, always(3)],
    [isTwoPair, always(2)],
    [isOnePair, always(1)],
  ])(hand.cards);

  return rank ?? 0;
};

const countCache = new Map<string, number[]>();

const countCardsWithJokers = (hand: string): number[] => {
  const cached = countCache.get(hand);
  if (cached) {
    return cached;
  }

  if (!hand.includes('J') || hand === 'JJJJJ') {
    const count = countCards(hand);

    countCache.set(hand, count);

    return count;
  }

  const grouped = groupCardsInHand(hand);

  const numberOfJokers = grouped['J'];

  const sortedEntries = Object.entries(grouped).sort((a, b) => b[1] - a[1]);

  const withoutJokers = sortedEntries.filter(([card]) => card !== 'J');

  const counts = withoutJokers.map(([, count]) => count);

  counts[0] += numberOfJokers;

  countCache.set(hand, counts);

  return counts;
};

const clampRankDifference = clamp(-1, 1);

const sortHandsWithJokers = (hands: Hand[]): Hand[] => {
  return hands.sort((firstHand, secondHand) => {
    const rankingDifference = clampRankDifference(
      rankHand(firstHand) - rankHand(secondHand),
    );

    if (rankingDifference !== 0) {
      return rankingDifference;
    }

    const firstCards = getCardsInHand(firstHand.cards);
    const secondCards = getCardsInHand(secondHand.cards);

    for (let i = 0; i < 5; i++) {
      const firstCard = firstCards[i];
      const secondCard = secondCards[i];

      if (firstCard === secondCard) {
        continue;
      }

      if (firstCard === 'J') {
        return -1;
      }

      if (secondCard === 'J') {
        return 1;
      }

      return (scoreCard(firstCard) ?? NaN) - (scoreCard(secondCard) ?? NaN);
    }

    return 0;
  });
};

export const calculateWinningsWithJokers = (hands: Hand[]): number => {
  const sortedHands = sortHandsWithJokers(hands);

  return sortedHands.reduce((total, hand, i) => {
    return total + hand.bet * (i + 1);
  }, 0);
};
