/**
 * Created Date: Friday, November 3rd 2017, 10:04:08 pm
 * Author: yugasun
 * Email: yuga.sun.bj@gmail.com
 * -----
 * Copyright (c) 2017 yugasun
 */
var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: { 'vue-axios-plugin': resolve('src/index.js') },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'vue-axios-plugin'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      }
    ]
  }
}
