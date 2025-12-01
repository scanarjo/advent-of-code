import { rotateDial } from "./safe-cracker";

const inputFile = Bun.file("input");

const fileContents = await inputFile.text();

const lines = await fileContents.split(/[\r\n]/);

// Remove empty element
lines.pop();

const startPos = 50;

let landedOnZeroCount = 0;
let passedZeroCount = 0;

let pos = startPos;
for (let instruction of lines) {
  const { finalPosition: newPos, zeroClicks: timesPassedZero } = rotateDial(
    pos,
    instruction,
  );

  passedZeroCount += timesPassedZero;

  if (newPos === 0) landedOnZeroCount += 1;

  pos = newPos;
}

console.log("Password in Part 1:", landedOnZeroCount);
console.log("Password in Part 2:", passedZeroCount);
