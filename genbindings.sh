#!/bin/bash
usage() {
	echo "USAGE: path/to/ldk-c-bindings [wasm|\"JNI_CFLAGS\"] debug android_web"
	echo "For JNI_CFLAGS you probably want -I/usr/lib/jvm/java-11-openjdk-amd64/include/ -I/usr/lib/jvm/java-11-openjdk-amd64/include/linux/"
	echo "If JNI_CFLAGS is instead set to wasm, we build for wasm/TypeScript instead of Java"
	echo "debug should either be true, false, or leaks"
	echo "debug of leaks turns on leak tracking on an optimized release bianry"
	echo "android_web should either be true or false and indicates if we build for android (Java) or web (WASM)"
	exit 1
}
[ "$1" = "" ] && usage
[ "$3" != "true" -a "$3" != "false" -a "$3" != "leaks" ] && usage
[ "$4" != "true" -a "$4" != "false" ] && usage

set -e
set -x

if [ "$CC" != "" ]; then
	COMMON_COMPILE="$CC -std=c11 -Wall -Wextra -Wno-unused-parameter -Wno-ignored-qualifiers -Wno-unused-function -Wno-nullability-completeness -Wno-pointer-sign -Wdate-time -ffile-prefix-map=$(pwd)="
else
	CC=clang
	COMMON_COMPILE="clang -std=c11 -Wall -Wextra -Wno-unused-parameter -Wno-ignored-qualifiers -Wno-unused-function -Wno-nullability-completeness -Wno-pointer-sign -Wdate-time -ffile-prefix-map=$(pwd)="
fi

DEBUG_ARG="$3"
if [ "$3" = "leaks" ]; then
	DEBUG_ARG="true"
fi

cp "$1/lightning-c-bindings/include/lightning.h" ./
if [ "$(rustc --version --verbose | grep "host:")" = "host: x86_64-apple-darwin" ]; then
	# OSX sed is for some reason not compatible with GNU sed
	sed -i '' "s/TransactionOutputs/C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ/g" ./lightning.h
else
	sed -i "s/TransactionOutputs/C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ/g" ./lightning.h
fi

if [ "$2" != "wasm" ]; then
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

	if [ "$LDK_GARBAGECOLLECTED_GIT_OVERRIDE" = "" ]; then
		export LDK_GARBAGECOLLECTED_GIT_OVERRIDE=$(git describe --tag --dirty)
	fi
	if [ "${LDK_GARBAGECOLLECTED_GIT_OVERRIDE:0:1}" != "v" ]; then
		echo "Version tag should start with a v" > /dev/stderr
		exit 1
	fi

	if [ "$(rustc --version --verbose | grep "host:")" = "host: x86_64-apple-darwin" ]; then
		# OSX sed is for some reason not compatible with GNU sed
		sed -i '' "s/^    <version>.*<\/version>/    <version>${LDK_GARBAGECOLLECTED_GIT_OVERRIDE:1:100}<\/version>/g" pom.xml
	else
		sed -i "s/^    <version>.*<\/version>/    <version>${LDK_GARBAGECOLLECTED_GIT_OVERRIDE:1:100}<\/version>/g" pom.xml
	fi

	echo "Creating Java bindings..."
	mkdir -p src/main/java/org/ldk/{enums,structs}
	rm -f src/main/java/org/ldk/{enums,structs}/*.java
	rm -f src/main/jni/*.h
	if [ "$4" = "true" ]; then
		./genbindings.py "./lightning.h" src/main/java/org/ldk/impl src/main/java/org/ldk src/main/jni/ $DEBUG_ARG android $4
	else
		./genbindings.py "./lightning.h" src/main/java/org/ldk/impl src/main/java/org/ldk src/main/jni/ $DEBUG_ARG java $4
	fi
	rm -f src/main/jni/bindings.c
	if [ "$3" = "true" ]; then
		echo "#define LDK_DEBUG_BUILD" > src/main/jni/bindings.c
	elif [ "$3" = "leaks" ]; then
		# For leak checking we use release libldk which doesn't expose
		# __unmangle_inner_ptr, but the C code expects to be able to call it.
		echo "#define __unmangle_inner_ptr(a) (a)" > src/main/jni/bindings.c
	fi
	echo "#define LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ LDKCVec_TransactionOutputsZ" >> src/main/jni/bindings.c
	echo "#define CVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_free CVec_TransactionOutputsZ_free" >> src/main/jni/bindings.c
	cat src/main/jni/bindings.c.body >> src/main/jni/bindings.c
	javac -h src/main/jni src/main/java/org/ldk/enums/*.java src/main/java/org/ldk/impl/*.java
	rm src/main/java/org/ldk/enums/*.class src/main/java/org/ldk/impl/bindings*.class

	IS_MAC=false
	[ "$($CC --version | grep apple-darwin)" != "" ] && IS_MAC=true
	IS_APPLE_CLANG=false
	[ "$($CC --version | grep "Apple clang version")" != "" ] && IS_APPLE_CLANG=true

	echo "Building Java bindings..."
	COMPILE="$COMMON_COMPILE -mcpu=$LDK_TARGET_CPU -Isrc/main/jni -pthread -ldl -shared -fPIC"
	[ "$IS_MAC" = "false" ] && COMPILE="$COMPILE -Wl,--no-undefined"
	[ "$IS_MAC" = "true" ] && COMPILE="$COMPILE -mmacosx-version-min=10.9"
	[ "$IS_MAC" = "true" -a "$IS_APPLE_CLANG" = "false" ] && COMPILE="$COMPILE -fuse-ld=lld"
	[ "$IS_MAC" = "true" -a "$IS_APPLE_CLANG" = "false" ] && echo "WARNING: Need at least upstream clang 13!"
	[ "$IS_MAC" = "false" -a "$3" != "false" ] && COMPILE="$COMPILE -Wl,-wrap,calloc -Wl,-wrap,realloc -Wl,-wrap,malloc -Wl,-wrap,free"
	if [ "$3" = "true" ]; then
		$COMPILE -o liblightningjni_debug$LDK_TARGET_SUFFIX.so -g -fsanitize=address -shared-libasan -rdynamic -I"$1"/lightning-c-bindings/include/ $2 src/main/jni/bindings.c "$1"/lightning-c-bindings/target/$LDK_TARGET/debug/libldk.a -lm
	else
		LDK_LIB="$1"/lightning-c-bindings/target/$LDK_TARGET/release/libldk.a
		if [ "$IS_MAC" = "false" -a "$4" = "false" ]; then
			COMPILE="$COMPILE -Wl,--version-script=libcode.version -fuse-ld=lld"
			# __cxa_thread_atexit_impl is used to more effeciently cleanup per-thread local storage by rust libstd.
			# However, it is not available on glibc versions 2.17 or earlier, and rust libstd has a null-check and
			# fallback in case it is missing.
			# Because it is weak-linked on the rust side, we should be able to simply define it
			# explicitly, forcing rust to use the fallback. However, for some reason involving ancient
			# dark magic and haunted code segments, overriding the weak symbol only impacts sites which
			# *call* the symbol in question, not sites which *compare with* the symbol in question.
			# This means that the NULL check in rust's libstd will always think the function is
			# callable while the function which is called ends up being NULL (leading to a jmp to the
			# zero page and a quick SEGFAULT).
			# This issue persists not only with directly providing a symbol, but also ld.lld's -wrap
			# and --defsym arguments.
			# In smaller programs, it appears to be possible to work around this with -Bsymbolic and
			# -nostdlib, however when applied the full-sized JNI library here it no longer works.
			# After exhausting nearly every flag documented in lld, the only reliable method appears
			# to be editing the LDK binary. Luckily, LLVM's tooling makes this rather easy as we can
			# disassemble it into very readable code, edit it, and then reassemble it.
			# Note that if we do so we don't have to bother overriding the actual call, LLVM should
			# optimize it away, which also provides a good check that there isn't anything actually
			# relying on it elsewhere.
			[ ! -f "$1"/lightning-c-bindings/target/$LDK_TARGET/release/libldk.a ] && exit 1
			if [ "$(ar t "$1"/lightning-c-bindings/target/$LDK_TARGET/release/libldk.a | grep -v "\.o$" || echo)" != "" ]; then
				echo "Archive contained non-object files!"
				exit 1
			fi
			if [ "$(ar t "$1"/lightning-c-bindings/target/$LDK_TARGET/release/libldk.a | grep ldk.ldk.*-cgu.*.rcgu.o | wc -l)" != "1" ]; then
				echo "Archive contained more than one LDK object file"
				exit 1
			fi
			mkdir -p tmp
			rm -f tmp/*
			ar x --output=tmp "$1"/lightning-c-bindings/target/$LDK_TARGET/release/libldk.a
			pushd tmp
			llvm-dis ldk.ldk.*-cgu.*.rcgu.o
			sed -i 's/br i1 icmp eq (i8\* @__cxa_thread_atexit_impl, i8\* null)/br i1 icmp eq (i8* null, i8* null)/g' ldk.ldk.*-cgu.*.rcgu.o.ll
			llvm-as ldk.ldk.*-cgu.*.rcgu.o.ll -o ./libldk.bc
			ar q libldk.a *.o
			popd
			LDK_LIB="tmp/libldk.bc tmp/libldk.a"
		fi
		$COMPILE -o liblightningjni_release$LDK_TARGET_SUFFIX.so -flto -O3 -I"$1"/lightning-c-bindings/include/ $2 src/main/jni/bindings.c $LDK_LIB
		if [ "$IS_MAC" = "false" -a "$4" = "false" ]; then
			GLIBC_SYMBS="$(objdump -T liblightningjni_release$LDK_TARGET_SUFFIX.so | grep GLIBC_ | grep -v "GLIBC_2\.2\." | grep -v "GLIBC_2\.3\(\.\| \)" | grep -v "GLIBC_2.\(14\|17\) " || echo)"
			if [ "$GLIBC_SYMBS" != "" ]; then
				echo "Unexpected glibc version dependency! Some users need glibc 2.17 support, symbols for newer glibcs cannot be included."
				echo "$GLIBC_SYMBS"
				exit 1
			fi
			REALLOC_ARRAY_SYMBS="$(objdump -T liblightningjni_release$LDK_TARGET_SUFFIX.so | grep reallocarray || echo)"
			if [ "$REALLOC_ARRAY_SYMBS" != "" ]; then
				echo "Unexpected reallocarray dependency!"
				exit 1
			fi
		fi
		if [ "$LDK_JAR_TARGET" = "true" ]; then
			# Copy to JNI native directory for inclusion in JARs
			mkdir -p src/main/resources/
			cp liblightningjni_release$LDK_TARGET_SUFFIX.so src/main/resources/liblightningjni$LDK_TARGET_SUFFIX.nativelib
		fi
	fi
else
	echo "Creating TS bindings..."
	mkdir -p ts/{enums,structs}
	rm -f ts/{enums,structs,}/*.{mjs,mts}
	if [ "$4" = "false" ]; then
		./genbindings.py "./lightning.h" ts ts ts $DEBUG_ARG typescript node
	else
		./genbindings.py "./lightning.h" ts ts ts $DEBUG_ARG typescript browser
	fi
	rm -f ts/bindings.c
	if [ "$3" = "true" ]; then
		echo "#define LDK_DEBUG_BUILD" > ts/bindings.c
	elif [ "$3" = "leaks" ]; then
		# For leak checking we use release libldk which doesn't expose
		# __unmangle_inner_ptr, but the C code expects to be able to call it.
		echo "#define __unmangle_inner_ptr(a) (a)" > ts/bindings.c
	fi
	echo "#define LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ LDKCVec_TransactionOutputsZ" >> ts/bindings.c
	echo "#define CVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_free CVec_TransactionOutputsZ_free" >> ts/bindings.c
	cat ts/bindings.c.body >> ts/bindings.c

	echo "Building TS bindings..."
	COMPILE="$COMMON_COMPILE -flto -Wl,--no-entry -Wl,--export-dynamic -Wl,-allow-undefined -nostdlib --target=wasm32-wasi"
	# We only need malloc and assert/abort, but for now just use WASI for those:
	#EXTRA_LINK=/usr/lib/wasm32-wasi/libc.a
	EXTRA_LINK=
	[ "$3" != "false" ] && COMPILE="$COMPILE -Wl,-wrap,calloc -Wl,-wrap,realloc -Wl,-wrap,reallocarray -Wl,-wrap,malloc -Wl,-wrap,free"
	if [ "$3" = "true" ]; then
		WASM_FILE=liblightningjs_debug.wasm
		$COMPILE -o liblightningjs_debug.wasm -g -I"$1"/lightning-c-bindings/include/ ts/bindings.c "$1"/lightning-c-bindings/target/wasm32-wasi/debug/libldk.a $EXTRA_LINK
	else
		WASM_FILE=liblightningjs_release.wasm
		$COMPILE -o liblightningjs_release.wasm -s -Os -I"$1"/lightning-c-bindings/include/ ts/bindings.c "$1"/lightning-c-bindings/target/wasm32-wasi/release/libldk.a $EXTRA_LINK
	fi

	if [ -x "$(which tsc)" ]; then
		cd ts
	rm -r structs # TODO: Make the human-types compile
		if [ "$4" = "true" ]; then
			tsc
		else
			tsc --types node --typeRoots .
			cd ..
			if [ -x "$(which node)" ]; then
				NODE_V="$(node --version)"
				if [ "${NODE_V:1:2}" -gt 14 ]; then
					rm -f liblightningjs.wasm
					ln -s $WASM_FILE liblightningjs.wasm
					node ts/test/node.mjs
				fi
			fi
		fi
	fi
fi
