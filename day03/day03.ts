import * as _ from "lodash";
import { readAndParse } from "../util/readAndParse";

export async function part1(file: string) {
    const wires = await readAndParse({ file, parser: wireParser });
    const intersections = getIntersections(wires[0], wires[1]);
    return _.min(intersections.map(i => manhattanDistance(i.point)));
}

export async function part2(file: string) {
    const wires = await readAndParse({ file, parser: wireParser });
    const intersections = getIntersections(wires[0], wires[1]);
    return _.min(intersections.map(i => i.combinedDistanceAlongWires));
}

function getIntersections(wire1: Segment[], wire2: Segment[]) {
    const intersections: Intersection[] = [];
    for (const s1 of wire1) {
        for (const s2 of wire2) {
            const intersection = s1.getIntersection(s2);
            if (intersection && intersection.combinedDistanceAlongWires > 0) {
                intersections.push(intersection);
            }
        }
    }
    return intersections;
}

function manhattanDistance(p1: Point, p2: Point = { x: 0, y: 0 }) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function wireParser(str: string) {
    const wire: Segment[] = [];
    for (const s of str.split(",")) {
        wire.push(new Segment(wire[wire.length - 1], s));
    }
    return wire;
}

type Point = { x: number, y: number };
type Intersection = { point: Point, combinedDistanceAlongWires: number };

class Segment {
    private readonly start: Point;
    private readonly end: Point;
    private readonly lengthToStart: number;
    private readonly minx: number;
    private readonly maxx: number;
    private readonly miny: number;
    private readonly maxy: number;

    public constructor(previous: Segment | undefined, move: string) {
        if (previous) {
            this.start = previous.end;
            this.lengthToStart = previous.lengthToStart + manhattanDistance(previous.start, previous.end);
        } else {
            this.start = { x: 0, y: 0 };
            this.lengthToStart = 0;
        }
        const dist = parseInt(move.slice(1), 10);
        switch (move[0]) {
            case "U": this.end = { x: this.start.x, y: this.start.y - dist }; break;
            case "D": this.end = { x: this.start.x, y: this.start.y + dist }; break;
            case "L": this.end = { x: this.start.x - dist, y: this.start.y }; break;
            case "R": this.end = { x: this.start.x + dist, y: this.start.y }; break;
            default: throw new Error("Invalid input");
        }
        this.minx = Math.min(this.start.x, this.end.x);
        this.maxx = Math.max(this.start.x, this.end.x);
        this.miny = Math.min(this.start.y, this.end.y);
        this.maxy = Math.max(this.start.y, this.end.y);
    }

    public getIntersection(other: Segment): Intersection | undefined {
        // Horizontal this intersecting vertical other
        if (this.minx !== this.maxx &&
            other.miny !== other.maxy &&
            this.minx <= other.minx &&
            this.maxx >= other.minx &&
            other.miny <= this.miny &&
            other.maxy >= this.miny
        ) {
            const point = { x: other.minx, y: this.miny };
            const combinedDistance = this.lengthToStart + other.lengthToStart +
                manhattanDistance(this.start, point) + manhattanDistance(other.start, point);
            return { point, combinedDistanceAlongWires: combinedDistance };
        }
        // Vertical this intersecting horizontal other
        if (this.miny !== this.maxy &&
            other.minx !== other.maxx &&
            this.miny <= other.miny &&
            this.maxy >= other.miny &&
            other.minx <= this.minx &&
            other.maxx >= this.minx
        ) {
            const point = { x: this.minx, y: other.miny };
            const combinedDistance = this.lengthToStart + other.lengthToStart +
                manhattanDistance(this.start, point) + manhattanDistance(other.start, point);
            return { point, combinedDistanceAlongWires: combinedDistance };
        }
        // TODO: Do I need to worry about parallel overlapping segments?
        return undefined;
    }
}
