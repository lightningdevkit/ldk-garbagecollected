#!/bin/bash
usage() {
	echo "USAGE: path/to/rust-lightning \"JNI_CFLAGS\" debug"
	echo "For JNI_CFLAGS you probably want -I/usr/lib/jvm/java-11-openjdk-amd64/include/ -I/usr/lib/jvm/java-11-openjdk-amd64/include/linux/"
	echo "debug should either be true or false"
	exit 1
}
[ "$1" = "" -o "$2" = "" ] && usage
[ "$3" != "true" -a "$3" != "false" ] && usage

set -e
mkdir -p src/main/java/org/ldk/{enums,structs}
rm -f src/main/java/org/ldk/{enums,structs}/*.java
rm -f src/main/jni/*.h
./genbindings.py "$1/lightning-c-bindings/include/lightning.h" src/main/java/org/ldk/impl/bindings.java src/main/java/org/ldk src/main/jni/bindings.c $3
javac -h src/main/jni src/main/java/org/ldk/enums/*.java src/main/java/org/ldk/impl/bindings.java
rm src/main/java/org/ldk/enums/*.class src/main/java/org/ldk/impl/bindings*.class
COMPILE="clang -std=c11 -Wall -Wno-nullability-completeness -Wextra -Wno-unused-parameter -Wno-ignored-qualifiers -Wno-unused-function -Wl,--no-undefined -pthread -ldl -o liblightningjni.so -shared -fPIC -Wno-pointer-sign -Isrc/main/jni"
if [ "$3" = "true" ]; then
	$COMPILE -g -fsanitize=address -shared-libasan -Wl,-wrap,calloc -Wl,-wrap,realloc -Wl,-wrap,reallocarray -Wl,-wrap,malloc -Wl,-wrap,free -rdynamic -I"$1"/lightning-c-bindings/include/ $2 src/main/jni/bindings.c "$1"/lightning-c-bindings/target/debug/libldk.a
else
	$COMPILE -Wl,--version-script=libcode.version -flto -fuse-ld=lld -O3 -I"$1"/lightning-c-bindings/include/ $2 src/main/jni/bindings.c "$1"/lightning-c-bindings/target/release/libldk.a
fi
