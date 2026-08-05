import { defineStore } from 'pinia'
import { ref } from 'vue'
import { applyTheme, type ThemeMode } from '@config/theme'

export const useAppStore = defineStore(
  'app',
  () => {
    const sidebarCollapsed = ref(false)
    const theme = ref<ThemeMode>('light')

    function toggleSidebar(): void {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }

    function setTheme(next: ThemeMode): void {
      theme.value = next
      applyTheme(next)
    }

    /** 应用启动时根据持久化主题写入 CSS 变量 */
    function initTheme(): void {
      applyTheme(theme.value)
    }

    return { sidebarCollapsed, theme, toggleSidebar, setTheme, initTheme }
  },
  { persist: { key: 'dia_app' } },
)
