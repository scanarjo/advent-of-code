#! /bin/zsh

# Get first script arg as day
year=2024
day=$1

# Ensure day is in the range 1-25
if (( day < 1 || day > 25 )); then
  echo "Day must be between 1 and 25"
  exit 1
fi

# Pad day with leading zeros
dir=$(printf "%02d" $day)

if [[ -d $dir ]]; then
  echo "Day $dir already exists"
else
  echo "Creating directory for day $dir..."
  mkdir $dir

  # Copy the template files
  cp .template/* $dir/
fi

# If SESSION is set and the input file does NOT already exist, download the input
if [[ -n $SESSION ]] then
  echo "Downloading input..."
  # Get the input from the Advent of Code website setting the cookie header from the SESSION variable using HTTPie
  http -dq -o $dir/input.txt --ignore-stdin https://adventofcode.com/$year/day/$day/input "Cookie: session=$SESSION"
else
  echo "SESSION not set. Skipping input download."
fi
