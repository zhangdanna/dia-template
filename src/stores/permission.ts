import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { dynamicRoutes } from '@/router/routes/dynamic';

interface MetaWithRoles {
  roles?: string[];
  title?: string;
  icon?: string;
  hidden?: boolean;
}

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([]);
  const menus = ref<RouteRecordRaw[]>([]);

  function generateRoutes(roles: string[]): RouteRecordRaw[] {
    const accessed = filterRoutes(dynamicRoutes, roles);
    routes.value = accessed;
    menus.value = accessed;
    return accessed;
  }

  function reset(): void {
    routes.value = [];
    menus.value = [];
  }

  return { routes, menus, generateRoutes, reset };
});

function filterRoutes(routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] {
  return routes.flatMap((route) => {
    const meta = route.meta as MetaWithRoles | undefined;
    if (meta?.roles && !meta.roles.some((r) => roles.includes(r))) {
      return [];
    }
    const children = route.children ? filterRoutes(route.children, roles) : undefined;
    return [{ ...route, children } as RouteRecordRaw];
  });
}
