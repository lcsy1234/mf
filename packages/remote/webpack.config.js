const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const deps = require('./package.json').dependencies;

const shared = {
  react: {
    singleton: true,
    requiredVersion: deps.react,
  },
  'react-dom': {
    singleton: true,
    requiredVersion: deps['react-dom'],
  },
  'react/jsx-runtime': {
    singleton: true,
    requiredVersion: deps.react,
  },
  'react/jsx-dev-runtime': {
    singleton: true,
    requiredVersion: deps.react,
  },
  // 与 Host 共用 Router，嵌入 /remote-a/* 时用相对路由切换页面
  'react-router-dom': {
    singleton: true,
    requiredVersion: deps['react-router-dom'],
  },
  'react-router': {
    singleton: true,
  },
};

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    // 固定 publicPath，避免 Host 加载远程 chunk 时解析错域名
    publicPath: 'http://localhost:3001/',
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
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/Widget.jsx',
        // Host 顶栏菜单由 Remote 贡献（Remote A 子菜单：任务记录 / 模版）
        './hostMenus': './src/hostMenus.js',
      },
      shared,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      chunks: ['main'],
    }),
  ],
  devServer: {
    port: 3001,
    historyApiFallback: true,
    // 禁止把 WDS client 注入 remoteEntry，否则 Host 加载后会弹出跨域 Script error overlay
    hot: false,
    liveReload: false,
    client: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
