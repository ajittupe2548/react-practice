import { sum } from "../sum";

test("check sum of two +ve numbers", () => {
    expect(sum(2, 5)).toBe(7);
});
