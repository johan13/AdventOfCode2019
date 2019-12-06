import { promises as fs } from "fs";
import { resolve } from "path";

export async function readAndParse<T>({ file, parser, separator = "\n" }: {
    file: string,
    parser: (s: string) => T,
    separator?: string,
}) {
    const fileContents = await fs.readFile(resolve(__dirname, "..", file), { encoding: "utf8" });
    return fileContents.trimRight().split(separator).map(parser);
}
