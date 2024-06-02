import { expect, test } from "vitest";
import { checkMatch, sleep, zeroPrefix, shuffleCards } from "..";

test("checkMatch", () => {
  expect(checkMatch({ icon: "a" }, { icon: "a" })).toBe(true);
  expect(checkMatch({ icon: "a" }, { icon: "b" })).toBe(false);
});

test("sleep", async () => {
  const start = Date.now();
  await sleep(50);
  const end = Date.now();
  expect(end - start).toBeGreaterThan(49);
});

test("zeroPrefix", () => {
  expect(zeroPrefix(1, 2)).toBe("01");
  expect(zeroPrefix(12, 3)).toBe("012");
  expect(zeroPrefix(123, 3)).toBe("123");
});

test("shuffleCards", () => {
  const cards = [
    { id: 1, icon: "a" },
    { id: 2, icon: "b" },
    { id: 3, icon: "c" },
    { id: 4, icon: "d" },
    { id: 5, icon: "e" },
    { id: 6, icon: "f" },
  ];
  const shuffled = shuffleCards(cards);
  expect(shuffled).not.toEqual(cards);
  expect(shuffled).toHaveLength(cards.length);
  expect(shuffled).toEqual(expect.arrayContaining(cards));
});
