import { listDistance, parseData } from "./lib.ts";

const decoder = new TextDecoder("utf-8");

const buffer = Deno.readFileSync("./input.txt");

const text = decoder.decode(buffer);

const [listA, listB] = parseData(text);

const distance = listDistance(listA, listB);

console.log("Answer to Part 1:", distance);
