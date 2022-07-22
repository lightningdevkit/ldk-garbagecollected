// Minimal part of the Node fs API which we depend on.
// May be (c) Microsoft licensed under the MIT license, however API's are not generally copyrightable per recent precedent.
declare module 'net' {
    import * as stream from 'node:stream';
    class Socket extends stream.Duplex {
        constructor();
        write(buffer: Uint8Array | string, cb?: (err?: Error) => void): boolean;
        connect(port: number, host: string, connectionListener?: () => void): this;
        pause(): this;
        resume(): this;
        setNoDelay(noDelay?: boolean): this;
        readonly remoteAddress?: string | undefined;
        readonly remotePort?: number | undefined;
        on(event: 'close', listener: (hadError: boolean) => void): this;
        on(event: 'connect', listener: () => void): this;
        on(event: 'data', listener: (data: Buffer) => void): this;
        on(event: 'drain', listener: () => void): this;
        on(event: 'error', listener: (err: Error) => void): this;
    }
    class Server {
        listen(port?: number, hostname?: string, listeningListener?: () => void): this;
        close(callback?: (err?: Error) => void): this;
        on(event: 'error', listener: (err: Error) => void): this;
        on(event: 'listening', listener: () => void): this;
    }
    function createServer(connectionListener?: (socket: Socket) => void): Server;
    function isIPv4(input: string): boolean;
    function isIPv6(input: string): boolean;
}
declare module 'node:net' {
    export * from 'net';
}
