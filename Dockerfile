# 1. Base OS Image
FROM ubuntu:20.10

RUN apt-get -y update
RUN apt-get install -y bash curl git make unzip build-essential

RUN mkdir -p /app/shared

# Download/copy and extract the NDK
RUN curl -O https://dl.google.com/android/repository/android-ndk-r22-linux-x86_64.zip && unzip android-ndk-r22-linux-x86_64.zip -d /app && rm -rf android-ndk-r22-linux-x86_64.zip && mv /app/android-ndk-r22 /app/ndk
# RUN unzip android-ndk-r22-linux-x86_64.zip -d /app && rm -rf android-ndk-r22-linux-x86_64.zip && mv /app/android-ndk-r22 /app/ndk
# COPY ./docker/android-ndk-r22-linux-x86_64.zip /app/android-ndk-r22-linux-x86_64.zip
# RUN unzip /app/android-ndk-r22-linux-x86_64.zip -d /app && mv /app/android-ndk-r22 /app/ndk

ENV NDK="/app/ndk"
ENV TOOLCHAIN="${NDK}/toolchains/llvm/prebuilt/linux-x86_64"
ENV SYSROOT="${TOOLCHAIN}/sysroot"

# install rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${TOOLCHAIN}/bin:${PATH}"
RUN rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android
COPY ./docker/cargo-config.toml /root/.cargo/config

ENV SHELL=/bin/bash
