import { parseDenaryInt } from 'utils';

function sum(...xs: number[]) {
  return xs.reduce((sum, n) => sum + n, 0);
}
function product(...xs: number[]) {
  return xs.reduce((product, n) => product * n, 1);
}
export function doMathsHomework(homework: string[]): number {
  const operators = homework.pop()!.split(/\s+/);

  const inputs = homework
    .map((row) => row.split(/\s+/))
    .map((row) => row.map(parseDenaryInt).filter((n) => !Number.isNaN(n)));

  let total = 0;
  for (let index = 0; index < operators.length; index++) {
    const operator = operators[index];

    const nthElements = inputs.map((row) => row[index]!);

    if (operator === '+') {
      total += sum(...nthElements);
    } else {
      total += product(...nthElements);
    }
  }

  return total;
}
