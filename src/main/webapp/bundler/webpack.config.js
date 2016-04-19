import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import cssnext from 'postcss-cssnext';
import postcssImport from 'postcss-import';
import buildConfig from './config';

module.exports = {
  entry: [
    './src/js/app/index',
  ],
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: 'app.js',
    publicPath: 'dist/',
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        // exclude: /(node_modules|bower_components)/,
        loaders: ['babel'], // 'babel-loader' is also a legal name to reference
      },
      {
        test: /^((?!\.local).)*\.css$/,
        // exclude: /(node_modules|bower_components)/,
        loader: buildConfig.css.extract
         ? ExtractTextPlugin.extract(
           'style-loader',
           'css-loader!postcss-loader')
         : 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.local.css$/,
        // exclude: /(node_modules|bower_components)/,
        loader: buildConfig.css.extract
         ? ExtractTextPlugin.extract(
           'style-loader',
           'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
         : 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
      },
      { test: /\.(woff|woff2)/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=fonts/[name].[ext]' },
      { test: /\.(png|jpg)$/, loader: 'file-loader?name=images/[name]_[hash].[ext]' },
    ],
  },
  postcss: () => [
    postcssImport,
    cssnext,
  ],
};
