// ============================================
// Module Federation 主应用（Host）Webpack 配置
// 消费 remoteA（Vue）与 remoteB（React）暴露的模块
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
      name: 'host',
      // 声明要消费的远程模块（运行时才真正加载）
      remotes: {
        remoteA: 'remoteA@http://localhost:9011/remoteEntry.js',
        remoteB: 'remoteB@http://localhost:9012/remoteEntry.js'
      },
      // 共享依赖：singleton 保证全局只有一份
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'MF 主应用'
    })
  ],
  devServer: {
    port: 9010,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
};
