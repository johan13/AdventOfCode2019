import { readAndParse } from "../util/readAndParse";

type Orbit = { name: string, center?: Orbit, orbiters: Orbit[] };

export async function part1(file: string) {
    const orbits = await loadInput(file);
    return orbits.map(countIndirectOrbits).reduce((sum, i) => sum + i);
}

export async function part2(file: string) {
    const orbits = await loadInput(file);
    const o1 = orbits.find(o => o.name === "YOU")!;
    const o2 = orbits.find(o => o.name === "SAN")!;
    return getMinimumTransfers(o1, o2) - 2;
}

function countIndirectOrbits(orbit: Orbit): number {
    if (!orbit.center) {
        return 0;
    } else {
        return 1 + countIndirectOrbits(orbit.center);
    }
}

function getMinimumTransfers(from: Orbit, to: Orbit, previous?: Orbit): number {
    if (from === to) {
        return 0;
    }
    for (const child of from.orbiters.filter(o => o !== previous)) {
        const x = getMinimumTransfers(child, to, from);
        if (x >= 0) {
            return x + 1;
        }
    }
    if (from.center !== previous) {
        return 1 + getMinimumTransfers(from.center!, to, from);
    }
    return -1;
}

async function loadInput(file: string) {
    const input = await readAndParse({ file, separator: "\n", parser: parseOrbit });
    const orbitMap = new Map<string, Orbit>(input.map(i => [i.object, { name: i.object, orbiters: [] }]));
    orbitMap.set("COM", { name: "COM", orbiters: [] });
    for (const { center, object } of input) {
        const centerNode = orbitMap.get(center)!;
        const objectNode = orbitMap.get(object)!;
        objectNode.center = centerNode;
        centerNode.orbiters.push(objectNode);
    }
    return [...orbitMap.values()];
}

function parseOrbit(line: string) {
    const match = /^([^)]+)\)([^)]+)$/.exec(line);
    if (!match) {
        throw new Error("Invalid input");
    }
    return { center: match[1], object: match[2] };
}
