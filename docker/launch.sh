PROJECT_DIRECTORY=`pwd`
RL_DIRECTORY=$1
docker run -i -v $PROJECT_DIRECTORY:/app/shared -v $RL_DIRECTORY:/app/rl -t android-clang /bin/bash
