import {
  fastListSimilarity,
  listDistance,
  listSimilarity,
  parseData,
} from "./lib.ts";

const decoder = new TextDecoder("utf-8");

const buffer = Deno.readFileSync("./input.txt");

const text = decoder.decode(buffer);

const [listA, listB] = parseData(text);

Deno.bench("distance", () => {
  listDistance(listA, listB);
});

Deno.bench("score", () => {
  listSimilarity(listA, listB);
});

Deno.bench("fastScore", () => {
  fastListSimilarity(listA, listB);
});
