#!/bin/bash
usage() {
	echo "USAGE: path/to/ldk-c-bindings [wasm|\"JNI_CFLAGS\"] debug android_web"
	echo "For JNI_CFLAGS you probably want -I/usr/lib/jvm/java-11-openjdk-amd64/include/ -I/usr/lib/jvm/java-11-openjdk-amd64/include/linux/"
	echo "If JNI_CFLAGS is instead set to wasm, we build for wasm/TypeScript instead of Java"
	echo "debug should either be true, false, or leaks"
	echo "debug of leaks turns on leak tracking on an optimized release bianry"
	echo "android_web should either be true or false and indicates if we build for android (Java) or web (WASM)"
	echo "Note that web currently generates the same results as !web (ie Node.JS)"
	exit 1
}
[ "$1" = "" ] && usage
[ "$3" != "true" -a "$3" != "false" -a "$3" != "leaks" ] && usage
[ "$4" != "true" -a "$4" != "false" ] && usage

set -e
set -x

function is_gnu_sed(){
  sed --version >/dev/null 2>&1
}

if [ "$CC" = "" ]; then
	CC=clang
fi

TARGET_STRING="$LDK_TARGET"
if [ "$TARGET_STRING" = "" ]; then
	# We assume clang-style $CC --version here, but worst-case we just get an empty suffix
	TARGET_STRING="$($CC --version | grep Target | awk '{ print $2 }')"
fi

IS_MAC=false
IS_WIN=false

[ "$($CC --version | grep apple-darwin)" != "" ] && IS_MAC=true
IS_APPLE_CLANG=false
[ "$($CC --version | grep "Apple clang version")" != "" ] && IS_APPLE_CLANG=true

case "$TARGET_STRING" in
	"x86_64-pc-linux"*)
		LDK_TARGET_SUFFIX="_Linux-amd64"
		CS_PLATFORM_NAME="linux-x64"
		LDK_JAR_TARGET=true
		;;
	"x86_64-redhat-linux"*)
		LDK_TARGET_SUFFIX="_Linux-amd64"
		CS_PLATFORM_NAME="linux-x64"
		LDK_JAR_TARGET=true
		;;
	"x86_64-apple-darwin"*)
		LDK_TARGET_SUFFIX="_MacOSX-x86_64"
		CS_PLATFORM_NAME="osx-x64"
		LDK_JAR_TARGET=true
		IS_MAC=true
		;;
	"aarch64-apple-darwin"*)
		LDK_TARGET_CPU="apple-a14"
		LDK_TARGET_SUFFIX="_MacOSX-aarch64"
		CS_PLATFORM_NAME="osx-arm64"
		LDK_JAR_TARGET=true
		IS_MAC=true
		;;
	"x86_64-pc-windows"*)
		LDK_TARGET_SUFFIX="_Win-amd64"
		CS_PLATFORM_NAME="win-x64"
		LDK_JAR_TARGET=true
		IS_WIN=true
		;;
	*)
		LDK_TARGET_SUFFIX="_${TARGET_STRING}"
esac
if [ "$LDK_TARGET_CPU" = "" ]; then
	LDK_TARGET_CPU="sandybridge"
fi

COMMON_COMPILE="$CC -std=c11 -Wall -Wextra -Wno-unused-parameter -Wno-ignored-qualifiers -Wno-unused-function -Wno-nullability-completeness -Wno-pointer-sign -Wdate-time -ffile-prefix-map=$(pwd)="
[ "$IS_MAC" = "true" -a "$2" != "wasm" ] && COMMON_COMPILE="$COMMON_COMPILE --target=$TARGET_STRING -mcpu=$LDK_TARGET_CPU"

DEBUG_ARG="$3"
if [ "$3" = "leaks" ]; then
	DEBUG_ARG="true"
fi

cp "$1/lightning-c-bindings/include/lightning.h" ./
if is_gnu_sed; then
	sed -i "s/TransactionOutputs/C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ/g" ./lightning.h
else
	# OSX sed is for some reason not compatible with GNU sed
	sed -i '' "s/TransactionOutputs/C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZ/g" ./lightning.h
fi
echo "#define LDKCVec_C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZZ LDKCVec_TransactionOutputsZ" > header.c
echo "#define CVec_C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZZ_free CVec_TransactionOutputsZ_free" >> header.c


if [ "$LDK_GARBAGECOLLECTED_GIT_OVERRIDE" = "" ]; then
	export LDK_GARBAGECOLLECTED_GIT_OVERRIDE=$(git describe --tag --dirty)
fi
if [ "${LDK_GARBAGECOLLECTED_GIT_OVERRIDE:0:1}" != "v" ]; then
	echo "Version tag should start with a v" > /dev/stderr
	exit 1
fi


if [ "$2" = "c_sharp" ]; then
	echo "Creating C# bindings..."
	mkdir -p c_sharp/src/org/ldk/{enums,structs,impl}
	rm -f c_sharp/src/org/ldk/{enums,structs,impl}/*.cs
	GEN_PLAT="c_sharp-linux"
	[ "$IS_WIN" = "true" ] && GEN_PLAT="c_sharp-win"
	[ "$IS_MAC" = "true" ] && GEN_PLAT="c_sharp-darwin"
	./genbindings.py "./lightning.h" c_sharp/src/org/ldk/impl c_sharp/src/org/ldk c_sharp/ $DEBUG_ARG $GEN_PLAT $4 $TARGET_STRING
	rm -f c_sharp/bindings.c
	if [ "$3" = "true" ]; then
		echo "#define LDK_DEBUG_BUILD" > c_sharp/bindings.c
	elif [ "$3" = "leaks" ]; then
		# For leak checking we use release libldk which doesn't expose
		# __unmangle_inner_ptr, but the C code expects to be able to call it.
		echo "#define __unmangle_inner_ptr(a) (a)" > c_sharp/bindings.c
	fi
	cat header.c >> c_sharp/bindings.c
	cat header.c >> c_sharp/bindings.c
	cat c_sharp/bindings.c.body >> c_sharp/bindings.c

	IS_MAC=false
	[ "$($CC --version | grep apple-darwin)" != "" ] && IS_MAC=true
	IS_APPLE_CLANG=false
	[ "$($CC --version | grep "Apple clang version")" != "" ] && IS_APPLE_CLANG=true

	if is_gnu_sed; then
		sed -i "s/<version>.*<\/version>/<version>${LDK_GARBAGECOLLECTED_GIT_OVERRIDE:1:100}<\/version>/g" c_sharp/packaging_artifacts/org.ldk.nuspec
		sed -i "s/<version>.*<\/version>/<version>${LDK_GARBAGECOLLECTED_GIT_OVERRIDE:1:100}<\/version>/g" c_sharp/packaging_artifacts/package/services/metadata/core-properties/ldk.psmdcp
	else
		# OSX sed is for some reason not compatible with GNU sed
		sed -i '' "s/<version>.*<\/version>/<version>${LDK_GARBAGECOLLECTED_GIT_OVERRIDE:1:100}<\/version>/g" c_sharp/packaging_artifacts/org.ldk.nuspec
		sed -i '' "s/<version>.*<\/version>/<version>${LDK_GARBAGECOLLECTED_GIT_OVERRIDE:1:100}<\/version>/g" c_sharp/packaging_artifacts/package/services/metadata/core-properties/ldk.psmdcp
	fi

	# Compiling C# bindings with Mono
	if [ "$3" = "true" ]; then
		mono-csc -g -out:csharpldk.dll -langversion:3 -t:library -unsafe c_sharp/src/org/ldk/enums/*.cs c_sharp/src/org/ldk/impl/*.cs c_sharp/src/org/ldk/util/*.cs c_sharp/src/org/ldk/structs/*.cs
	else
		cd c_sharp
		dotnet build --configuration Release
		cd ..
	fi

	echo "Building C# bindings..."
	COMPILE="$COMMON_COMPILE -pthread -fPIC"
	LINK="-shared"
	[ "$IS_WIN" = "false" ] && LINK="$LINK -ldl"
	[ "$IS_MAC" = "false" ] && LINK="$LINK -Wl,--no-undefined"
	[ "$IS_MAC" = "true" ] && COMPILE="$COMPILE -mmacosx-version-min=10.9"
	[ "$IS_MAC" = "true" -a "$IS_APPLE_CLANG" = "false" ] && LINK="$LINK -fuse-ld=lld"
	[ "$IS_MAC" = "true" -a "$IS_APPLE_CLANG" = "false" ] && echo "WARNING: Need at least upstream clang 13!"
	[ "$IS_MAC" = "false" -a "$3" != "false" ] && LINK="$LINK -Wl,-wrap,calloc -Wl,-wrap,realloc -Wl,-wrap,malloc -Wl,-wrap,free"
	[ "$IS_WIN" = "true" ] && LINK="$LINK --target=x86_64-pc-windows-gnu -lbcrypt -lntdll -static-libgcc"
	[ "$IS_WIN" = "true" ] && COMPILE="$COMPILE --target=x86_64-pc-windows-gnu -I/usr/x86_64-w64-mingw32/sys-root/mingw/include/ -I/usr/x86_64-w64-mingw32/include/"

	if [ "$3" = "true" ]; then
		$COMPILE $LINK -o libldkcsharp_debug$LDK_TARGET_SUFFIX.so -g -fsanitize=address -shared-libasan -rdynamic -I"$1"/lightning-c-bindings/include/ c_sharp/bindings.c "$1"/lightning-c-bindings/target/$LDK_TARGET/debug/libldk.a -lm
	else
		[ "$IS_APPLE_CLANG" = "false" ] && LINK="$LINK -flto -Wl,-O3 -fuse-ld=lld"
		[ "$IS_APPLE_CLANG" = "false" ] && COMPILE="$COMPILE -flto"
		[ "$IS_MAC" = "false" ] && LINK="$LINK -Wl,--no-undefined"
		[ "$IS_WIN" = "false" ] && LINK="$LINK -Wl,--lto-O3"
		LDK_LIB="$1"/lightning-c-bindings/target/$LDK_TARGET/release/libldk.a
		if [ "$IS_MAC" = "false" -a "$IS_WIN" = "false" -a "$4" = "false" ]; then
			LINK="$LINK -Wl,--version-script=c_sharp/libcode.version -Wl,--build-id=0x0000000000000000"
		fi

		# When building for Windows, a timestamp is included in the resulting dll,
		# so we have to build with faketime.
		faketime -f "2021-01-01 00:00:00" $COMPILE -o bindings.o -c -O3 -I"$1"/lightning-c-bindings/include/ c_sharp/bindings.c
		faketime -f "2021-01-01 00:00:00" $COMPILE $LINK -o libldkcsharp_release$LDK_TARGET_SUFFIX.so -O3 bindings.o $LDK_LIB -lm
		[ "$IS_APPLE_CLANG" != "true" ] && llvm-strip libldkcsharp_release$LDK_TARGET_SUFFIX.so

		if [ "$LDK_JAR_TARGET" = "true" ]; then
			# Copy resulting native binary for inclusion in release nuget zip
			mkdir -p c_sharp/packaging_artifacts/lib/net6.0/
			cp c_sharp/bin/Release/net6.0/csharpldk.dll c_sharp/packaging_artifacts/lib/net6.0/

			mkdir -p c_sharp/packaging_artifacts/runtimes/"$CS_PLATFORM_NAME"/native/
			if [ "$IS_WIN" = "true" ]; then
				cp libldkcsharp_release$LDK_TARGET_SUFFIX.so c_sharp/packaging_artifacts/runtimes/"$CS_PLATFORM_NAME"/native/ldkcsharp.dll
			elif [ "$IS_MAC" = "true" ]; then
				cp libldkcsharp_release$LDK_TARGET_SUFFIX.so c_sharp/packaging_artifacts/runtimes/"$CS_PLATFORM_NAME"/native/libldkcsharp.dylib
			else
				cp libldkcsharp_release$LDK_TARGET_SUFFIX.so c_sharp/packaging_artifacts/runtimes/"$CS_PLATFORM_NAME"/native/libldkcsharp.so
			fi
		fi
	fi
elif [ "$2" = "python" ]; then
	echo "Creating Python bindings..."
	mkdir -p python/src/{enums,structs,impl}
	rm -f python/src/{enums,structs,impl}/*.py
	./genbindings.py "./lightning.h" python/src/impl python/src python/ $DEBUG_ARG python $4 $TARGET_STRING
	rm -f python/bindings.c
	if [ "$3" = "true" ]; then
		echo "#define LDK_DEBUG_BUILD" > python/bindings.c
	elif [ "$3" = "leaks" ]; then
		# For leak checking we use release libldk which doesn't expose
		# __unmangle_inner_ptr, but the C code expects to be able to call it.
		echo "#define __unmangle_inner_ptr(a) (a)" > python/bindings.c
	fi
	echo "#define LDKCVec_C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZZ LDKCVec_TransactionOutputsZ" >> python/bindings.c
	echo "#define CVec_C2Tuple_ThirtyTwoBytesCVec_C2Tuple_u32TxOutZZZZ_free CVec_TransactionOutputsZ_free" >> python/bindings.c
	cat python/bindings.c.body >> python/bindings.c

	IS_MAC=false
	[ "$($CC --version | grep apple-darwin)" != "" ] && IS_MAC=true
	IS_APPLE_CLANG=false
	[ "$($CC --version | grep "Apple clang version")" != "" ] && IS_APPLE_CLANG=true

	echo "Building Python bindings..."
	COMPILE="$COMMON_COMPILE -Isrc/main/jni -pthread -fPIC"
	LINK="-ldl -shared"
	[ "$IS_MAC" = "false" ] && LINK="$LINK -Wl,--no-undefined"
	[ "$IS_MAC" = "true" ] && COMPILE="$COMPILE -mmacosx-version-min=10.9"
	[ "$IS_MAC" = "true" -a "$IS_APPLE_CLANG" = "false" ] && LINK="$LINK -fuse-ld=lld"
	[ "$IS_MAC" = "true" -a "$IS_APPLE_CLANG" = "false" ] && echo "WARNING: Need at least upstream clang 13!"
	[ "$IS_MAC" = "false" -a "$3" != "false" ] && LINK="$LINK -Wl,-wrap,calloc -Wl,-wrap,realloc -Wl,-wrap,malloc -Wl,-wrap,free"

	exit 0 # Sadly compilation doesn't currently work
	if [ "$3" = "true" ]; then
		$COMPILE $LINK -o liblightningpython_debug$LDK_TARGET_SUFFIX.so -g -fsanitize=address -shared-libasan -rdynamic -I"$1"/lightning-c-bindings/include/ $2 c_sharp/bindings.c "$1"/lightning-c-bindings/target/$LDK_TARGET/debug/libldk.a -lm
	else
		$COMPILE -o bindings.o -c -flto -O3 -I"$1"/lightning-c-bindings/include/ $2 c_sharp/bindings.c
		$COMPILE $LINK -o liblightningpython_release$LDK_TARGET_SUFFIX.so -Wl,--version-script=python/libcode.version -flto -O3 -Wl,--lto-O3 -Wl,-O3 -I"$1"/lightning-c-bindings/include/ $2 bindings.o "$1"/lightning-c-bindings/target/$LDK_TARGET/release/libldk.a -lm
		[ "$IS_APPLE_CLANG" != "true" ] && llvm-strip liblightningpython_release$LDK_TARGET_SUFFIX.so
	fi
elif [ "$2" = "wasm" ]; then
	echo "Creating TS bindings..."
	mkdir -p ts/{enums,structs}
	rm -f ts/{enums,structs,}/*.{mjs,mts,mts.part}
	if [ "$4" = "false" ]; then
		./genbindings.py "./lightning.h" ts ts ts $DEBUG_ARG typescript node wasm
	else
		./genbindings.py "./lightning.h" ts ts ts $DEBUG_ARG typescript browser wasm
	fi
	rm -f ts/bindings.c
	sed -i 's/^  "version": .*/  "version": "'${LDK_GARBAGECOLLECTED_GIT_OVERRIDE:1:100}'",/g' ts/package.json
	sed -i 's/^  "version": .*/  "version": "'${LDK_GARBAGECOLLECTED_GIT_OVERRIDE:1:100}'",/g' node-net/package.json
	sed -i 's/^    "lightningdevkit": .*/    "lightningdevkit": "'${LDK_GARBAGECOLLECTED_GIT_OVERRIDE:1:100}'"/g' node-net/package.json
	if [ "$3" = "true" ]; then
		echo "#define LDK_DEBUG_BUILD" > ts/bindings.c
	elif [ "$3" = "leaks" ]; then
		# For leak checking we use release libldk which doesn't expose
		# __unmangle_inner_ptr, but the C code expects to be able to call it.
		echo "#define __unmangle_inner_ptr(a) (a)" > ts/bindings.c
	fi
	cat header.c >> ts/bindings.c
	cat ts/bindings.c.body >> ts/bindings.c

	echo "Building TS bindings..."
	COMPILE="$COMMON_COMPILE -flto -Wl,--no-entry -nostdlib --target=wasm32-wasi -Wl,-z -Wl,stack-size=$((8*1024*1024)) -Wl,--initial-memory=$((16*1024*1024)) -Wl,--max-memory=$((1024*1024*1024)) -Wl,--global-base=4096"
	# We only need malloc and assert/abort, but for now just use WASI for those:
	EXTRA_LINK=/usr/lib/wasm32-wasi/libc.a
	[ "$3" != "false" ] && COMPILE="$COMPILE -Wl,-wrap,calloc -Wl,-wrap,realloc -Wl,-wrap,reallocarray -Wl,-wrap,malloc -Wl,-wrap,aligned_alloc -Wl,-wrap,free"
	if [ "$3" = "true" ]; then
		WASM_FILE=liblightningjs_debug.wasm
		$COMPILE -o liblightningjs_debug.wasm -g -O1 -I"$1"/lightning-c-bindings/include/ ts/bindings.c "$1"/lightning-c-bindings/target/wasm32-wasi/debug/libldk.a $EXTRA_LINK
	else
		WASM_FILE=liblightningjs_release.wasm
		$COMPILE -o liblightningjs_release.wasm -s -Oz -I"$1"/lightning-c-bindings/include/ ts/bindings.c "$1"/lightning-c-bindings/target/wasm32-wasi/release/libldk.a $EXTRA_LINK
	fi

	if [ -x "$(which tsc)" ]; then
		cd ts
		for F in structs/*; do
			cat imports.mts.part | grep -v " $(basename -s .mts $F)[ ,]" | cat - $F > $F.tmp
			mv $F.tmp $F
		done
		rm imports.mts.part
		tsc --types node --typeRoots .
		cp ../$WASM_FILE liblightningjs.wasm
		cp ../README.md README.md
		cd ../node-net
		tsc --types node --typeRoots .
		echo Ready to publish!
		if [ -x "$(which node)" ]; then
			NODE_V="$(node --version)"
			if [ "${NODE_V:1:2}" -gt 14 ]; then
				cd ../ts
				node --stack_trace_limit=200 --trace-uncaught test/node.mjs
				cd ../node-net
				node --stack_trace_limit=200 --trace-uncaught test/test.mjs
			fi
		fi
	fi
else
	if is_gnu_sed; then
		sed -i "s/^    <version>.*<\/version>/    <version>${LDK_GARBAGECOLLECTED_GIT_OVERRIDE:1:100}<\/version>/g" pom.xml
	else
	  # OSX sed is for some reason not compatible with GNU sed
		sed -i '' "s/^    <version>.*<\/version>/    <version>${LDK_GARBAGECOLLECTED_GIT_OVERRIDE:1:100}<\/version>/g" pom.xml
	fi

	echo "Creating Java bindings..."
	mkdir -p src/main/java/org/ldk/{enums,structs}
	rm -f src/main/java/org/ldk/{enums,structs}/*.java
	rm -f src/main/jni/*.h
	if [ "$4" = "true" ]; then
		./genbindings.py "./lightning.h" src/main/java/org/ldk/impl src/main/java/org/ldk src/main/jni/ $DEBUG_ARG android $4 $TARGET_STRING
	else
		./genbindings.py "./lightning.h" src/main/java/org/ldk/impl src/main/java/org/ldk src/main/jni/ $DEBUG_ARG java $4 $TARGET_STRING
	fi
	rm -f src/main/jni/bindings.c
	if [ "$3" = "true" ]; then
		echo "#define LDK_DEBUG_BUILD" > src/main/jni/bindings.c
	elif [ "$3" = "leaks" ]; then
		# For leak checking we use release libldk which doesn't expose
		# __unmangle_inner_ptr, but the C code expects to be able to call it.
		echo "#define __unmangle_inner_ptr(a) (a)" > src/main/jni/bindings.c
	fi
	cat header.c >> src/main/jni/bindings.c
	cat header.c >> src/main/jni/bindings.c
	cat src/main/jni/bindings.c.body >> src/main/jni/bindings.c
	javac -h src/main/jni src/main/java/org/ldk/enums/*.java src/main/java/org/ldk/impl/*.java
	rm src/main/java/org/ldk/enums/*.class src/main/java/org/ldk/impl/bindings*.class

	echo "Building Java bindings..."
	COMPILE="$COMMON_COMPILE -Isrc/main/jni -pthread -fPIC"
	LINK="-shared"
	[ "$IS_WIN" = "false" ] && LINK="$LINK -ldl"
	[ "$IS_MAC" = "false" ] && LINK="$LINK -Wl,--no-undefined"
	[ "$IS_MAC" = "true" ] && COMPILE="$COMPILE -mmacosx-version-min=10.9"
	[ "$IS_MAC" = "true" -a "$IS_APPLE_CLANG" = "false" ] && LINK="$LINK -fuse-ld=lld"
	[ "$IS_MAC" = "true" -a "$IS_APPLE_CLANG" = "false" ] && echo "WARNING: Need at least upstream clang 13!"
	[ "$IS_MAC" = "false" -a "$3" != "false" ] && LINK="$LINK -Wl,-wrap,calloc -Wl,-wrap,realloc -Wl,-wrap,malloc -Wl,-wrap,free"
	if [ "$3" = "true" ]; then
		$COMPILE $LINK -o liblightningjni_debug$LDK_TARGET_SUFFIX.so -g -fsanitize=address -shared-libasan -rdynamic -I"$1"/lightning-c-bindings/include/ $2 src/main/jni/bindings.c "$1"/lightning-c-bindings/target/$LDK_TARGET/debug/libldk.a -lm
	else
		[ "$IS_APPLE_CLANG" = "false" ] && LINK="$LINK -flto -Wl,-O3 -fuse-ld=lld"
		[ "$IS_APPLE_CLANG" = "false" ] && COMPILE="$COMPILE -flto"
		[ "$IS_MAC" = "false" ] && LINK="$LINK -Wl,--no-undefined"
		[ "$IS_WIN" = "false" ] && LINK="$LINK -Wl,--lto-O3"
		[ "$IS_WIN" = "true" ] && LINK="$LINK -L/usr/lib/gcc/x86_64-w64-mingw32/12-win32/ -lbcrypt"
		LDK_LIB="$1"/lightning-c-bindings/target/$LDK_TARGET/release/libldk.a
		if [ "$IS_MAC" = "false" -a "$IS_WIN" = "false" -a "$4" = "false" ]; then
			LINK="$LINK -Wl,--version-script=libcode.version"
		fi

		$COMPILE -o bindings.o -c -O3 -I"$1"/lightning-c-bindings/include/ $2 src/main/jni/bindings.c
		$COMPILE $LINK -o liblightningjni_release$LDK_TARGET_SUFFIX.so -O3 $2 bindings.o $LDK_LIB -lm
		[ "$IS_APPLE_CLANG" != "true" ] && llvm-strip liblightningjni_release$LDK_TARGET_SUFFIX.so

		if [ "$IS_MAC" = "false" -a "$4" = "false" ]; then
			GLIBC_SYMBS="$(objdump -T liblightningjni_release$LDK_TARGET_SUFFIX.so | grep GLIBC_ | grep -v "GLIBC_2\.\(2\|3\)\(\.\|)\)" | grep -v "GLIBC_2.\(3\.4\|14\|17\|18\|25\|28\|29\|32\|33\|34\|\))" || echo)"
			if [ "$GLIBC_SYMBS" != "" ]; then
				echo "Unexpected glibc version dependency! Some users need glibc 2.35 support, symbols for newer glibcs cannot be included."
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
fi
