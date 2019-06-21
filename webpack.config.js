const path = require('path');
const getBaseConfig = require('./webpack.base.config');

const devMode = process.env.NODE_ENV !== 'production';
const baseConfig = getBaseConfig(devMode, false);

module.exports = {
  entry: {
    mass: './src/mass.scss',
  },
  output: {
    filename: devMode ? '[name].js' : '[name].min.js',
    path: path.resolve(__dirname, 'lib'),
  },
  ...baseConfig,
};
