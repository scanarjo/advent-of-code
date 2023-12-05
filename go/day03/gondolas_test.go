package gondolas

import (
	"os"
	"slices"
	"strings"
	"testing"
)

func TestThreeLines(t *testing.T) {
	line1 := "467..114.."
	line2 := "...*......"
	line3 := "..35..633."

	expectedPartNumbers := []int{467, 35}

	actualPartNumbers := ParsePartNumbers(line1, line2, line3)

	if len(actualPartNumbers) != len(expectedPartNumbers) {
		t.Errorf("Expected %d part numbers, but got %d", len(expectedPartNumbers), len(actualPartNumbers))
	}

	for i := 0; i < len(expectedPartNumbers); i++ {
		if actualPartNumbers[i] != expectedPartNumbers[i] {
			t.Errorf("Expected %d, but got %d", expectedPartNumbers[i], actualPartNumbers[i])
		}
	}
}

func TestMoreLines(t *testing.T) {
	expected := []int{467, 35, 633, 617, 592, 755, 664, 598}
	actual := ParsePartNumbers(
		"467..114..",
		"...*......",
		"..35..633.",
		"......#...",
		"617*......",
		".....+.58.",
		"..592.....",
		"......755.",
		"...$.*....",
		".664.598..",
	)

	slices.Sort(actual)
	slices.Sort(expected)

	if len(actual) != len(expected) {
		t.Errorf("Expected %d part numbers, but got %d", len(expected), len(actual))
	}

	for i := 0; i < len(expected); i++ {
		if actual[i] != expected[i] {
			t.Errorf("Expected %d, but got %d", actual[i], expected[i])
		}
	}
}

func TestParsePartNumbersFromInputFile(t *testing.T) {
	expected := 549908

	content, _ := os.ReadFile("input.txt")

	lines := strings.Split(string(content), "\n")

	partNumbers := ParsePartNumbers(lines...)

	sum := 0
	for _, partNumber := range partNumbers {
		sum += partNumber
	}

	if sum != expected {
		t.Errorf("Expected %d, but got %d", expected, sum)
	}
}

func TestGearRatioParsing(t *testing.T) {
	expected := 467835

	gearRatios := ParseGearRatios(
		"467..114..",
		"...*......",
		"..35..633.",
		"......#...",
		"617*......",
		".....+.58.",
		"..592.....",
		"......755.",
		"...$.*....",
		".664.598..",
	)

	actual := 0
	for _, gearRatio := range gearRatios {
		actual += gearRatio
	}

	if actual != expected {
		t.Errorf("Expected %d, but got %d", expected, actual)
	}
}

func TestGearRatioParsingFromInputFile(t *testing.T) {
	expected := 81166799

	content, _ := os.ReadFile("input.txt")

	lines := strings.Split(string(content), "\n")

	gearRatios := ParseGearRatios(lines...)

	actual := 0
	for _, gearRatio := range gearRatios {
		actual += gearRatio
	}

	if actual != expected {
		t.Errorf("Expected %d, but got %d", expected, actual)
	}
}
