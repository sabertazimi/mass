const path = require('path');

const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin').default;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (devMode, includeHtml) => ({
  optimization: {
    minimizer: [
      !devMode && new TerserJSPlugin(),
      !devMode && new CssMinimizerPlugin(),
    ].filter(Boolean),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: !devMode,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    includeHtml &&
      new HtmlWebpackPlugin({
        hash: true,
        template: './examples/index.html',
        filename: './index.html',
      }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new StyleLintPlugin({
      exclude: ['node_modules', 'build', 'lib'],
    }),
    new ESLintPlugin({ extensions: ['js', 'jsx'] }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      mass: path.resolve(__dirname, 'src'),
    },
  },
  devtool: devMode ? 'eval-cheap-module-source-map' : false,
});
