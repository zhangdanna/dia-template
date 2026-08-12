import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'virtual:uno.css';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupRouterGuard } from './router/guard';
import { setupDirectives } from '@/directives';
import { useAppStore } from '@/stores/app';
import '@/styles/index.scss';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
setupRouter(app);
setupDirectives(app);
setupRouterGuard(router);

// 全局错误捕获，避免未处理异常导致页面白屏
app.config.errorHandler = (err, _instance, info) => {
  console.error('[GlobalError]', info, err);
};

useAppStore().initTheme();
app.mount('#app');
