#!/bin/sh
usage() {
	echo "USAGE: path/to/rust-lightning \"JNI_CFLAGS\" debug"
	echo "For JNI_CFLAGS you probably want -I/usr/lib/jvm/java-11-openjdk-amd64/include/ -I/usr/lib/jvm/java-11-openjdk-amd64/include/linux/"
	echo "debug should either be true or false"
	exit 1
}
[ "$1" = "" -o "$2" = "" ] && usage
[ "$3" != "true" -a "$3" != "false" ] && usage

set -e
./genbindings.py "$1/lightning-c-bindings/include/lightning.h" src/main/java/org/ldk/impl/bindings.java src/main/jni/bindings.c $3
javac -h src/main/jni src/main/java/org/ldk/impl/bindings.java
rm src/main/java/org/ldk/impl/bindings*.class
if [ "$3" = "true" ]; then
	clang -std=c11 -Wall -Wno-unused-function -g -pthread -ldl -fsanitize=address -o liblightningjni.so -shared -fPIC -Wno-pointer-sign -Isrc/main/jni -I"$1/lightning-c-bindings/include/" $2 src/main/jni/bindings.c "$1"/target/debug/liblightning.a
else
	clang -Wall -Wno-unused-function -Wl,--no-undefined -shared-libasan -pthread -ldl -flto -fuse-ld=lld -O2 -o liblightningjni.so -shared -fPIC -Wno-pointer-sign -Isrc/main/jni -I"$1/lightning-c-bindings/include/" $2 src/main/jni/bindings.c "$1"/target/release/liblightning.a
fi
