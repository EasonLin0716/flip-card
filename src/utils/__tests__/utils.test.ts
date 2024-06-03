import { expect, test } from "vitest";
import { checkMatch, sleep, zeroPrefix, shuffleCards } from "..";
import { Card } from "../../constants";

const mockCardList: Card[] = [
    { icon: "a", down: false, matched: false },
    { icon: "b", down: false, matched: false },
    { icon: "c", down: false, matched: false },
    { icon: "d", down: false, matched: false },
    { icon: "e", down: false, matched: false },
    { icon: "f", down: false, matched: false },
    { icon: "a", down: false, matched: false },
    { icon: "b", down: false, matched: false },
    { icon: "c", down: false, matched: false },
    { icon: "d", down: false, matched: false },
    { icon: "e", down: false, matched: false },
    { icon: "f", down: false, matched: false },
];

test("checkMatch", () => {
    expect(checkMatch(mockCardList[0], mockCardList[6])).toBe(true);
    expect(checkMatch(mockCardList[0], mockCardList[2])).toBe(false);
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
    const shuffled = shuffleCards(mockCardList);
    expect(shuffled).not.toEqual(mockCardList);
    expect(shuffled).toHaveLength(mockCardList.length);
    expect(shuffled).toEqual(expect.arrayContaining(mockCardList));
});
