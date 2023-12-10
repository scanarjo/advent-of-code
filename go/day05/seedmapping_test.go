package seedmapping

import (
	"bufio"
	"os"
	"strconv"
	"strings"
	"testing"
)

func TestSeedMapping(t *testing.T) {
	mapping := Mapping{
		source:      "seed",
		destination: "soil",
		ranges: []MappingRange{
			{destinationStart: 50, sourceStart: 98, rangeLength: 2},
			{destinationStart: 52, sourceStart: 50, rangeLength: 48},
		},
	}

	source := Measurement{value: 98, unit: "seed"}
	expected := Measurement{value: 50, unit: "soil"}

	actual, _ := mapping.Map(source)

	if *actual != expected {
		t.Errorf("Expected %v, but got %v", expected, *actual)
	}
}

func TestDeserialisation(t *testing.T) {
	serializedMapping := `soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

`

	expected := Mapping{
		source:      "soil",
		destination: "fertilizer",
		ranges: []MappingRange{
			{destinationStart: 0, sourceStart: 15, rangeLength: 37},
			{destinationStart: 37, sourceStart: 52, rangeLength: 2},
			{destinationStart: 39, sourceStart: 0, rangeLength: 15},
		},
	}

	scanner := bufio.NewScanner(strings.NewReader(serializedMapping))

	actual, err := DeserializeMapping(scanner)

	if err != nil {
		t.Errorf("Unexpected error: %v", err)
	}

	if actual.source != expected.source {
		t.Errorf("Expected %v, but got %v", expected.source, actual.source)
	}

	if actual.destination != expected.destination {
		t.Errorf("Expected %v, but got %v", expected.destination, actual.destination)
	}

	if len(actual.ranges) != len(expected.ranges) {
		t.Errorf("Expected %v, but got %v", expected.ranges, actual.ranges)
	}

	for i, expectedRange := range expected.ranges {
		actualRange := actual.ranges[i]

		if actualRange.destinationStart != expectedRange.destinationStart {
			t.Errorf("Expected %v, but got %v", expectedRange.destinationStart, actualRange.destinationStart)
		}

		if actualRange.sourceStart != expectedRange.sourceStart {
			t.Errorf("Expected %v, but got %v", expectedRange.sourceStart, actualRange.sourceStart)
		}

		if actualRange.rangeLength != expectedRange.rangeLength {
			t.Errorf("Expected %v, but got %v", expectedRange.rangeLength, actualRange.rangeLength)
		}
	}
}

func TestMappingInputFile(t *testing.T) {
	file, _ := os.Open("input.txt")
	defer file.Close()

	scanner := bufio.NewScanner(file)

	seeds := []Measurement{}

	scanner.Scan()

	serializedSeeds := scanner.Text()

	stringSeeds := strings.Fields(serializedSeeds)

	for i := 1; i < len(stringSeeds); i++ {
		seed := Measurement{
			unit: "seed",
		}

		seed.value, _ = strconv.Atoi(stringSeeds[i])

		seeds = append(seeds, seed)
	}

	scanner.Scan()

	for mapping, err := DeserializeMapping(scanner); err == nil; mapping, err = DeserializeMapping(scanner) {
		for i, seed := range seeds {
			destinationMeasurement, _ := mapping.Map(seed)

			seeds[i] = *destinationMeasurement
		}
	}

	expected := Measurement{
		value: 196167384,
		unit:  "location",
	}

	actual := seeds[0]
	for _, seed := range seeds {
		if seed.value < actual.value {
			actual = seed
		}
	}

	if actual != expected {
		t.Errorf("Expected %v, but got %v", expected, actual)
	}
}
