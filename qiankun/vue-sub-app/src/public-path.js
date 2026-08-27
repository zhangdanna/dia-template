// ============================================
// 动态 publicPath 配置
// 在 qiankun 环境下，需要动态设置 webpack 的 publicPath
// ============================================
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
