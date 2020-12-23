const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = require('./webpack.config.base')({
  mode: 'production',

  entry: {
    main: []
  },

  output: {
    publicPath: './',
    filename: '[name].[hash].js',
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
            drop_console: false,
            global_defs: {
              __REACT_HOT_LOADER__: undefined // eslint-disable-line no-undefined
            }
          }
        },
        sourceMap: true // set to true if you want JS source maps
      })
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),

    new webpack.optimize.AggressiveMergingPlugin(),
    function () {
      this.hooks.done.tap('Check errors', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length) {
          console.log(stats.compilation.errors);
          process.exit(1);
        }
      });
    }
  ],

  module: {
    rules: [

    ]
  }
});
