import type { RouteRecordRaw } from 'vue-router';

const DefaultLayout = () => import('@/layouts/default/index.vue');

// 登录后按角色注入的动态路由（菜单由 permission store 过滤后生成）
// 单页面用 index 子路由（path:''）+ meta.menuGroup 区分纯分组节点
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: DefaultLayout,
    name: 'Home',
    meta: { title: '首页', icon: 'House', affix: true },
    children: [
      {
        path: '',
        component: () => import('@/views/home/index.vue'),
        name: 'HomePage',
      },
    ],
  },
  {
    path: '/dashboard',
    component: DefaultLayout,
    name: 'Dashboard',
    meta: { title: '工作台', icon: 'Odometer' },
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'DashboardPage',
      },
    ],
  },
  {
    path: '/system',
    component: DefaultLayout,
    name: 'System',
    meta: { title: '系统管理', icon: 'Setting', roles: ['admin'], menuGroup: true },
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/user.vue'),
        name: 'SystemUser',
        meta: { title: '用户管理', icon: 'User' },
      },
      {
        path: 'role',
        component: () => import('@/views/system/role.vue'),
        name: 'SystemRole',
        meta: { title: '角色管理', icon: 'UserFilled' },
      },
    ],
  },
];
