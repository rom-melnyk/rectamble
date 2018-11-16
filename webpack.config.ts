import * as path from 'path';
import * as webpack from 'webpack';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';

const outputDir = path.resolve(__dirname, 'server/static');

const baseConfig: webpack.Configuration = {
  entry: './client/index.ts',
  output: {
    path: outputDir,
    filename: 'script.js'
  },
  resolve: {
    extensions: [ '.ts' ]
  },
  module: {
    rules: [
      { test: /\.ts/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      './client/index.html'
    ])
  ]
};

const devConfig: webpack.Configuration = Object.assign({}, baseConfig, {
  name: 'dev',
  mode: 'development',
  watch: true,
});

const prodConfig: webpack.Configuration = Object.assign({}, baseConfig, {
  name: 'prod',
  mode: 'production',
});

export default [ devConfig, prodConfig ];
