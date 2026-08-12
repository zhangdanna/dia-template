import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';

export interface TabItem {
  path: string;
  title: string;
  affix?: boolean;
}

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<TabItem[]>([]);
  const cachedViews = ref<string[]>([]);

  function addTab(route: RouteLocationNormalized): void {
    const meta = route.meta;
    if (meta?.hidden || !route.name) return;
    const title = meta.title || '未命名';
    if (tabs.value.some((t) => t.path === route.path)) return;
    tabs.value.push({ path: route.path, title, affix: meta.affix });
    const name = route.name as string;
    if (!cachedViews.value.includes(name)) {
      cachedViews.value.push(name);
    }
  }

  function removeTab(path: string): void {
    tabs.value = tabs.value.filter((t) => t.path !== path || t.affix);
  }

  function removeCachedView(name: string): void {
    cachedViews.value = cachedViews.value.filter((n) => n !== name);
  }

  function reset(): void {
    tabs.value = [];
    cachedViews.value = [];
  }

  return { tabs, cachedViews, addTab, removeTab, removeCachedView, reset };
});
