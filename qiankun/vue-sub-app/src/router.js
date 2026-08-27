import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/vue/',
    name: 'Home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/vue/about',
    name: 'About',
    component: () => import('./views/About.vue')
  },
  {
    path: '/vue/user',
    name: 'User',
    component: () => import('./views/User.vue')
  }
];

const router = createRouter({
  // 在 qiankun 环境下使用 history 模式
  // 注意：base 需要设置为子应用的 activeRule
  history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue/' : '/'),
  routes
});

export default router;
