package cubegame

import (
	"strconv"
	"strings"
)

type Hand struct {
	Red   int
	Green int
	Blue  int
}

type Game struct {
	id    int
	hands []Hand
}

func ParseGame(input string) Game {
	gameAndHandsSplit := strings.Split(input, ": ")

	id, _ := strconv.Atoi(gameAndHandsSplit[0][5:])

	encodedHands := strings.Split(gameAndHandsSplit[1], "; ")

	hands := []Hand{}

	for _, encodedHand := range encodedHands {
		hand := Hand{}

		encodedCubes := strings.Split(encodedHand, ", ")

		for _, encodedCube := range encodedCubes {
			parts := strings.Split(encodedCube, " ")
			count, _ := strconv.Atoi(parts[0])
			color := parts[1]
			switch color {
			case "red":
				hand.Red = count
			case "green":
				hand.Green = count
			case "blue":
				hand.Blue = count
			}
		}

		hands = append(hands, hand)
	}

	return Game{
		id:    id,
		hands: hands,
	}
}

func (game Game) TestPossible(possibleHand Hand) bool {
	for _, hand := range game.hands {
		if hand.Red > possibleHand.Red {
			return false
		}
		if hand.Green > possibleHand.Green {
			return false
		}
		if hand.Blue > possibleHand.Blue {
			return false
		}
	}

	return true
}

func (game Game) GetMinimumPossibleHand() Hand {
	possibleHand := Hand{}

	for _, hand := range game.hands {
		if hand.Red > possibleHand.Red {
			possibleHand.Red = hand.Red
		}
		if hand.Green > possibleHand.Green {
			possibleHand.Green = hand.Green
		}
		if hand.Blue > possibleHand.Blue {
			possibleHand.Blue = hand.Blue
		}
	}

	return possibleHand
}

func (hand Hand) GetPower() int {
	return hand.Red * hand.Green * hand.Blue
}
