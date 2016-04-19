import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import cssnext from 'postcss-cssnext';
import postcssImport from 'postcss-import';
import buildConfig from './config';

module.exports = {
  devtool: 'eval',
  entry: [
    './src/js/app/index',
    'webpack-dev-server/client?http://localhost:3010',
    'webpack/hot/only-dev-server',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'app.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('app.css'),
  ],
  module: {
    loaders: [
      {
        test: /^((?!\.local).)*\.css$/,
        loader: buildConfig.css.extract
         ? ExtractTextPlugin.extract(
           'style-loader',
           'css-loader!postcss-loader')
         : 'style-loader!css-loader!postcss-loader',
      },
      {
        test: /\.local.css$/,
        loader: buildConfig.css.extract
         ? ExtractTextPlugin.extract(
           'style-loader',
           'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
         : 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel'], // 'babel-loader' is also a legal name to reference
      },
      { test: /\.(woff|woff2)/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=fonts/[name].[ext]' },
      { test: /\.(png|jpg)$/, loader: 'file-loader?name=images/[name]_[hash].[ext]' },
    ],
  },
  postcss: () => [
    postcssImport({
      addDependencyTo: webpack,
    }),
    cssnext,
  ],
};
