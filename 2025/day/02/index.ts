import { readLinesFromFile } from 'utils';

import { findInvalidIDsInRange, isValidVersion2ID } from './id-checker';

const sample = await readLinesFromFile('input');

const ranges = sample[0]!.split(',');

let part1Total = 0;
for (const range of ranges) {
  const [start, end] = range.split('-');

  findInvalidIDsInRange(start!, end!).forEach((n) => {
    part1Total += n;
  });
}

let invalidIDs = new Set<number>();
for (const range of ranges) {
  const [start, end] = range.split('-');

  findInvalidIDsInRange(start!, end!, isValidVersion2ID).forEach((id) =>
    invalidIDs.add(id)
  );
}

console.log(ranges);

let part2Total = 0;
invalidIDs.forEach((id) => (part2Total += id));

console.log('Total of invalid IDs in part 1:', part1Total);
console.log('Total of invalid IDs in part 2:', part2Total);
