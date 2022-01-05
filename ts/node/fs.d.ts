// Minimal part of the Node fs API which we depend on.
// May be (c) Microsoft licensed under the MIT license, however API's are not generally copyrightable per recent precedent.
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
