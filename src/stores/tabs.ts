import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'

export interface TabItem {
  path: string
  title: string
  affix?: boolean
}

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<TabItem[]>([])

  function addTab(route: RouteLocationNormalized): void {
    const meta = route.meta
    if (meta?.hidden || !route.name) return
    const title = meta.title || '未命名'
    if (tabs.value.some((t) => t.path === route.path)) return
    tabs.value.push({ path: route.path, title, affix: meta.affix })
  }

  function removeTab(path: string): void {
    tabs.value = tabs.value.filter((t) => t.path !== path || t.affix)
  }

  function reset(): void {
    tabs.value = []
  }

  return { tabs, addTab, removeTab, reset }
})
