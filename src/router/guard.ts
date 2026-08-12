import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import type { Router } from 'vue-router';
import { WHITE_LIST } from '@/constants';
import { getToken } from '@/utils/auth';
import { addDynamicRoutes, resetRouter } from '@/router';
import { usePermissionStore } from '@/stores/permission';
import { useUserStore } from '@/stores/user';

nprogress.configure({ showSpinner: false });

export function setupRouterGuard(router: Router): void {
  router.beforeEach(async (to, _from, next) => {
    nprogress.start();
    document.title = to.meta?.title
      ? `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE}`
      : import.meta.env.VITE_APP_TITLE;

    const token = getToken();

    if (token) {
      if (to.path === '/login') {
        next({ path: '/' });
        return;
      }
      const user = useUserStore();
      if (!user.roles.length) {
        try {
          await user.fetchUserInfo();
          const permission = usePermissionStore();
          const routes = permission.generateRoutes(user.roles);
          addDynamicRoutes(routes);
          next({ ...to, replace: true });
          return;
        } catch {
          user.resetState();
          resetRouter();
          next({ path: '/login', query: { redirect: to.fullPath } });
          return;
        }
      }
      next();
      return;
    }

    if (WHITE_LIST.includes(to.path)) {
      next();
      return;
    }
    next({ path: '/login', query: { redirect: to.fullPath } });
  });

  router.afterEach(() => {
    nprogress.done();
  });

  router.onError((error) => {
    console.error('[router] error:', error);
    nprogress.done();
  });
}
