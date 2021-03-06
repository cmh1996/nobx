'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const resolve = dir => path.join(__dirname, '.', dir)

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    nobx: './src/index.js',
    test: './src/example/test.js'
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'nobx',
    libraryExport: 'default',
    globalObject: 'this'
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  plugins: isProd
    ? [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings: false
          },
          mangle: true
        },
        sourceMap: true
      }),
      new HtmlWebpackPlugin({
          template: __dirname + '/src/example/test.html'
      }),
    ]
    : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
            template: __dirname + '/src/example/test.html'
        })
    ]
}