// Qiankun 主应用入口文件
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { registerMicroApps, start, initGlobalState } from 'qiankun';
import { getMicroApps, lifeCycleHooks } from './micro-apps';

// 1. 创建 Vue 应用实例
const app = createApp(App);
app.use(router);

// 2. 全局状态管理
const initialState = {
  user: null,
  theme: 'light',
  token: localStorage.getItem('token') || ''
};

const actions = initGlobalState(initialState);

// 监听全局状态变化
actions.onGlobalStateChange((state, prev) => {
  console.log('[主应用] 全局状态变化:', state, prev);
});

// 将 actions 挂载到 Vue 实例上，方便组件使用
app.config.globalProperties.$actions = actions;

// 3. 注册子应用（配置见 micro-apps.js）
registerMicroApps(getMicroApps(actions), lifeCycleHooks);

// 4. 启动 qiankun
start({
  sandbox: {
    strictStyleIsolation: false,
    experimentalStyleIsolation: true
  },
  singular: true,
  prefetch: false,
  fetch: async (url, ...args) => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return fetch(url, {
      ...args,
      headers: { ...args.headers, ...headers }
    });
  }
});

// 5. 挂载应用
app.mount('#app');

