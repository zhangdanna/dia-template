// ============================================
// Vue 子应用入口文件
// 必须在最顶部引入 public-path.js
// ============================================
import './public-path';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

let app = null;

// ============================================
// 生命周期钩子 - qiankun 会调用这些函数
// ============================================

/**
 * 应用初始化前
 * 通常在这里初始化一些全局配置
 */
export async function bootstrap() {
  console.log('[Vue 子应用] bootstrap');
}

/**
 * 应用挂载
 * 每次进入子应用时都会调用
 */
export async function mount(props = {}) {
  console.log('[Vue 子应用] mount', props);

  const { container } = props;

  app = createApp(App);
  app.use(router);

  // 接收主应用传递的 props
  if (props.actions) {
    // 将主应用的 actions 挂载到 Vue 实例上
    app.config.globalProperties.$actions = props.actions;
    app.config.globalProperties.$message = props.message;
  }

  // qiankun 环境下挂载到主应用提供的容器内，避免覆盖主应用根节点
  app.mount(container ? container.querySelector('#app') : document.getElementById('app'));
}

/**
 * 应用卸载
 * 每次离开子应用时都会调用
 */
export async function unmount() {
  console.log('[Vue 子应用] unmount');
  if (app) {
    app.unmount();
    app = null;
  }
}

/**
 * 应用更新（可选）
 */
export async function update(props) {
  console.log('[Vue 子应用] update', props);
}

// ============================================
// 独立运行模式
// 如果不是在 qiankun 环境下，则直接启动应用
// ============================================
if (!window.__POWERED_BY_QIANKUN__) {
  bootstrap().then(mount);
}
