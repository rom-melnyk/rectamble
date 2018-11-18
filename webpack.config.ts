import * as path from 'path';
import * as webpack from 'webpack';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';

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
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      }
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
