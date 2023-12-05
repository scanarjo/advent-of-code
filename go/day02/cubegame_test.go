package cubegame

import (
	"bufio"
	"os"
	"testing"
)

func TestGameIDParsing(t *testing.T) {
	input := "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
	expected := 1

	game := ParseGame(input)

	actual := game.id

	if actual != expected {
		t.Errorf("Expected %v, but got %v", expected, actual)
	}
}

func TestGameHandsParsing(t *testing.T) {
	input := "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
	expected := []Hand{
		{Red: 4, Green: 0, Blue: 3},
		{Red: 1, Green: 2, Blue: 6},
		{Red: 0, Green: 2, Blue: 0},
	}

	game := ParseGame(input)

	actual := game.hands

	if len(actual) != len(expected) {
		t.Errorf("Expected %v, but got %v", expected, actual)
	}

	for i := 0; i < len(actual); i++ {
		if actual[i] != expected[i] {
			t.Errorf("Expected %v, but got %v", expected[i], actual[i])
		}
	}
}

func TestGameHandTest(t *testing.T) {
	input := "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
	expected := true

	game := ParseGame(input)

	actual := game.TestPossible(Hand{Red: 12, Green: 13, Blue: 14})

	if actual != expected {
		t.Errorf("Expected %v, but got %v", expected, actual)
	}
}

func TestGameHandTest2(t *testing.T) {
	input := "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
	expected := false

	game := ParseGame(input)

	actual := game.TestPossible(Hand{Red: 12, Green: 13, Blue: 14})

	if actual != expected {
		t.Errorf("Expected %v, but got %v", expected, actual)
	}
}

func TestPossibleGames(t *testing.T) {
	expected := 2101

	file, _ := os.Open("input.txt")

	defer file.Close()

	possibleGameIDSum := 0
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()

		game := ParseGame(line)

		if game.TestPossible(Hand{Red: 12, Green: 13, Blue: 14}) {
			possibleGameIDSum += game.id
		}
	}

	if possibleGameIDSum != expected {
		t.Errorf("Expected %v, but got %v", expected, possibleGameIDSum)
	}
}

func TestMinimumPossibleHand(t *testing.T) {
	input := "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
	expected := Hand{Red: 4, Green: 2, Blue: 6}

	game := ParseGame(input)

	actual := game.GetMinimumPossibleHand()

	if actual != expected {
		t.Errorf("Expected %v, but got %v", expected, actual)
	}
}

func TestHandPowerForInputFile(t *testing.T) {
	expected := 58269

	file, _ := os.Open("input.txt")

	defer file.Close()

	powerSum := 0
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()

		game := ParseGame(line)

		powerSum += game.GetMinimumPossibleHand().GetPower()
	}

	if powerSum != expected {
		t.Errorf("Expected %v, but got %v", expected, powerSum)
	}
}
