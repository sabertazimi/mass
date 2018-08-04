const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    mass: './src/mass.scss',
  },
  output: {
    filename: devMode ? '[name].js' : '[name].min.js',
    path: path.resolve(__dirname, 'lib'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('lib'),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].min.css',
      chunkFilename: devMode ? '[id].css' : '[id].min.css',
    }),
    new StyleLintPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
};
