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

case "$1" in
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
