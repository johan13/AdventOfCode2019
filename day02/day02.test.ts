import * as assert from "assert";
import { part1, part2, runProgramMutating } from "./day02";

describe("Day 2", () => {
    describe("Part 1", () => {
        it("Example 1", () => {
            const program = [1, 0, 0, 0, 99];
            runProgramMutating(program);
            assert.deepStrictEqual(program, [2, 0, 0, 0, 99]);
        });

        it("Example 2", () => {
            const program = [2, 3, 0, 3, 99];
            runProgramMutating(program);
            assert.deepStrictEqual(program, [2, 3, 0, 6, 99]);
        });

        it("Example 3", () => {
            const program = [2, 4, 4, 5, 99, 0];
            runProgramMutating(program);
            assert.deepStrictEqual(program, [2, 4, 4, 5, 99, 9801]);
        });

        it("Example 4", () => {
            const program = [1, 1, 1, 4, 99, 5, 6, 0, 99];
            runProgramMutating(program);
            assert.deepStrictEqual(program, [30, 1, 1, 4, 2, 5, 6, 0, 99]);
        });

        it("Should return 6627023", async () => {
            assert.strictEqual(await part1(), 6627023);
        });
    });

    describe("Part 2", () => {
        it("Should return 4019", async () => {
            assert.strictEqual(await part2(), 4019);
        });
    });
});
