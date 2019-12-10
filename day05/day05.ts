import { readAndParse } from "../util/readAndParse";

export async function part1and2(input: number) {
    const program = await loadProgram("day05/input.txt");
    const output = runProgram(program, [input]);
    if (output.slice(0, -1).some(x => x !== 0)) {
        throw new Error("Diagnostics failed");
    }
    return output[output.length - 1];
}

export async function loadProgram(file: string) {
    return readAndParse({
        file,
        separator: ",",
        parser: x => parseInt(x, 10),
    });
}

export function runProgram(memory: number[], input: number[]): number[] {
    const output: number[] = [];
    for (let ip = 0; ;) {
        const param = (p: number) => {
            const mode = Math.floor(memory[ip] / 10 ** (p + 1)) % 10;
            return mode ? memory[ip + p] : memory[memory[ip + p]];
        };
        switch (memory[ip] % 100) {
            case 1: // Addition
                memory[memory[ip + 3]] = param(1) + param(2);
                ip += 4;
                break;
            case 2: // Multiplication
                memory[memory[ip + 3]] = param(1) * param(2);
                ip += 4;
                break;
            case 3: { // Input
                const value = input.shift();
                if (typeof value !== "number") {
                    throw new Error("Input EOF");
                }
                memory[memory[ip + 1]] = value;
                ip += 2;
                break;
            }
            case 4: // Output
                output.push(param(1));
                ip += 2;
                break;
            case 5: // Jump if true
                if (param(1)) {
                    ip = param(2);
                } else {
                    ip += 3;
                }
                break;
            case 6: // Jump if false
                if (!param(1)) {
                    ip = param(2);
                } else {
                    ip += 3;
                }
                break;
            case 7: // Less than
                memory[memory[ip + 3]] = param(1) < param(2) ? 1 : 0;
                ip += 4;
                break;
            case 8: // Equal
                memory[memory[ip + 3]] = param(1) === param(2) ? 1 : 0;
                ip += 4;
                break;
            case 99:
                return output;
            default:
                throw new Error(`Invalid OP code at ${ip}: ${memory[ip]}`);
        }
    }
}
