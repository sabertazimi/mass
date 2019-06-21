const path = require('path');
const getBaseConfig = require('./webpack.base.config');

const devMode = process.env.NODE_ENV !== 'production';
const baseConfig = getBaseConfig(devMode, true);

module.exports = {
  entry: {
    index: './examples/index.js',
  },
  output: {
    filename: devMode ? '[name].js' : '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build'),
  },
  ...baseConfig,
};
