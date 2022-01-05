// Minimal subset of the node 'fs' library that we depend on.
// May be (c) Microsoft licensed under the MIT license, but API's are generally not copyrightable per recent precedent.
declare module 'fs' {
    export type PathLike = string | Buffer | URL;
    export type PathOrFileDescriptor = PathLike | number;
    export function readFileSync(
        path: PathOrFileDescriptor,
        options?: {
            encoding?: null | undefined;
            flag?: string | undefined;
        } | null
    ): Buffer;
}
declare module 'node:fs' {
    export * from 'fs';
}
