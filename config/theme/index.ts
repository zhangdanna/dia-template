import type { ThemeTokens } from './tokens'
import { darkTokens, lightTokens } from './tokens'

export { darkTokens, lightTokens }
export type { ThemeTokens }
export type ThemeMode = 'light' | 'dark'

const APP_VARS: Record<keyof ThemeTokens, string> = {
  primary: '--app-color-primary',
  success: '--app-color-success',
  warning: '--app-color-warning',
  danger: '--app-color-danger',
  info: '--app-color-info',
  sidebarBg: '--app-sidebar-bg',
  sidebarText: '--app-sidebar-text',
  sidebarActiveText: '--app-sidebar-active-text',
  headerBg: '--app-header-bg',
  contentBg: '--app-content-bg',
}

/** 用 color-mix 从主色派生 Element Plus 的 light/dark 变体 */
function setElPrimary(root: HTMLElement, primary: string): void {
  root.style.setProperty('--el-color-primary', primary)
  root.style.setProperty('--el-color-primary-light-3', `color-mix(in srgb, ${primary} 70%, white)`)
  root.style.setProperty('--el-color-primary-light-5', `color-mix(in srgb, ${primary} 50%, white)`)
  root.style.setProperty('--el-color-primary-light-7', `color-mix(in srgb, ${primary} 30%, white)`)
  root.style.setProperty('--el-color-primary-light-8', `color-mix(in srgb, ${primary} 20%, white)`)
  root.style.setProperty('--el-color-primary-light-9', `color-mix(in srgb, ${primary} 10%, white)`)
  root.style.setProperty('--el-color-primary-dark-2', `color-mix(in srgb, ${primary} 80%, black)`)
}

/** 应用主题：写入 CSS 变量并切换 .dark 类 */
export function applyTheme(mode: ThemeMode): void {
  const tokens: ThemeTokens = mode === 'dark' ? darkTokens : lightTokens
  const root = document.documentElement
  root.classList.toggle('dark', mode === 'dark')
  ;(Object.keys(APP_VARS) as (keyof ThemeTokens)[]).forEach((key) => {
    root.style.setProperty(APP_VARS[key], tokens[key])
  })
  setElPrimary(root, tokens.primary)
}
