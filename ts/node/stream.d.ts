/**
 * A stream is an abstract interface for working with streaming data in Node.js.
 * The `stream` module provides an API for implementing the stream interface.
 *
 * There are many stream objects provided by Node.js. For instance, a `request to an HTTP server` and `process.stdout` are both stream instances.
 *
 * Streams can be readable, writable, or both. All streams are instances of `EventEmitter`.
 *
 * To access the `stream` module:
 *
 * ```js
 * const stream = require('stream');
 * ```
 *
 * The `stream` module is useful for creating new types of stream instances. It is
 * usually not necessary to use the `stream` module to consume streams.
 * @see [source](https://github.com/nodejs/node/blob/v18.0.0/lib/stream.js)
 */
declare module 'stream' {
    namespace internal {
        class Stream {}
        class Readable extends Stream {
            destroy(error?: Error): this;
        }
        class Writable extends Stream {
            destroy(error?: Error): this;
        }
        class Duplex extends Readable implements Writable {}
    }
    export = internal;
}
declare module 'node:stream' {
    import stream = require('stream');
    export = stream;
}
