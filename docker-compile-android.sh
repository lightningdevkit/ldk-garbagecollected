PROJECT_DIRECTORY=`pwd`
RL_DIRECTORY=$1
docker run -v $PROJECT_DIRECTORY:/app/shared -v $RL_DIRECTORY:/app/rl --rm -t android-clang /app/shared/docker/compile-android-bindings.sh
