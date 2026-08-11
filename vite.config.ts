import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from '@unocss/vite'
import eslint from 'vite-plugin-eslint'

// 开发环境内置 mock：拦截 /api/* 返回假数据，无需后端即可登录体验
function mockApiPlugin(): Plugin {
  return {
    name: 'dia-mock-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next()
        const url = new URL(req.url, 'http://localhost')
        const path = url.pathname
        const bodyText = await new Promise<string>((resolve) => {
          let data = ''
          req.on('data', (c) => {
            data += c.toString()
          })
          req.on('end', () => resolve(data))
        })
        const body = bodyText ? JSON.parse(bodyText) : {}
        res.setHeader('Content-Type', 'application/json')
        const ok = (data: unknown) => res.end(JSON.stringify({ code: 0, message: 'ok', data }))

        if (path === '/api/auth/login' && req.method === 'POST') {
          return ok({ token: `mock-token-${body.username ?? 'admin'}` })
        }
        if (path === '/api/auth/userinfo' && req.method === 'GET') {
          return ok({ id: 1, username: 'admin', roles: ['admin'], avatar: '' })
        }
        if (path === '/api/auth/logout' && req.method === 'POST') {
          return ok(null)
        }
        res.statusCode = 404
        res.end(JSON.stringify({ code: 404, message: 'mock not found', data: null }))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const envDir = fileURLToPath(new URL('./config/env', import.meta.url))
  const env = loadEnv(mode, envDir, '')

  return {
    envDir,
    plugins: [
      eslint(),
      vue(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        dts: 'src/types/auto-imports.d.ts',
        vueTemplate: true,
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        dts: 'src/types/components.d.ts',
      }),
      mockApiPlugin(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@config': fileURLToPath(new URL('./config', import.meta.url)),
      },
    },
    server: {
      host: true,
      port: 5173,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_PROXY_TARGET || 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      target: 'es2020',
      sourcemap: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (/[\\/]node_modules[\\/](vue|vue-router|pinia|@vue)[\\/]/.test(id)) return 'vue'
            if (id.includes('element-plus') || id.includes('@element-plus')) return 'element'
          },
        },
      },
    },
  }
})
