#!/bin/sh
if [ "$1" = "" -o "$2" = "" ]; then
	echo "USAGE: path/to/rust-lightning \"JNI_CFLAGS\""
	echo "For JNI_CFLAGS you probably want -I/usr/lib/jvm/java-11-openjdk-amd64/include/ -I/usr/lib/jvm/java-11-openjdk-amd64/include/linux/"
	exit 1
fi
set -e
./genbindings.py "$1/lightning-c-bindings/include/lightning.h" src/main/java/org/ldk/impl/bindings.java src/main/jni/bindings.c
javac -h src/main/jni src/main/java/org/ldk/impl/bindings.java
rm src/main/java/org/ldk/impl/bindings*.class
clang -Wall -o liblightningjni.so -shared -fPIC -Wno-pointer-sign -Isrc/main/jni -I"$1/lightning-c-bindings/include/" $2 src/main/jni/bindings.c "$1"/target/debug/liblightning.a
#clang -Wall -flto -fuse-ld=lld -O2 -o liblightningjni.so -shared -fPIC -Wno-pointer-sign -Isrc/main/jni -I"$1/lightning-c-bindings/include/" $2 src/main/jni/bindings.c "$1"/target/release/liblightning.a
