import * as assert from "assert";
import { part1, part2 } from "./day06";

describe("Day 6", () => {
    describe("Part 1", () => {
        it("Example", async () => {
            assert.strictEqual(await part1("day06/example1.txt"), 42);
        });

        it("Should return 194721", async () => {
            assert.strictEqual(await part1("day06/input.txt"), 194721);
        });
    });

    describe("Part 2", () => {
        it("Example", async () => {
            assert.strictEqual(await part2("day06/example2.txt"), 4);
        });

        it("Should return 316", async () => {
            assert.strictEqual(await part2("day06/input.txt"), 316);
        });
    });
});
