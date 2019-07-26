const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: __dirname + '/src/index.tsx',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'app.bundle.js'
  },
  devServer: {
    contentBase: './dist',
    overlay: true
  },
  resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
              "@Components": __dirname + "/src/components/",
              "@Styles": __dirname +  "/src/assets/styles/",
              "@Utils": __dirname +  "/src/utils/",
              "@Image":  __dirname + "/src/assets/img/",
              "@Reducer": __dirname +  "/src/reducers/",
              "@Action": __dirname +  "/src/actions/",
              "@Context":  __dirname + "/src/context/",
              "@Model":  __dirname + "/src/model/"
            }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        enforce: "pre"
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