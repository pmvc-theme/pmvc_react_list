'use strict';
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
//	devtool: 'sourcemap',
	entry: {
           main: "./src/entry.js",
        },
	output: {
		filename: "node.bundle.js",
		path: __dirname + "/assets" ,
		publicPath: "/react/assets/",
	},
        node: {
          fs: "empty",
        },
        resolve: {
            extensions: ['','.js','.jsx'],
            alias: {
                "react": __dirname + '/node_modules/react'
            }
        },
	module: {
	    loaders: [
                  { 
                    test: /(.js|.jsx)$/, 
                    exclude: /node_modules/,
                    loader: "babel-loader", 
                    query:{
                        cacheDirectory:true, 
                    } 
                  },
                  { test: /\.(otf|eot|svg|ttf|woff)/, loader: 'url-loader?limit=8192' }
	    ]
	},
	plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.LimitChunkCountPlugin({maxChunks:1}),
	]
};
