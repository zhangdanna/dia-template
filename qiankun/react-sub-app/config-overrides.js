// ============================================
// React 子应用 Webpack 配置重写
// 使用 react-app-rewired 来修改 CRA 配置
// ============================================
module.exports = {
  webpack: function override(config, env) {
    // 设置 output.library，让 qiankun 可以加载
    config.output.library = 'react-sub-app';
    config.output.libraryTarget = 'umd';
    config.output.publicPath = process.env.NODE_ENV === 'production'
      ? '//localhost:8092/'
      : '/';

    return config;
  },

  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      // 允许主应用跨域加载子应用资源（含预检请求所需头）
      config.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*'
      };
      return config;
    };
  }
};
