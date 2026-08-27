// ============================================
// Module Federation 远程应用 A（Vue）Webpack 配置
// 暴露 ./Widget 供 Host 消费
// ============================================
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
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
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
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
      name: 'remoteA',
      filename: 'remoteEntry.js',
      // 暴露的模块：框架无关的挂载函数入口
      exposes: {
        './Widget': './src/exposes/Widget.js'
      },
      shared: {
        vue: { singleton: true, requiredVersion: false }
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Remote A（Vue）'
    })
  ],
  devServer: {
    // 注意：本机 9001/9002 被安全软件占用，改用 9011
    port: 9011,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
};
