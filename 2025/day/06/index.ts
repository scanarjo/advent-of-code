import { readLinesFromFile } from 'utils';
import { doMathsHomework } from './cephalopod-maths';

const input = await readLinesFromFile('input.txt');

console.log('Answer for part 1:', doMathsHomework(input));
