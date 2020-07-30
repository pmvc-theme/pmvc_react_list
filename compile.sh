#!/bin/sh
find ./assets -name "*.js" | xargs rm -rf

production(){
    echo "Production Mode";
    NODE_ENV=production webpack -p 
    NODE_ENV=production webpack -p --config webpack.node.js
}

develop(){
    echo "Develop Mode";
    npm run build
    #PHP_CONFIG=$phpc webpack
    #webpack --config webpack.node.js
}

build(){
    rm -rf build
    BABEL_ENV=test babel ui -d build/cjs/ui
    BABEL_ENV=test babel src -d build/cjs/src
    mv build/cjs/src/rv.js ./
    mv build/cjs/src/fixedDataTable.js ./
    BABEL_ENV=build babel ui -d build/es/ui
    BABEL_ENV=build babel src -d build/es/src
}

killBy(){
    ps auxwwww | grep $1 | grep -v grep | awk '{print $2}' | xargs -I{} kill -9 {}
}

stop(){
    DIR="$( cd "$(dirname "$0")" ; pwd -P )"
    killBy ${DIR}/node_modules/.bin/babel 
}

watch(){
    stop 
    npm run build:cjs:ui -- --watch &
    npm run build:cjs:src -- --watch &
    npm run build:es:ui -- --watch &
    npm run build:es:src -- --watch &
}

case "$1" in
  watch)
    watch 
    ;;
  stop)
    stop 
    ;;
  build)
    build 
    ;;
  p)
    production
    ;;
  *)
    develop
    exit
esac

exit $?
