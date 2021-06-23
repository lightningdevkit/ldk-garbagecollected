#!/bin/bash
usage() {
	echo "USAGE: path/to/ldk-c-bindings \"JNI_CFLAGS\" debug android"
	echo "For JNI_CFLAGS you probably want -I/usr/lib/jvm/java-11-openjdk-amd64/include/ -I/usr/lib/jvm/java-11-openjdk-amd64/include/linux/"
	echo "debug should either be true or false"
	echo "android should either be true or false"
	exit 1
}
[ "$1" = "" ] && usage
[ "$3" != "true" -a "$3" != "false" ] && usage
[ "$4" != "true" -a "$4" != "false" ] && usage

set -x

if [ "$CC" != "" ]; then
	COMMON_COMPILE="$CC -std=c11 -Wall -Wextra -Wno-unused-parameter -Wno-ignored-qualifiers -Wno-unused-function -Wno-nullability-completeness -Wno-pointer-sign -Wdate-time -ffile-prefix-map=$(pwd)="
else
	CC=clang
	COMMON_COMPILE="clang -std=c11 -Wall -Wextra -Wno-unused-parameter -Wno-ignored-qualifiers -Wno-unused-function -Wno-nullability-completeness -Wno-pointer-sign -Wdate-time -ffile-prefix-map=$(pwd)="
fi

TARGET_STRING="$LDK_TARGET"
if [ "$TARGET_STRING" = "" ]; then
	# We assume clang-style $CC --version here, but worst-case we just get an empty suffix
	TARGET_STRING="$($CC --version | grep Target | awk '{ print $2 }')"
fi
case "$TARGET_STRING" in
	"x86_64-pc-linux"*)
		LDK_TARGET_SUFFIX="_Linux-amd64"
		LDK_JAR_TARGET=true
		;;
	"x86_64-apple-darwin"*)
		LDK_TARGET_SUFFIX="_MacOSX-x86_64"
		LDK_JAR_TARGET=true
		;;
	"aarch64-apple-darwin"*)
		LDK_TARGET_SUFFIX="_MacOSX-aarch64"
		LDK_JAR_TARGET=true
		;;
	*)
		LDK_TARGET_SUFFIX="_${TARGET_STRING}"
esac
if [ "$LDK_TARGET_CPU" = "" ]; then
	LDK_TARGET_CPU="sandybridge"
fi

set -e

if [ "$LDK_GARBAGECOLLECTED_GIT_OVERRIDE" = "" ]; then
	export LDK_GARBAGECOLLECTED_GIT_OVERRIDE=$(git describe --tag --dirty)
fi

cp "$1/lightning-c-bindings/include/lightning.h" ./
if [ "$(rustc --version --verbose | grep "host:")" = "host: x86_64-apple-darwin" ]; then
	# OSX sed is for some reason not compatible with GNU sed
	sed -i '' "s/TransactionOutputs/C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ/g" ./lightning.h
else
	sed -i "s/TransactionOutputs/C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ/g" ./lightning.h
fi

echo "Creating Java bindings..."
mkdir -p src/main/java/org/ldk/{enums,structs}
rm -f src/main/java/org/ldk/{enums,structs}/*.java
rm -f src/main/jni/*.h
if [ "$4" = "true" ]; then
	./genbindings.py "./lightning.h" src/main/java/org/ldk/impl/bindings.java src/main/java/org/ldk src/main/jni/bindings.c.body $3 android $4
else
	./genbindings.py "./lightning.h" src/main/java/org/ldk/impl/bindings.java src/main/java/org/ldk src/main/jni/bindings.c.body $3 java $4
fi
echo "#define LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ LDKCVec_TransactionOutputsZ" > src/main/jni/bindings.c
echo "#define CVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_free CVec_TransactionOutputsZ_free" >> src/main/jni/bindings.c
cat src/main/jni/bindings.c.body >> src/main/jni/bindings.c
javac -h src/main/jni src/main/java/org/ldk/enums/*.java src/main/java/org/ldk/impl/bindings.java
rm src/main/java/org/ldk/enums/*.class src/main/java/org/ldk/impl/bindings*.class

IS_MAC=false
[ "$($CC --version | grep apple-darwin)" != "" ] && IS_MAC=true

echo "Building Java bindings..."
COMPILE="$COMMON_COMPILE -mcpu=$LDK_TARGET_CPU -Isrc/main/jni -pthread -ldl -shared -fPIC"
[ "$IS_MAC" = "false" ] && COMPILE="$COMPILE -Wl,--no-undefined"
[ "$IS_MAC" = "true" ] && COMPILE="$COMPILE -mmacosx-version-min=10.9"
if [ "$3" = "true" ]; then
	[ "$IS_MAC" = "false" ] && COMPILE="$COMPILE -Wl,-wrap,calloc -Wl,-wrap,realloc -Wl,-wrap,reallocarray -Wl,-wrap,malloc -Wl,-wrap,free"
	$COMPILE -o liblightningjni_debug$LDK_TARGET_SUFFIX.so -g -fsanitize=address -shared-libasan -rdynamic -I"$1"/lightning-c-bindings/include/ $2 src/main/jni/bindings.c "$1"/lightning-c-bindings/target/$LDK_TARGET/debug/libldk.a -lm
else
	if [ "$IS_MAC" = "false" ]; then
		COMPILE="$COMPILE -Wl,--version-script=libcode.version -fuse-ld=lld"
		echo "// __cxa_thread_atexit_impl is used to more effeciently cleanup per-thread local storage by rust libstd." >> src/main/jni/bindings.c
		echo "// However, it is not available on glibc versions 2.17 or earlier, and rust libstd has a null-check and fallback in case it is missing." >> src/main/jni/bindings.c
		echo "// Because it is weak-linked on the rust side, we can simply define it explicitly here, forcing rust to use the fallback." >> src/main/jni/bindings.c
		echo "void *__cxa_thread_atexit_impl = NULL;" >> src/main/jni/bindings.c
	fi
	$COMPILE -o liblightningjni_release$LDK_TARGET_SUFFIX.so -flto -O3 -I"$1"/lightning-c-bindings/include/ $2 src/main/jni/bindings.c "$1"/lightning-c-bindings/target/$LDK_TARGET/release/libldk.a
	if [ "$IS_MAC" = "false" ]; then
		set +e # grep exits with 1 if no lines were left, which is our success condition
		GLIBC_SYMBS="$(objdump -T liblightningjni_release$LDK_TARGET_SUFFIX.so | grep GLIBC_ | grep -v "GLIBC_2\.2\." | grep -v "GLIBC_2\.3\(\.\| \)" | grep -v "GLIBC_2.\(14\|17\) ")"
		set -e
		if [ "$GLIBC_SYMBS" != "" ]; then
			echo "Unexpected glibc version dependency! Some users need glibc 2.17 support, symbols for newer glibcs cannot be included."
			echo "$GLIBC_SYMBS"
			exit 1
		fi
	fi
	if [ "$LDK_JAR_TARGET" = "true" ]; then
		# Copy to JNI native directory for inclusion in JARs
		cp liblightningjni_release$LDK_TARGET_SUFFIX.so src/main/resources/liblightningjni$LDK_TARGET_SUFFIX.nativelib
	fi
fi

echo "Creating TS bindings..."
mkdir -p ts/{enums,structs}
rm -f ts/{enums,structs}/*.ts
./genbindings.py "./lightning.h" ts/bindings.ts ts ts/bindings.c.body $3 typescript
echo "#define LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ LDKCVec_TransactionOutputsZ" > ts/bindings.c
echo "#define CVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_free CVec_TransactionOutputsZ_free" >> ts/bindings.c
cat ts/bindings.c.body >> ts/bindings.c

echo "Building TS bindings..."
COMPILE="$COMMON_COMPILE -flto -Wl,--no-entry -Wl,--export-dynamic -Wl,-allow-undefined -nostdlib --target=wasm32-wasi"
# We only need malloc and assert/abort, but for now just use WASI for those:
#EXTRA_LINK=/usr/lib/wasm32-wasi/libc.a
EXTRA_LINK=
if [ "$3" = "true" ]; then
	$COMPILE -o liblightningjs_debug.wasm -g -Wl,-wrap,calloc -Wl,-wrap,realloc -Wl,-wrap,reallocarray -Wl,-wrap,malloc -Wl,-wrap,free -I"$1"/lightning-c-bindings/include/ ts/bindings.c "$1"/lightning-c-bindings/target/wasm32-wasi/debug/libldk.a $EXTRA_LINK
else
	$COMPILE -o liblightningjs_release.wasm -s -Os -I"$1"/lightning-c-bindings/include/ ts/bindings.c "$1"/lightning-c-bindings/target/wasm32-wasi/release/libldk.a $EXTRA_LINK
fi
