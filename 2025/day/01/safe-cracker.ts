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
): [direction: "L" | "R", amount: number] {
  const direction = instruction.at(0) === "L" ? "L" : "R";

  const amount = Number.parseInt(instruction.slice(1), 10);

  return [direction, amount];
}

function inRange(target: number, min: number, max: number) {
  return target >= min && target < max;
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

  const offset = direction === "R" ? amount : amount * -1;

  const wholeTurns = Math.floor(Math.abs(offset / DIAL_MODULUS));

  const remainingOffset = offset % DIAL_MODULUS;

  const rawNewPos = startPos + remainingOffset;

  let zeroClicks = wholeTurns;

  if (remainingOffset !== 0 && startPos !== 0) {
    if (rawNewPos <= 0 || rawNewPos > DIAL_MAX) zeroClicks += 1;
  }

  const finalPosition = modulo(rawNewPos, DIAL_MODULUS);

  return {
    finalPosition,
    zeroClicks,
  };
}
