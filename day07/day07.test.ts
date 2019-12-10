import * as assert from "assert";
import { part1 } from "./day07";

describe("Day 7", () => {
    describe("Part 1", () => {
        it("Examples", async () => {
            assert.strictEqual(await part1("day07/example1.txt"), 43210);
            assert.strictEqual(await part1("day07/example2.txt"), 54321);
            assert.strictEqual(await part1("day07/example3.txt"), 65210);
        });

        it("Should return 422858", async () => {
            assert.strictEqual(await part1("day07/input.txt"), 422858);
        });
    });
});
