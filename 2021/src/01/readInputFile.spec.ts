import t from 'tap';

import { readInputFileToLines } from './readInputFile';

t.test('it should read a single line file correctly', async t => {
  const readFile = async () => 'abc123  ';

  const result = await readInputFileToLines(readFile)('./foo');

  t.same(result, ['abc123  ']);
})

t.test('it should pass the correct file path to the "readFile" dependency', async t => {
  let fileRead;
  const readFile = async (path: string) => fileRead = path;

  await readInputFileToLines(readFile)('/foo/bar/baz.txt');

  t.equal(fileRead, '/foo/bar/baz.txt');
})

t.test('it should split a file on new lines correctly', async t => {
  const readFile = async () => `line1
line2
line3`;

  const result = await readInputFileToLines(readFile)('/somefile.txt');

  t.same(result, ['line1', 'line2', 'line3']);
})
