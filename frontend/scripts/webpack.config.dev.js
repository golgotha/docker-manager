const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');

module.exports = require('./webpack.config.base')({
  mode: 'development',

  entry: {
    main: []
  },

  output: {
    publicPath: './',
    filename: '[name].js?[hash]',
  },

  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true
    }),

    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    rules: [

    ]
  },

  // optimization: {
  //   noEmitOnErrors: true
  // },

  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../dist'),
    hot: true,
    watchOptions: {
      aggregateTimeout: 100
    },
    port: 8080,
    http2: false,
    proxy: {
      '/v1': {
        target: process.env.PROXY_TARGET || 'http://localhost:9000',
        secure: false,
        changeOrigin: false
        // logLevel: 'debug'
      }
    },
    // What and how information should be printed to the console
    stats: {
      assets: true,
      colors: true,
      cached: isVerbose,
      cachedAssets: isVerbose,
      chunks: isVerbose,
      chunkModules: isVerbose,
      errors: true,
      errorDetails: true,
      hash: true,
      timings: true,
      modules: isVerbose,
      reasons: true,
      version: true,
      warnings: false
    }
  }
})
