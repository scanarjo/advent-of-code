package scratchcards

import (
	"bufio"
	"os"
	"reflect"
	"testing"
)

func TestCardParsing(t *testing.T) {
	expected := Card{
		Id:          1,
		Winners:     []int{41, 48, 83, 86, 17},
		YourNumbers: []int{83, 86, 6, 31, 17, 9, 48, 53},
	}

	actual := MakeCard("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53")

	if !reflect.DeepEqual(actual, expected) {
		t.Errorf("Expected %d, but got %d", expected, actual)
	}
}

func TestCardScoring(t *testing.T) {
	card := MakeCard("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53")

	expected := 8

	actual := card.IncorrectScore()

	if actual != expected {
		t.Errorf("Expected %d, but got %d", expected, actual)
	}
}

func TestCardScoringZero(t *testing.T) {
	card := MakeCard("Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36")

	expected := 0

	actual := card.IncorrectScore()

	if actual != expected {
		t.Errorf("Expected %d, but got %d", expected, actual)
	}
}

func TestCardScoresFromInput(t *testing.T) {
	file, _ := os.Open("input.txt")
	defer file.Close()

	scanner := bufio.NewScanner(file)

	expected := 15205
	actual := 0
	for scanner.Scan() {
		card := MakeCard(scanner.Text())
		actual += card.IncorrectScore()
	}

	if !reflect.DeepEqual(actual, expected) {
		t.Errorf("Expected %d, but got %d", expected, actual)
	}
}

func TestCardStackScoringFromInput(t *testing.T) {
	file, _ := os.Open("input.txt")
	defer file.Close()

	scanner := bufio.NewScanner(file)

	cards := []Card{}
	for scanner.Scan() {
		cards = append(cards, MakeCard(scanner.Text()))
	}

	expected := 6189740
	actual := ScoreCardStack(cards)

	if !reflect.DeepEqual(actual, expected) {
		t.Errorf("Expected %d, but got %d", expected, actual)
	}
}
