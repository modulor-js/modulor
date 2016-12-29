var webpack = require('webpack');
var path = require('path');

var CLIENT_DIR = path.join(__dirname, 'src');
var OUTPUT_DIR = path.join(__dirname, 'build');

module.exports = {
  context: CLIENT_DIR,
  entry: {
    'router': './router.js'
  },
  output: {
    path: OUTPUT_DIR,
    filename: '[name].js'
  },
  resolve: {
    modulesDirectories: ["node_modules", CLIENT_DIR],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /(src)/,
        loader: 'babel',
      },
    ]
  },
  plugins: [],
};

