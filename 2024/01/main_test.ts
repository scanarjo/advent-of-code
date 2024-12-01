import { assertEquals } from "@std/assert";

import { distance, listDistance } from "./main.ts";

Deno.test("it should calculate the distance between two numbers", () => {
  assertEquals(distance(4, 1), 3);
});

Deno.test("the distance should be the same both ways round", () => {
  assertEquals(distance(3, 5), distance(5, 3));
});

Deno.test(
  "when given two sorted lists it should calculate the distance correctly",
  () => {
    const listA = [1, 2, 3, 3, 3, 4];
    const listB = [3, 3, 3, 4, 5, 9];

    assertEquals(listDistance(listA, listB), 11);
  }
);

Deno.test(
  "when given unsorted lists it should calculate the same distance as in the sorted case",
  () => {
    const listA = [3, 4, 2, 1, 3, 3];
    const listB = [4, 3, 5, 3, 9, 3];

    const sortedA = [1, 2, 3, 3, 3, 4];
    const sortedB = [3, 3, 3, 4, 5, 9];

    assertEquals(listDistance(listA, listB), listDistance(sortedA, sortedB));
  }
);
