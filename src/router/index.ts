import type { App } from 'vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { staticRoutes } from './routes/static';

const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes,
  scrollBehavior: () => ({ top: 0 }),
});

const STATIC_NAMES = new Set(['Login', 'Forbidden', 'NotFound', 'ServerError']);

/** 注入动态路由 + 兜底 404 路由（需在动态路由之后，避免吞掉动态路径） */
export function addDynamicRoutes(routes: RouteRecordRaw[]): void {
  routes.forEach((r) => router.addRoute(r));
  router.addRoute({ path: '/:pathMatch(.*)*', name: 'CatchAll', redirect: '/404' });
}

/** 移除所有动态路由，仅保留静态路由 */
export function resetRouter(): void {
  for (const r of router.getRoutes()) {
    if (r.name && !STATIC_NAMES.has(r.name as string)) {
      router.removeRoute(r.name);
    }
  }
}

export function setupRouter(app: App): void {
  app.use(router);
}

export default router;
