# Android Compilation

Several steps are necessary in order to compile LDK bindings for Android.

1. Android-compatible Java Native Interface (JNI) binding files need to be generated.
2. Rust-Lightning's C interface that is accessed by the JNI methods needs to be compiled for Android.
3. The JNI files need to be compiled into a shared library.

Steps 2 and 3 need to be repeated for all four existing Android architectures.

## Prerequisites

Before we can get started, make sure the following requirements are met:

- Docker is installed on the machine.
- The `rust-lightning` repository is cloned locally.
- Inside the `rust-lightning` repository, `genbindings.sh` has been run and, 
  consequently, the `lightning-c-bindings` subdirectory is up-to-date.

## Setup

### Generate JNI files

In the project directory, run the `genbindings.sh` script with the following arguments:

```shell
host:ldk-java$ ./genbindings.sh <path/to/rust-lightning> " " false true
```

The second argument, `" "` (the space), is to indicate that we don't need JNI C flags.

The third argument, `false`, is to indicate that we don't want a debug version, but a release version.

And the fourth argument, `true`, indicates that we need bindings for Android, as opposed to "regular" Java.

You might see a compilation error such as `fatal error: 'jni.h' file not found`, 
but that is actually fine/expected, because we only need the first step to complete successfully,
which is indicated in the output log by the statement `Creating Java bindings…`
being immediately succeeded by `Building Java bindings…`.

### Build Docker image

This step might take a while, but only needs to happen once. In the project directory, run

```shell
host:ldk-java$ ./docker-build.sh
```

This will build a reusable Docker image with necessary components for compiling
Rust and C code for Android.

## Generate

You've made it through setup and now just need to actually run the compilation
script inside Docker. 

Once again in the project diretory, run

```shell
host:ldk-java$ ./docker-compile-android.sh <path/to/rust-lightning>
```

This will compile everything you need for Android's four architectures, and the output
will be generated in the `docker/out` directory.
