const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new ExtendedDefinePlugin({
      __FONT_AWESOME__: 'local',
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new CopyWebpackPlugin([
      {
        from: 'public',
      },
    ]),
  ],
});
