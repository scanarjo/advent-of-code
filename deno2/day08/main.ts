import { readInputFile } from '../utils/fs.ts';
import { countSteps, parseNodeData } from './navigate.ts';

const [path, ...nodes] = readInputFile(import.meta.dirname);

console.log('Answer for part 1:', countSteps(path, parseNodeData(nodes)));
