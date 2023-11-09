LDK Java and TypeScript Bindings
================================

This repo contains an autogeneration system to generate LDK bindings for garbage-collected languages, currently including Java and TypeScript. See below for the current status of the bindings.

The auto-generated code contains copies of the Rust documentation, which can also be viewed at
[docs.rs/lightning](https://docs.rs/lightning). High-level documentation of the API can be found at
[lightningdevkit.org](https://lightningdevkit.org).

Building
========

A release build of the Java bindings library for Linux is available in git. Thus, the bindings should work as long as the `LD_LIBRARY_PATH` includes the top-level directory of this repository.

To build the bindings locally, the bindings require some additional work which is still making its
way upstream, for now it should be built against the
[rust-lightning 2022-10-112-java-bindings branch on git.bitcoin.ninja](https://git.bitcoin.ninja/?p=rust-lightning;a=shortlog;h=refs/heads/2022-10-112-java-bindings).
Check that branch out locally as well as [ldk-c-bindings](https://github.com/lightningdevkit/ldk-c-bindings)
and run the `genbindings.sh` script in ldk-c-bindings to build the required binaries. Thereafter,
in this repo, run the `genbindings.sh` script with the first argument pointing to the ldk-c-bindings
directory, the second the relevant JNI CFLAGS, the third argument set to `true` or `false` to
indicate whether building in debug mode, and the third set to true or false to indicate if the
bindings should be built with workarounds required for Android. JNI CFLAGS on debian are likely
"-I/usr/lib/jvm/java-11-openjdk-amd64/include/ -I/usr/lib/jvm/java-11-openjdk-amd64/include/linux/".
When running a program linking against the library in debug mode, LD_PRELOAD should likely include
the relevant `libclang_rt.asan-platform.so` path.

Note that building with address sanitizer is only supported on MacOS with upstream clang (ie where
the LLVM version in use matches the LLVM version against which rustc was built), not with Apple clang.
Builds with Apple clang will work fine, but largely only be useful in a release context.
To build on Mac with address sanitizer, you will need to run `ldk-c-bindings`' `genbindings.sh`
script with upstream clang in your PATH and likely replace your $JAVA_HOME/bin/java with a simple
wrapper which calls java after an export like:
`export DYLD_INSERT_LIBRARIES=/path/to/upstream/llvm/lib/clang/12.0.0/lib/darwin/libclang_rt.asan_osx_dynamic.dylib`

To build for Apple M1 (ie aarch64-apple-darwin), you probably want something like
`CC="clang --target=aarch64-apple-darwin" LDK_TARGET=aarch64-apple-darwin LDK_TARGET_CPU=generic ./genbindings.sh ...`

Status
======

## Java

The Java bindings are relatively mature, and should be considered safe for production use. Still,
as they have relatively few users, unexpected issues remain possible, and bug reports are welcome.

## TypeScript

The TypeScript bindings are functionally complete, but should be considered beta quality. As there
are relatively few users, unexpected issues remain likely, and bug reports are welcome.

The TypeScript bindings require modern web standards, including support for `FinalizationRegistry`
and `WeakRef` (Chrome 84, Firefox 79, Safari 14.1/iOS 14.5 and Node 14.6) and WASM BigInt support
(Chrome 85, Firefox 78, Safari 14.1/iOS 14.5, and Node 15.0).

For users of Node.JS environments you may wish to use the `lightningdevkit-node-net` package as
well to implement the required network handling to bridge the `lightningdevkit` package's
`SocketDescriptor` interface to Node.JS TCP Sockets. For those wishing to run a lightning node in
the browser you will need to provide your own bridge from `SocketDescriptor` to a WebSocket proxy.

# C#

The C# bindings are functionally complete, but should be considered alpha quality. They are brand
new and likely contain bugs or memory leaks.

## General

The only known issue resulting in a use-after-free bug requires custom a custom ChannelKeys instance
created as a part of a new channel. After the channel is created, the ChannelKeys object will not
be freed while the parent ChannelManager exists, however if the ChannelManager is garbage collected
while a ChannelMonitor object which is associated with the same channel exists, a use-after-free bug
may occur. This issue should be relatively rare as uses where a ChannelManager is removed while
associated ChannelMonitors exist is not anticipated.
