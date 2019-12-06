import * as assert from "assert";
import { calculateFuel2, part1, part2 } from "./day01";

describe("Day 1", () => {
    describe("Part 1", () => {
        it("Should return 3270717", async () => {
            assert.strictEqual(await part1(), 3270717);
        });
    });

    describe("Part 2", () => {
        it("Examples", () => {
            assert.strictEqual(calculateFuel2(14), 2);
            assert.strictEqual(calculateFuel2(1969), 966);
            assert.strictEqual(calculateFuel2(100756), 50346);
        });

        it("Should return 4903193", async () => {
            assert.strictEqual(await part2(), 4903193);
        });
    });
});
