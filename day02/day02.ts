import { readAndParse } from "../util/readAndParse";

export async function part1() {
    const program = await loadProgram();
    return runProgram(program, 12, 2);
}

export async function part2() {
    const program = await loadProgram();
    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            const output = runProgram(program, noun, verb);
            if (output === 19690720) {
                return 100 * noun + verb;
            }
        }
    }
    throw new Error("No solution found.");
}

async function loadProgram() {
    return readAndParse({
        file: "day02/input.txt",
        separator: ",",
        parser: x => parseInt(x, 10),
    });
}

function runProgram(program: number[], noun: number, verb: number) {
    const memory = [...program];
    memory[1] = noun;
    memory[2] = verb;
    runProgramMutating(memory);
    return memory[0];
}

export function runProgramMutating(memory: number[]) {
    for (let ip = 0; ;) {
        switch (memory[ip]) {
            case 1: {
                const src1 = memory[ip + 1];
                const src2 = memory[ip + 2];
                const dest = memory[ip + 3];
                memory[dest] = memory[src1] + memory[src2];
                ip += 4;
                break;
            }
            case 2: {
                const src1 = memory[ip + 1];
                const src2 = memory[ip + 2];
                const dest = memory[ip + 3];
                memory[dest] = memory[src1] * memory[src2];
                ip += 4;
                break;
            }
            case 99:
                return;
            default:
                throw new Error(`Invalid OP code at ${ip}: ${memory[ip]}`);
        }
    }
}
