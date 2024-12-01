package day01

import (
	"bufio"
	"os"
	"testing"
)

func TestExtractCalibrationValue(t *testing.T) {
	testString := "1abc2"
	expected := 12

	actual := ExtractCalibrationValue(testString)

	if actual != expected {
		t.Errorf("Expected %d, but got %d", expected, actual)
	}
}

func TestExtractCalibrationValue2(t *testing.T) {
	testString := "pqr3stu8vwx"
	expected := 38

	actual := ExtractCalibrationValue(testString)

	if actual != expected {
		t.Errorf("Expected %d, but got %d", expected, actual)
	}
}

func TestExtractCalibrationValue3(t *testing.T) {
	testString := "a1b2c3d4e5f"
	expected := 15

	actual := ExtractCalibrationValue(testString)

	if actual != expected {
		t.Errorf("Expected %d, but got %d", expected, actual)
	}
}

func TestExtractCalibrationValue4(t *testing.T) {
	testString := "treb7uchet"
	expected := 77

	actual := ExtractCalibrationValue(testString)

	if actual != expected {
		t.Errorf("Expected %d, but got %d", expected, actual)
	}
}

func TestWithInputFile(t *testing.T) {
	expected := 54331

	file, _ := os.Open("input.txt")

	defer file.Close()

	scanner := bufio.NewScanner(file)
	sum := 0
	for scanner.Scan() {
		line := scanner.Text()

		sum += ExtractCalibrationValue(line)
	}

	if sum != expected {
		t.Errorf("Expected %d, but got %d", expected, sum)
	}
}

func TestMixedWordsAndNumbers(t *testing.T) {
	testString := "two1nine"
	expected := 29

	actual := ExtractCalibrationValueWithTextParsing(testString)

	if actual != expected {
		t.Errorf("Expected %d, but got %d", expected, actual)
	}
}

func TestMixedWordsAndNumbers2(t *testing.T) {
	testString := "4nineeightseven2"
	expected := 42

	actual := ExtractCalibrationValueWithTextParsing(testString)

	if actual != expected {
		t.Errorf("Expected %d, but got %d", expected, actual)
	}
}

func TestMixedWordsAndNumbersWithInputFile(t *testing.T) {
	expected := 54518

	file, _ := os.Open("input.txt")

	defer file.Close()

	scanner := bufio.NewScanner(file)
	sum := 0
	for scanner.Scan() {
		line := scanner.Text()

		sum += ExtractCalibrationValueWithTextParsing(line)
	}

	if sum != expected {
		t.Errorf("Expected %d, but got %d", expected, sum)
	}
}
