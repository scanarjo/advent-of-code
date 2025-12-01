const inputFile = Bun.file("input");

const fileContents = await inputFile.text();

const lines = await fileContents.split(/[\r\n]/);

// Remove empty element
lines.pop();

const startPos = 50;

let count = 0;
let pos = startPos;
for (let instruction of lines) {
  const direction = instruction.at(0) === "L" ? -1 : 1;

  const amount = Number.parseInt(instruction.slice(1), 10);

  pos = (100 + pos + (direction * amount)) % 100;

  console.log(pos);

  if (pos === 0) count += 1;
}

console.log("Passord:", count);
