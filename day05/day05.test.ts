import * as assert from "assert";
import { part1and2, runProgram } from "./day05";

describe("Day 5", () => {
    describe("Part 1", () => {
        it("Should return 4601506", async () => {
            assert.strictEqual(await part1and2(1), 4601506);
        });
    });

    describe("Part 2", () => {
        it("Example", () => {
            const program = [
                3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
                1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
                999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99,
            ];
            assert.deepStrictEqual(runProgram([...program], [7]), [999]);
            assert.deepStrictEqual(runProgram([...program], [8]), [1000]);
            assert.deepStrictEqual(runProgram([...program], [9]), [1001]);
        });

        it("Should return 5525561", async () => {
            assert.strictEqual(await part1and2(5), 5525561);
        });
    });
});
