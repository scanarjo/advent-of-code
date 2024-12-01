import { readFile } from "fs/promises";
import { resolve } from "path";

import { countDepthIncreases } from "./countDepthIncreases";
import { readInputFileToLines } from "./readInputFile";

readInputFileToLines(path => readFile(path, 'utf-8'))(resolve(__dirname, 'input.txt'))
  .then(lines => lines.map(Number))
  .then(list => countDepthIncreases(list, 3))
  .then(count => console.log('Number of increases: ', count));
