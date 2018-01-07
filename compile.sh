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
    BABEL_ENV=build babel ui -d build/ui
    BABEL_ENV=build babel src -d build/src
    mv build/src/rv.js ./
    mv build/src/fixedDataTable.js ./
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
