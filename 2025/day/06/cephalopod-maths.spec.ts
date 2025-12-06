import { describe, expect, it } from 'bun:test';

import { readLinesFromFile } from 'utils';

import { doMathsHomework } from './cephalopod-maths';

const sampleData = await readLinesFromFile(__dirname + '/sample.txt');

describe('doMathsHomework', () => {
  it('should give the correct answer for the sample data', () => {
    expect(doMathsHomework(sampleData)).toBe(4277556);
  });
});
