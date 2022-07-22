// Minimal part of the Node API which we depend on.
// May be (c) Microsoft licensed under the MIT license, however API's are not generally copyrightable per recent precedent.
declare module 'buffer' {
    global {
        interface Buffer extends Uint8Array {}
    }
}
declare module 'node:buffer' {
    export * from 'buffer';
}
