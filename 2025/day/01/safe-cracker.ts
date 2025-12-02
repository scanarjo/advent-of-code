const DIAL_MAX = 99;
const DIAL_MODULUS = DIAL_MAX + 1;

function modulo(n: number, modulus: number) {
  return ((n % modulus) + modulus) % modulus;
}

interface RotationResult {
  finalPosition: number;
  zeroClicks: number;
}

function parseInstruction(
  instruction: string,
): [direction: 'L' | 'R', amount: number] {
  const direction = instruction.at(0) === 'L' ? 'L' : 'R';

  const amount = Number.parseInt(instruction.slice(1), 10);

  return [direction, amount];
}

function isInRange(min: number, max: number, target: number) {
  return target >= min && target < max;
}

function quotient(dividend: number, divisor: number): number {
  return Math.floor(Math.abs(dividend / divisor));
}

export function rotateDial(
  startPos: number,
  instruction: string,
): RotationResult {
  const [direction, amount] = parseInstruction(instruction);

  if (amount === 0) {
    return {
      finalPosition: startPos,
      zeroClicks: 0,
    };
  }

  const offset = direction === 'R' ? amount : DIAL_MODULUS - amount;

  const finalPosition = modulo(startPos + offset, DIAL_MODULUS);

  const remainder = amount % DIAL_MODULUS;

  let zeroClicks = quotient(amount, DIAL_MODULUS);
  if (direction === 'R') {
    if (isInRange(startPos, startPos + remainder, DIAL_MAX)) {
      zeroClicks += 1;
    }
  } else {
    if (isInRange(startPos - remainder, startPos, 0)) zeroClicks += 1;
  }

  return {
    finalPosition,
    zeroClicks,
  };
}
