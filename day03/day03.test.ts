import * as assert from "assert";
import { part1, part2 } from "./day03";

describe("Day 3", () => {
    describe("Part 1", () => {
        it("Example 1", async () => {
            assert.strictEqual(await part1("day03/example1.txt"), 159);
        });

        it("Example 2", async () => {
            assert.strictEqual(await part1("day03/example2.txt"), 135);
        });

        it("Should return 557", async () => {
            assert.strictEqual(await part1("day03/input.txt"), 557);
        });
    });

    describe("Part 2", () => {
        it("Example 1", async () => {
            assert.strictEqual(await part2("day03/example1.txt"), 610);
        });

        it("Example 2", async () => {
            assert.strictEqual(await part2("day03/example2.txt"), 410);
        });

        it("Should return 56410", async () => {
            assert.strictEqual(await part2("day03/input.txt"), 56410);
        });
    });
});
