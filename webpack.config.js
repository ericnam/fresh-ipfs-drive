const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'app.bundle.js'
  },
  devServer: {
    contentBase: './dist',
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use:['style-loader','css-loader', 'sass-loader']
        // use: [
        //     // fallback to style-loader in development
        //     process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
        //     "css-loader",
        //     "sass-loader"
        // ]
      }
    ]
  },
  plugins: [
    new ErrorOverlayPlugin(),
    new HtmlWebpackPlugin({
      title: "IPFS Drive",
      template: __dirname + '/index.html'
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', 
      DEBUG: false
    }),
    new MiniCssExtractPlugin({
      filename: "app.css",
      chunkFilename: "app.css"
  })
  ]
};