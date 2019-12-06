import * as _ from "lodash";
import { readAndParse } from "../util/readAndParse";

export async function part1() {
    const moduleMasses = await readInput();
    const fuel = moduleMasses.map(calculateFuel);
    return _.sum(fuel);
}

export async function part2() {
    const moduleMasses = await readInput();
    const fuel = moduleMasses.map(calculateFuel2);
    return _.sum(fuel);
}

async function readInput() {
    return readAndParse({
        file: "day01/input.txt",
        parser: x => parseInt(x, 10),
    });
}

function calculateFuel(mass: number) {
    return Math.floor(mass / 3) - 2;
}

export function calculateFuel2(mass: number): number {
    const fuel = calculateFuel(mass);
    return fuel <= 0 ? 0 : fuel + calculateFuel2(fuel);
}
