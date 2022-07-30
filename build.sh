#!/bin/bash

set -ex

RED='\033[1;31m'    # 红
GREEN='\033[1;32m'  # 绿
YELLOW='\033[1;33m' # 黄
BLUE='\033[1;34m'   # 蓝
PINK='\033[1;35m'   # 粉红
RES='\033[0m'       # 清除颜色

BUILD_DIR='drum-nodejs-dist'

# 遍历文件夹并cp文件
list_alldir () {
  for file2 in `ls -a $1`
  do
  if [ x"$file2" != x"." -a x"$file2" != x".." -a x"$file2" != x"node_modules" ]; then
    if [ -d "$1/$file2" ]; then
      list_alldir "$1/$file2" $2
    elif [ x"$file2" = x"$2" ]; then
      echo "Copy $1/$file2"
      mkdir -p $BUILD_DIR/$1
      cp -rf $1/$file2 $BUILD_DIR/$1/$file2
    fi
  fi
  done
}

# 测试环境 sh ./build.sh dev
# 正式环境 sh ./build.sh prod
echo "${GREEN}RUN build-dev.sh... [env=$1,skip=$2]${RES}"

# 打包
if [[ $1 == 'dev' ]]; then

  yarn build

elif [[ $1 == 'prod' ]]; then

  yarn build:prod

else

  echo "${RED}Error: Set up [env].${RES}"

  exit 1

fi

# 整理文件
rm -rf $BUILD_DIR

mkdir -p $BUILD_DIR/config/client

for dir in '.next' 'public' 'next-i18next.config.js' 'next.config.js' 'package.json' 'yarn.lock' 'config/index.js' 'config/client/common.js' "config/client/${1}.js"; do
  echo "Copy ${dir}"
  cp -rf $dir $BUILD_DIR/$dir
done

list_alldir fe-common package.json

if [[ $2 != 'install' ]]; then
  # 安装环境依赖
  cd $BUILD_DIR

  yarn install --production --ignore-scripts

  cd ../
fi

# over
echo "${GREEN}END build-dev.sh${RES}"
