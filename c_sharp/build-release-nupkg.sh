#/bin/sh
set -e
set -x

# zips are not generally deterministic without some tweaking, which we do here.

echo "Checking that required release native libraries are present..."
ls packaging_artifacts/runtimes/win-x64/native/ldkcsharp.dll
ls packaging_artifacts/runtimes/linux-x64/native/libldkcsharp.so
ls packaging_artifacts/lib/net3.0/csharpldk.dll

cd packaging_artifacts
find . | xargs -L1 touch -d "2021-01-01 00:00 UTC" 
zip -Xvu ../org.ldk.nupkg * */* */*/* */*/*/* */*/*/*/*
