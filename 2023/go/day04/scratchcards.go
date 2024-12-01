package scratchcards

import (
	"math"
	"strconv"
	"strings"
)

type Card struct {
	Id          int
	Winners     []int
	YourNumbers []int
	Copies      int
}

func (card Card) MatchCount() int {
	matches := 0

	for _, number := range card.YourNumbers {
		for _, winner := range card.Winners {
			if number == winner {
				matches++
			}
		}
	}

	return matches
}

func (card Card) IncorrectScore() int {
	matches := card.MatchCount()

	if matches == 0 {
		return 0
	}

	return int(math.Pow(2, float64(matches-1)))
}

func parseNumberList(numbers string) []int {
	var result []int

	for _, number := range strings.Split(numbers, " ") {
		parsedNumber, _ := strconv.Atoi(number)

		if parsedNumber != 0 {
			result = append(result, parsedNumber)
		}
	}

	return result
}

func MakeCard(line string) Card {
	card := Card{}

	headerAndRest := strings.Split(line, ": ")

	card.Id, _ = strconv.Atoi(headerAndRest[0][5:])

	numbers := strings.Split(headerAndRest[1], " | ")

	card.Winners = parseNumberList(numbers[0])
	card.YourNumbers = parseNumberList(numbers[1])

	card.Copies = 1

	return card
}

func ScoreCardStack(cards []Card) int {
	score := 0

	for i, card := range cards {
		matches := card.MatchCount()

		for j := i + 1; j <= i+matches; j++ {
			if j < len(cards) {
				cards[j].Copies += card.Copies
			}
		}

		score += card.Copies
	}

	return score
}
