import { readLinesFromFile } from 'utils';

import { findInvalidIDsInRange } from './id-checker';

const sample = await readLinesFromFile('input');

const ranges = sample[0]!.split(',');

let total = 0;
for (const range of ranges) {
  const [start, end] = range.split('-');

  findInvalidIDsInRange(start!, end!).forEach((n) => {
    total += n;
  });
}

console.log('Total of invalid IDs:', total);
