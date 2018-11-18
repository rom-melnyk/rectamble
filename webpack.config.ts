import * as path from 'path';
import * as webpack from 'webpack';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
const MinifyPlugin = require('babel-minify-webpack-plugin');

const outputDir = path.resolve(__dirname, 'server/static');

const baseConfig: webpack.Configuration = {
  entry: [
    './client/index.ts',
    './client/styles/style.scss'
  ],
  output: {
    path: outputDir,
    filename: 'script.js'
  },
  resolve: {
    // ".js" must be here for SCSS loader to work
    extensions: [ '.ts', '.js', '.scss' ]
  },
};

const tsBaseRule: webpack.Rule = { test: /\.ts$/, loader: 'ts-loader' };

const styleLoader: webpack.Loader = { loader: 'style-loader' };
const cssLoader: webpack.Loader = { loader: 'css-loader' };
const cssProdLoader = Object.assign({}, cssLoader, { options: { minimize: true } });
const sassLoader: webpack.Loader = { loader: 'sass-loader' };

const scssDevRule: webpack.Rule = {
  test: /\.scss$/,
  use: [ styleLoader, cssLoader, sassLoader, ],
};
const scssProdRule: webpack.Rule = {
  test: /\.scss$/,
  use: [ styleLoader, cssProdLoader, sassLoader, ],
};

const copyPlugin = new CopyWebpackPlugin([
  './client/index.html'
]);

const minifyPlugin = new MinifyPlugin();

const devConfig: webpack.Configuration = Object.assign({}, baseConfig, {
  name: 'dev',
  mode: 'development',
  module: {
    rules: [ tsBaseRule, scssDevRule, ]
  },
  plugins: [ copyPlugin, ],
  watch: true,
});

const prodConfig: webpack.Configuration = Object.assign({}, baseConfig, {
  name: 'prod',
  mode: 'production',
  module: {
    rules: [ tsBaseRule, scssProdRule, ]
  },
  plugins: [ copyPlugin, minifyPlugin, ]
});

export default [ devConfig, prodConfig ];
