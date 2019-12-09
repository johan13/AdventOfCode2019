import * as assert from "assert";
import { isCandidate, isCandidate2, part1, part2 } from "./day04";

describe("Day 4", () => {
    describe("Part 1", () => {
        it("Examples", () => {
            assert.ok(isCandidate(111111));
            assert.ok(!isCandidate(223450));
            assert.ok(!isCandidate(123789));
        });

        it("Should return 2150", () => {
            assert.strictEqual(part1(124075, 580769), 2150);
        });
    });

    describe("Part 2", () => {
        it("Examples 1", () => {
            assert.ok(isCandidate2(112233));
            assert.ok(!isCandidate2(123444));
            assert.ok(isCandidate2(111122));
        });

        it("Should return 1462", () => {
            assert.strictEqual(part2(124075, 580769), 1462);
        });
    });
});
