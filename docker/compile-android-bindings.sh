#!/bin/bash
export API=21 # Set this to your minSdkVersion.
export JNI_C_FLAGS=""

cd /app/rl/lightning-c-bindings

DEBUG="false"

set -e

# The observant eye will notice that the second target's prefix has arm, armv7 (rust), and armv7a (NDK clang). Why?!
declare -a targets_rust=("aarch64-linux-android" "armv7-linux-androideabi" "i686-linux-android" "x86_64-linux-android")
declare -a targets_ndk=("aarch64-linux-android" "armv7a-linux-androideabi" "i686-linux-android" "x86_64-linux-android")
declare -a target_names=("aarch64-linux-android" "arm-linux-androideabi" "i686-linux-android" "x86_64-linux-android")
declare -a folder_names=("arm64" "armeabi" "x86" "x86_64")
for (( i=0; i<4; i++ ));
do
    TARGET_RUST=${targets_rust[$i]}
    TARGET_CLANG=${targets_ndk[$i]}
    TARGET_NAME=${target_names[$i]}
    FOLDER=${folder_names[$i]}
    mkdir -p /app/shared/docker/out/$FOLDER
    printf "\n\nBUILDING RUST LIBRARY FOR: $TARGET_RUST (CLANG: $TARGET_CLANG, TRIPLE: $TARGET_NAME)\n"
    SHARED_COMPILATION_PREFIX="$TOOLCHAIN/bin/$TARGET_CLANG$API-clang -Wall -Wextra -Wno-unused-parameter -Wno-ignored-qualifiers -Wno-unused-function -Wno-nullability-completeness -Wno-pointer-sign -I/app/shared/src/main/jni -pthread -ldl -Wl,--no-undefined --sysroot=$SYSROOT -o /app/shared/docker/out/$FOLDER/liblightningjni.so -shared -fPIC -I/app/rl/lightning-c-bindings/include/ $JNI_C_FLAGS"
    if [ "$DEBUG" = "true" ]; then
        cargo build --target $TARGET_RUST
        printf "\nCOMPILING DEBUG JNI LIBRARY INTO: $FOLDER\n"
        $SHARED_COMPILATION_PREFIX -g -fsanitize=address -shared-libasan -Wl,-wrap,calloc -Wl,-wrap,realloc -Wl,-wrap,reallocarray -Wl,-wrap,malloc -Wl,-wrap,free -rdynamic /app/rl/lightning-c-bindings/target/$TARGET_RUST/debug/libldk.a /app/shared/src/main/jni/bindings.c -lm
    else
        cargo build --target $TARGET_RUST --release
        printf "\nCOMPILING RELEASE JNI LIBRARY INTO: $FOLDER\n"
        $SHARED_COMPILATION_PREFIX -Wl,--version-script="/app/shared/libcode.version" -fuse-ld=lld -O3 /app/rl/lightning-c-bindings/target/$TARGET_RUST/release/libldk.a /app/shared/src/main/jni/bindings.c -lm
    fi
done
