const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8091,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    }
  },
  // 子应用 webpack 配置：以 umd 格式输出，qiankun 才能获取生命周期钩子
  configureWebpack: {
    output: {
      library: 'vue-sub-app-[name]',
      libraryTarget: 'umd',
      chunkLoadingGlobal: 'webpackJsonp_vue-sub-app'
    }
  },
  // 在 qiankun 环境下需要配置 publicPath
  publicPath: process.env.NODE_ENV === 'production' ? '//localhost:8091/' : '/'
});
