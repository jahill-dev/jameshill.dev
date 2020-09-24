const glob = require('glob');
const path = require('path');
const fs = require('fs');
const ExtractCssPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/* -----------------------------------
 *
 * SASS
 *
 * -------------------------------- */

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      fiber: false,
      data: '@import "template";',
      outputStyle: 'compressed',
      sourceMap: false,
      includePaths: ['./src/styles'],
    },
  },
};

/* -----------------------------------
 *
 * Config
 *
 * -------------------------------- */

module.exports = {
  mode: 'development',
  entry: glob.sync(__dirname + '/src/**/*.11ty.ts*').reduce(getEntryFile, {}),
  context: path.join(__dirname, '/src/'),
  cache: true,
  target: 'node',
  externals: fs.readdirSync('node_modules'),
  output: {
    path: path.join(__dirname, '/src/_js'),
    filename: '[name].js',
    library: 'Page',
    libraryExport: 'Page',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.scss'],
    alias: {
      '@': path.resolve(__dirname, `./src/`),
    },
  },
  plugins: [
    new ExtractCssPlugin({
      filename: 'assets/[name].css',
    }),
    new CopyPlugin({
      patterns: [{ from: 'articles', to: 'articles' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          ExtractCssPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: 'global',
              importLoaders: 2,
              sourceMap: false,
            },
          },
          sassLoader,
        ],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          ExtractCssPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:6]',
              },
              importLoaders: 2,
              sourceMap: false,
            },
          },
          sassLoader,
        ],
      },
    ],
  },
};

/* -----------------------------------
 *
 * Entry
 *
 * -------------------------------- */

function getEntryFile(result, file) {
  const [name] = file.split('src/').slice(-1);

  result[name.replace('.tsx', '')] = file;

  return result;
}