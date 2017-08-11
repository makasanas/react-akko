const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
        {
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015', 'stage-1']
          }
        },
        // [{
        //     test: /\.scss$/,
        //     loader: ExtractTextPlugin.extract("style-loader", "css!sass")
        // }]
        {
          test: /\.scss$/,
          loader: "style-loader!css-loader!sass-loader"
          // loader : ExtractTextPlugin.extract('style', 'css!sass'),
        }, {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
    ],
  },  
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
