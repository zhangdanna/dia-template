// ============================================
// React 子应用入口文件
// 导出 qiankun 生命周期钩子
// ============================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

let root = null;

/**
 * 渲染函数
 */
function render(props = {}) {
  const { container } = props;
  const rootElement = container
    ? container.querySelector('#root')
    : document.getElementById('root');

  root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>
  );
}

// ============================================
// 生命周期钩子 - qiankun 会调用这些函数
// ============================================

/**
 * 应用初始化前
 */
export async function bootstrap() {
  console.log('[React 子应用] bootstrap');
}

/**
 * 应用挂载
 */
export async function mount(props) {
  console.log('[React 子应用] mount', props);
  render(props);
}

/**
 * 应用卸载
 */
export async function unmount() {
  console.log('[React 子应用] unmount');
  if (root) {
    root.unmount();
    root = null;
  }
}

/**
 * 应用更新（可选）
 */
export async function update(props) {
  console.log('[React 子应用] update', props);
}

// ============================================
// 独立运行模式
// 如果不是在 qiankun 环境下，则直接启动应用
// ============================================
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
