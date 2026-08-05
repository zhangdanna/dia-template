import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:uno.css'
import App from './App.vue'
import router, { setupRouter } from './router'
import { setupRouterGuard } from './router/guard'
import { setupDirectives } from '@/directives'
import { useAppStore } from '@/stores/app'
import '@/styles/index.scss'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(ElementPlus)
useAppStore().initTheme()
setupRouter(app)
setupDirectives(app)
setupRouterGuard(router)

app.mount('#app')
