package day01

import (
	"fmt"
	"strconv"
	"unicode"
)

func ExtractCalibrationValue(s string) int {
	var first, last rune = -1, -1
	for _, r := range s {
		if unicode.IsDigit(r) {
			if first == -1 {
				first = r - '0'
			}
			last = r - '0'
		}
	}

	concatenated := fmt.Sprintf("%d%d", first, last)

	result, _ := strconv.Atoi(concatenated)

	return result
}

func ExtractCalibrationValueWithTextParsing(s string) int {
	numbersAsText := map[string]int{
		"zero":  0,
		"one":   1,
		"two":   2,
		"three": 3,
		"four":  4,
		"five":  5,
		"six":   6,
		"seven": 7,
		"eight": 8,
		"nine":  9,
	}

	var first, last rune = -1, -1
	for i, r := range s {
		for key, val := range numbersAsText {
			str := s[i:min(i+len(key), len(s))]
			if str == key {
				if first == -1 {
					first = rune(val)
				}
				last = rune(val)
			}
		}
		if unicode.IsDigit(r) {
			if first == -1 {
				first = r - '0'
			}
			last = r - '0'
		}
	}

	concatenated := fmt.Sprintf("%d%d", first, last)

	result, _ := strconv.Atoi(concatenated)

	return result
}
