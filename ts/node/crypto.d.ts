// Minimal part of the Node crypto API which we depend on.
// May be (c) Microsoft licensed under the MIT license, however API's are not generally copyrightable per recent precedent.
declare module 'crypto' {
    namespace webcrypto {
		function getRandomValues(out: Uint8Array): void;
    }
}
declare module 'node:crypto' {
    export * from 'crypto';
}
