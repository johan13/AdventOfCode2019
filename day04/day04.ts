import * as _ from "lodash";

export function part1(lowerBound: number, upperBound: number) {
    return _.range(lowerBound, upperBound + 1).filter(isCandidate).length;
}

export function part2(lowerBound: number, upperBound: number) {
    return _.range(lowerBound, upperBound + 1).filter(isCandidate2).length;
}

export function isCandidate(password: number) {
    const digits = [100000, 10000, 1000, 100, 10, 1].map(n => Math.floor(password / n) % 10);
    let hasDouble = false;
    for (let i = 0; i < 5; i++) {
        if (digits[i + 1] < digits[i]) {
            return false;
        }
        if (digits[i + 1] === digits[i]) {
            hasDouble = true;
        }
    }
    return hasDouble;
}

export function isCandidate2(password: number) {
    const digits = [100000, 10000, 1000, 100, 10, 1].map(n => Math.floor(password / n) % 10);
    const groupLengths: number[] = [];
    let currentGroupLength = 1;
    for (let i = 0; i < 5; i++) {
        if (digits[i + 1] < digits[i]) {
            return false;
        }
        if (digits[i + 1] === digits[i]) {
            currentGroupLength++;
        } else {
            groupLengths.push(currentGroupLength);
            currentGroupLength = 1;
        }
    }
    groupLengths.push(currentGroupLength);
    return groupLengths.includes(2);
}
