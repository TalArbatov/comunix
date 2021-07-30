const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const publicPath = path.join(__dirname, 'public');
const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html'
});

module.exports = {
  entry: './src',
  output: {
    filename: 'bundle.js',
    path: publicPath
  },
  mode: 'development',
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true,
  },
  plugins: [
    htmlPlugin
  ]
}
