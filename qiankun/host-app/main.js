// ============================================
// qiankun 主应用 (Host App) - main.js
// 基于 single-spa 的运行时集成基座
// ============================================
import { registerMicroApps, start, runAfterFirstMounted } from 'qiankun';

// 1. 注册子应用
registerMicroApps([
  {
    name: 'vue-sub-app',
    entry: '//localhost:8091',           // 子应用入口地址
    container: '#container',             // 挂载容器选择器
    activeRule: '/vue',                  // 路由激活规则
    props: {                             // 向子应用传递 props
      message: '来自主应用的消息',
      onAuthChange: (token) => {
        console.log('子应用认证状态变更:', token);
      },
    },
  },
  {
    name: 'react-sub-app',
    entry: '//localhost:8092',
    container: '#container',
    activeRule: '/react',
    props: {
      message: 'Hello from Host',
    },
  },
]);

// 2. 首次渲染完成后回调
runAfterFirstMounted(() => {
  console.log('[qiankun] 首次渲染完成');
});

// 3. 启动 qiankun
start({
  sandbox: {
    strictStyleIsolation: false,         // false=ScopedCSS, true=ShadowDOM
    experimentalStyleIsolation: true,    // 实验性样式隔离
  },
  singular: true,                        // 子应用是否单例模式
  fetch: async (url, ...args) => {
    // 自定义 fetch：可添加鉴权 header
    const token = localStorage.getItem('token');
    return fetch(url, {
      ...args,
      headers: { ...args.headers, Authorization: `Bearer ${token}` },
    });
  },
});

// 4. 全局状态管理（发布订阅模式）
import { initGlobalState } from 'qiankun';

const initialState = { user: null, theme: 'light' };
const { subscribe, emit } = initGlobalState(initialState);

// 子应用订阅全局状态
subscribe((state, prev) => {
  console.log('[GlobalState] user 变更:', prev.user, '->', state.user);
});

// 主应用广播状态
emit({ user: { name: '张三' }, theme: 'dark' });

export { subscribe, emit };