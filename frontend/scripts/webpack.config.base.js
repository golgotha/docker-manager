const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = options => ({
  context: __dirname,
  mode: options.mode,

  entry: {
    ...options.entry,
    main: [
      ...options.entry.main,
      path.resolve(__dirname, '../src/index.js')
    ],
  },

  output: Object.assign(
    {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].[hash].js',
      chunkFilename: '[id].[chunkhash].js',
      sourcePrefix: '  '
    },
    options.output
  ),

  optimization: Object.assign(
    {
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /\.js?$/,
            chunks: 'all',
            minChunks: 2,
            enforce: true
          }
        }
      }
    },
    options.minimizer
  ),

  devtool: options.devtool,

  devServer: options.devServer,

  module: {
    rules: options.module.rules.concat([
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory=true']
      },

      {
        test: /\.(scss|css)$/,
        use: [
          /*{
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: './'
            }
          },*/
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }

        ]
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: ['file-loader?name=images/[name].[hash:15].[ext]']
      },

      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        include: [/fonts/],
        use: ['file-loader?name=fonts/[name].[hash:15].[ext]&publicPath=./']
      }
    ])
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles-bundle.[contenthash].css'
    }),

    new AssetsPlugin({
      path: path.resolve(__dirname, '../dist'),
      filename: 'assets.json',
      prettyPrint: true
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'index.html',
      chunks: ['main'],
      template: path.resolve(__dirname, '../src/index.html')
    }),

    /*new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'login.html',
      chunks: ['login'],
      template: path.resolve(__dirname, '../src/login.html')
    }),*/
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 8888,
    //   reportFilename: 'report.html',
    //   openAnalyzer: true,
    //   generateStatsFile: true,
    //   statsFilename: 'stats.json'
    // }),
  ].concat(options.plugins)
});
