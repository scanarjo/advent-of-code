package gondolas

import (
	"strconv"
	"unicode"
)

func FindNumberAtPosition(line string, pos int) int {
	numFound := false

	start := pos
	end := pos

	result := 0

	if pos < 0 || pos >= len(line) {
		return result
	}

	if unicode.IsDigit(rune(line[pos])) {
		numFound = true

		for i := start; i >= 0; i-- {
			if unicode.IsDigit(rune(line[i])) {
				start = i
			} else {
				break
			}
		}

		for i := end; i < len(line); i++ {
			if unicode.IsDigit(rune(line[i])) {
				end = i
			} else {
				break
			}
		}
	}

	if numFound {
		result, _ = strconv.Atoi(line[start : end+1])
	}

	return result
}

func ParsePartNumbers(lines ...string) []int {
	partNumbers := []int{}

	for i, line := range lines {
		for j, char := range line {
			if !unicode.IsDigit(char) && char != '.' {
				// check above
				if i > 0 {
					num := FindNumberAtPosition(lines[i-1], j)
					if num == 0 {
						partNumbers = append(partNumbers, FindNumberAtPosition(lines[i-1], j-1))
						partNumbers = append(partNumbers, FindNumberAtPosition(lines[i-1], j+1))
					} else {
						partNumbers = append(partNumbers, num)
					}
				}
				// check adjacent
				if j > 0 {
					partNumbers = append(partNumbers, FindNumberAtPosition(lines[i], j-1))
				}
				if j+1 < len(line) {
					partNumbers = append(partNumbers, FindNumberAtPosition(lines[i], j+1))
				}
				// check below
				if i+1 < len(lines) {
					num := FindNumberAtPosition(lines[i+1], j)
					if num == 0 {
						partNumbers = append(partNumbers, FindNumberAtPosition(lines[i+1], j-1))
						partNumbers = append(partNumbers, FindNumberAtPosition(lines[i+1], j+1))
					} else {
						partNumbers = append(partNumbers, num)
					}
				}
			}
		}
	}

	nonZeroPartNumbers := []int{}
	for _, partNumber := range partNumbers {
		if partNumber != 0 {
			nonZeroPartNumbers = append(nonZeroPartNumbers, partNumber)
		}
	}

	return nonZeroPartNumbers
}

func AppendIfNotZero(slice []int, n int) []int {
	if n != 0 {
		slice = append(slice, n)
	}

	return slice
}

func ParseGearRatios(lines ...string) []int {
	gearRatios := []int{}
	for i, line := range lines {
		for j, char := range line {
			if char == '*' {
				// check above
				adjacentPartNumbers := []int{}
				if i > 0 {
					num := FindNumberAtPosition(lines[i-1], j)
					if num == 0 {
						adjacentPartNumbers = AppendIfNotZero(adjacentPartNumbers, FindNumberAtPosition(lines[i-1], j-1))
						adjacentPartNumbers = AppendIfNotZero(adjacentPartNumbers, FindNumberAtPosition(lines[i-1], j+1))
					} else {
						adjacentPartNumbers = AppendIfNotZero(adjacentPartNumbers, num)
					}
				}
				// check adjacent
				if j > 0 {
					adjacentPartNumbers = AppendIfNotZero(adjacentPartNumbers, FindNumberAtPosition(lines[i], j-1))
				}
				if j+1 < len(line) {
					adjacentPartNumbers = AppendIfNotZero(adjacentPartNumbers, FindNumberAtPosition(lines[i], j+1))
				}
				// check below
				if i+1 < len(lines) {
					num := FindNumberAtPosition(lines[i+1], j)
					if num == 0 {
						adjacentPartNumbers = AppendIfNotZero(adjacentPartNumbers, FindNumberAtPosition(lines[i+1], j-1))
						adjacentPartNumbers = AppendIfNotZero(adjacentPartNumbers, FindNumberAtPosition(lines[i+1], j+1))
					} else {
						adjacentPartNumbers = AppendIfNotZero(adjacentPartNumbers, num)
					}
				}

				if len(adjacentPartNumbers) == 2 {
					gearRatios = append(gearRatios, adjacentPartNumbers[0]*adjacentPartNumbers[1])
				}
			}
		}
	}

	return gearRatios
}
