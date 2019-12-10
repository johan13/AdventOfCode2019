import * as _ from "lodash";
import { loadProgram, runProgram } from "../day05/day05";

export async function part1(file: string) {
    const program = await loadProgram(file);
    return _.max([...permutations([0, 1, 2, 3, 4])].map(seq => getThrust(program, seq)));
}

function getThrust(program: number[], sequence: number[]): number {
    let value = 0;
    for (const phase of sequence) {
        value = runProgram([...program], [phase, value])[0];
    }
    return value;
}

function* permutations<T>(list: T[]): Generator<T[]> {
    if (list.length === 1) {
        yield list;
    } else {
        for (let i = 0; i < list.length; i++) {
            const head = list[i];
            for (const tail of permutations(list.filter((v, j) => j !== i))) {
                yield [head, ...tail];
            }
        }
    }
}
