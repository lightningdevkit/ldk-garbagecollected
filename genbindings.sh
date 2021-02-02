#!/bin/bash
usage() {
	echo "USAGE: path/to/rust-lightning \"JNI_CFLAGS\" debug android"
	echo "For JNI_CFLAGS you probably want -I/usr/lib/jvm/java-11-openjdk-amd64/include/ -I/usr/lib/jvm/java-11-openjdk-amd64/include/linux/"
	echo "debug should either be true or false"
	echo "android should either be true or false"
	exit 1
}
[ "$1" = "" -o "$2" = "" ] && usage
[ "$3" != "true" -a "$3" != "false" ] && usage
[ "$4" != "true" -a "$4" != "false" ] && usage

if [ "$CC" != "" ]; then
	COMMON_COMPILE="$CC -std=c11 -Wall -Wextra -Wno-unused-parameter -Wno-ignored-qualifiers -Wno-unused-function -Wno-nullability-completeness -Wno-pointer-sign"
else
	COMMON_COMPILE="clang -std=c11 -Wall -Wextra -Wno-unused-parameter -Wno-ignored-qualifiers -Wno-unused-function -Wno-nullability-completeness -Wno-pointer-sign"
fi

set -e

echo "Creating Java bindings..."
mkdir -p src/main/java/org/ldk/{enums,structs}
rm -f src/main/java/org/ldk/{enums,structs}/*.java
rm -f src/main/jni/*.h
if [ "$4" = "true" ]; then
	./genbindings.py "$1/lightning-c-bindings/include/lightning.h" src/main/java/org/ldk/impl/bindings.java src/main/java/org/ldk src/main/jni/bindings.c $3 android $4
else
	./genbindings.py "$1/lightning-c-bindings/include/lightning.h" src/main/java/org/ldk/impl/bindings.java src/main/java/org/ldk src/main/jni/bindings.c $3 java $4
fi
javac -h src/main/jni src/main/java/org/ldk/enums/*.java src/main/java/org/ldk/impl/bindings.java
rm src/main/java/org/ldk/enums/*.class src/main/java/org/ldk/impl/bindings*.class

echo "Building Java bindings..."
COMPILE="$COMMON_COMPILE -Isrc/main/jni -pthread -ldl -Wl,--no-undefined -o liblightningjni.so -shared -fPIC"
if [ "$3" = "true" ]; then
	$COMPILE -g -fsanitize=address -shared-libasan -Wl,-wrap,calloc -Wl,-wrap,realloc -Wl,-wrap,reallocarray -Wl,-wrap,malloc -Wl,-wrap,free -rdynamic -I"$1"/lightning-c-bindings/include/ $2 src/main/jni/bindings.c "$1"/lightning-c-bindings/target/debug/libldk.a -lm
else
	$COMPILE -Wl,--version-script=libcode.version -flto -fuse-ld=lld -O3 -I"$1"/lightning-c-bindings/include/ $2 src/main/jni/bindings.c "$1"/lightning-c-bindings/target/release/libldk.a
fi

echo "Creating TS bindings..."
mkdir -p ts/{enums,structs}
rm -f ts/{enums,structs}/*.ts
./genbindings.py "$1/lightning-c-bindings/include/lightning.h" ts/bindings.ts ts ts/bindings.c $3 typescript

echo "Building TS bindings..."
COMPILE="$COMMON_COMPILE -flto -Wl,--no-entry -Wl,--export-dynamic -Wl,-allow-undefined -nostdlib --target=wasm32-wasi -o liblightningjs.wasm"
# We only need malloc and assert/abort, but for now just use WASI for those:
#EXTRA_LINK=/usr/lib/wasm32-wasi/libc.a
EXTRA_LINK=
if [ "$3" = "true" ]; then
	$COMPILE -g -Wl,-wrap,calloc -Wl,-wrap,realloc -Wl,-wrap,reallocarray -Wl,-wrap,malloc -Wl,-wrap,free -I"$1"/lightning-c-bindings/include/ ts/bindings.c "$1"/lightning-c-bindings/target/wasm32-wasi/debug/libldk.a $EXTRA_LINK
else
	$COMPILE -s -Os -I"$1"/lightning-c-bindings/include/ ts/bindings.c "$1"/lightning-c-bindings/target/wasm32-wasi/release/libldk.a $EXTRA_LINK
fi
