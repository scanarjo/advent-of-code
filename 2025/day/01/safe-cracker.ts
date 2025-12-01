const DIAL_MAX = 99;
const DIAL_MODULUS = DIAL_MAX + 1;

function modulo(n: number, modulus: number) {
  return ((n % modulus) + modulus) % modulus;
}

interface RotationResult {
  finalPosition: number;
  zeroClicks: number;
}

export function rotateDial(
  startPos: number,
  instruction: string,
): RotationResult {
  const direction = instruction.at(0) === "L" ? -1 : 1;

  const amount = Number.parseInt(instruction.slice(1), 10);

  if (amount === 0) {
    return {
      finalPosition: startPos,
      zeroClicks: 0,
    };
  }

  const offset = direction * amount;

  const wholeTurns = Math.floor(Math.abs(offset / DIAL_MODULUS));

  const remainingOffset = offset % DIAL_MODULUS;

  const rawNewPos = startPos + remainingOffset;

  let zeroClicks = wholeTurns;

  if (remainingOffset !== 0 && startPos !== 0) {
    if (rawNewPos <= 0 || rawNewPos > 99) zeroClicks += 1;
  }

  const finalPosition = modulo(rawNewPos, DIAL_MODULUS);

  return {
    finalPosition,
    zeroClicks,
  };
}
