import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { open as openurl } from 'openurl';
import config from './webpack.dev.config';

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: './',
}).listen(3010, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3010');

  openurl('http://localhost:3010');
});
