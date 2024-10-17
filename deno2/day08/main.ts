import { readInputFile } from '../utils/fs.ts';
import {
  countSteps,
  countStepsWithSecondStrategy,
  parseNodeData,
} from './navigate.ts';

const [path, ...nodeData] = readInputFile(import.meta.dirname);

const nodes = parseNodeData(nodeData);

console.log('Answer for part 1:', countSteps(path, nodes));
console.log('Answer for part 2:', countStepsWithSecondStrategy(path, nodes));
