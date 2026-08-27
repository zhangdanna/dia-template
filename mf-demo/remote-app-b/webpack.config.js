// ============================================
// Module Federation 远程应用 B（React）Webpack 配置
// 暴露 ./Counter 组件与 ./utils 工具函数
// ============================================
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    publicPath: 'auto',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteB',
      filename: 'remoteEntry.js',
      // 暴露的模块
      exposes: {
        './Counter': './src/components/Counter',
        './utils': './src/utils/helpers'
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Remote B（React）'
    })
  ],
  devServer: {
    port: 9012,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
};
