import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/vue',
    name: 'VueSubApp',
    // 路由由 qiankun 处理，不需要 component
  },
  {
    path: '/react',
    name: 'ReactSubApp',
    // 路由由 qiankun 处理，不需要 component
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
