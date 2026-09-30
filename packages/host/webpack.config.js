const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const deps = require('./package.json').dependencies;

const shared = {
  react: {
    singleton: true,
    requiredVersion: deps.react,
    eager: true,
  },
  'react-dom': {
    singleton: true,
    requiredVersion: deps['react-dom'],
    eager: true,
  },
  'react/jsx-runtime': {
    singleton: true,
    requiredVersion: deps.react,
    eager: true,
  },
  'react/jsx-dev-runtime': {
    singleton: true,
    requiredVersion: deps.react,
    eager: true,
  },
};

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: 'auto',
    clean: true,
    crossOriginLoading: 'anonymous',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      // remotes 改为运行时动态加载，见 src/remotes.js + src/loadRemote.jsx
      remotes: {},
      shared,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      chunks: ['main'],
    }),
  ],
  devServer: {
    port: 5680,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
