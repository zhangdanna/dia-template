# dia-template

企业级 Vue 3 中后台脚手架（To-B）。基于 Vite + TypeScript + Element Plus，内置动态路由权限、Axios 封装、Pinia 状态、多标签页、暗色主题、Mock、ESLint/Husky 工程化、Docker 部署。

## 技术栈

| 分类     | 选型                                                      |
| -------- | --------------------------------------------------------- |
| 框架     | Vue 3.5 `<script setup>` + TypeScript 6                   |
| 构建     | Vite 8（rolldown）                                        |
| 路由     | Vue Router（动态路由 + 路由守卫）                         |
| 状态     | Pinia + pinia-plugin-persistedstate                       |
| UI       | Element Plus + @element-plus/icons-vue                    |
| HTTP     | Axios 封装（拦截器 / Token 刷新 / 取消重复请求）          |
| 样式     | UnoCSS + SCSS                                             |
| 自动导入 | unplugin-auto-import + unplugin-vue-components            |
| 工程化   | ESLint 9 flat + Prettier + Stylelint + Husky + commitlint |
| 测试     | Vitest + @vue/test-utils + jsdom                          |
| 部署     | Docker + nginx                                            |

## 脚手架搭建过程

记录本脚手架从零搭建的完整步骤，可复现。

### 环境

- Node 22 LTS（Vite 8 / rolldown 要求 20.19+ 或 22.12+）
- pnpm（v11+）

### 1. 初始化 Vite + Vue + TS

```bash
pnpm create vite . --template vue-ts
pnpm install
```

### 2. 安装运行时依赖

```bash
pnpm add vue-router pinia pinia-plugin-persistedstate element-plus @element-plus/icons-vue axios nprogress @vueuse/core
```

### 3. 安装开发依赖

```bash
# 构建
pnpm add -D unplugin-auto-import unplugin-vue-components @unocss/vite unocss @types/nprogress sass
# 工程化 + 测试
pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional \
  eslint @eslint/js typescript-eslint eslint-plugin-vue vue-eslint-parser eslint-config-prettier prettier \
  stylelint stylelint-config-standard-vue stylelint-config-recess-order \
  vitest @vue/test-utils jsdom @vitest/coverage-v8 rollup-plugin-visualizer
```

### 4. 清理默认 demo + 建目录

```bash
rm -f src/style.css src/components/HelloWorld.vue src/assets/hero.png src/assets/vue.svg src/assets/vite.svg
mkdir -p src/{types,styles,router/routes,stores,utils,api,constants,directives,layouts/default,layouts/blank,views/login,views/dashboard,views/error,views/system,composables,components,assets} mock tests
```

### 5. 配置层

- `vite.config.ts`：别名 `@/`、AutoImport、Components、UnoCSS、内联 Mock 插件、代理、分包
- `tsconfig.app.json`：`@/*` 路径别名、严格模式
- `uno.config.ts`、`.env.development`/`.env.production`、`.editorconfig`、`.npmrc`

### 6. 源码层（按依赖顺序编写）

1. `utils/`：`auth.ts`（Token）、`storage.ts`（本地存储）、`request.ts`（Axios 封装）
2. `api/`：`types.ts`（响应封装）、`user.ts`（登录/用户信息）
3. `stores/`：`app` / `user` / `permission` / `tabs`
4. `router/`：`routes/static`、`routes/dynamic`、`index`（addRoute/resetRouter）、`guard`
5. `directives/`、`composables/`
6. `layouts/`：`default`（侧边/头部/标签/面包屑）、`blank`
7. `views/`：`login`、`dashboard`、`system`、`error`
8. `main.ts` / `App.vue`：装配 Pinia + Router + ElementPlus + 图标 + 指令 + 守卫

### 7. 工程化

- `eslint.config.mjs`（flat）、`.prettierrc.json`、`stylelint.config.mjs`
- `commitlint.config.mjs`、`.lintstagedrc.json`
- `pnpm exec husky init` → `.husky/pre-commit`（`lint-staged`）、`.husky/commit-msg`（`commitlint --edit "$1"`）

### 8. 测试与部署

- `vitest.config.mts` + `tests/example.test.ts`
- `Dockerfile`（多阶段构建）+ `nginx.conf`（SPA 回退 + /api 反代）+ `.dockerignore`

### 9. 踩坑记录

- **pnpm v11 阻塞构建脚本**：`@parcel/watcher` 的 build 脚本被列为待审批，会阻塞所有 `pnpm exec`。在 `pnpm-workspace.yaml` 用 `allowBuilds: { '@parcel/watcher': true }` 放行。
- **Vite 8 用 rolldown**：`build.rollupOptions.output.manualChunks` 必须是**函数**，不能再传对象。
- **TypeScript 6 弃用 `baseUrl`**：`paths` 不带 `baseUrl` 时必须用相对形式 `"@/*": ["./src/*"]`。
- **Vite 8 Sass 选项**：`css.preprocessorOptions.scss.api` 类型不再兼容，已移除（使用默认 modern API）。
- **auto-import 与 vue-tsc**：`src/types/auto-imports.d.ts`、`components.d.ts` 由插件在首次 `vite` 运行时生成，已纳入 tsconfig include；`build` 不含 `vue-tsc`，类型检查走独立的 `pnpm type-check`。

## 快速开始

```bash
pnpm install
pnpm dev          # 开发（内置 mock，无需后端）
pnpm build        # 生产构建
pnpm preview      # 预览构建产物
pnpm lint         #
```

默认登录账号：`admin` / `123456`（由 dev 内置 mock 提供）。

## 常用脚本

| 命令              | 说明                                      |
| ----------------- | ----------------------------------------- |
| `pnpm dev`        | 启动开发服务器（development 模式 + Mock） |
| `pnpm dev:test`   | 以 test 环境启动开发服务器                |
| `pnpm build`      | 生产构建（默认 production 模式）          |
| `pnpm build:test` | 测试环境构建                              |
| `pnpm build:pre`  | 预发环境构建                              |
| `pnpm build:prod` | 生产环境构建（等价 build）                |
| `pnpm type-check` | TypeScript 类型检查（vue-tsc）            |
| `pnpm lint`       | ESLint 自动修复                           |
| `pnpm lint:check` | ESLint 仅检查                             |
| `pnpm format`     | Prettier 格式化                           |
| `pnpm stylelint`  | Stylelint 检查修复                        |
| `pnpm test`       | Vitest 单次运行                           |
| `pnpm test:watch` | Vitest 监听模式                           |

## 目录结构

```
src/
├── api/            # 接口层（按模块拆，带类型）
├── assets/         # 静态资源
├── components/     # 全局通用组件（自动导入）
├── composables/    # 组合式函数（自动导入）
├── constants/      # 枚举/常量
├── directives/     # 自定义指令（v-permission 等）
├── layouts/        # 布局：default（侧边/头部/标签）/ blank
├── router/         # 路由：static + dynamic（权限）+ guard
├── stores/         # Pinia：user / app / permission / tabs
├── styles/         # 全局样式、CSS 变量
├── types/          # 全局类型声明（env、router、auto-import 生成）
├── utils/          # auth / storage / request(Axios)
└── views/          # 页面：login / dashboard / system / error
```

## 核心能力

### 路由与权限

- **静态路由**：登录页、错误页（403/404/500）。
- **动态路由**：登录后按角色 `addRoute` 注入（见 `src/router/routes/dynamic.ts`）。
- **路由守卫**：登录态校验、白名单、动态路由注入、标题、nprogress（`src/router/guard.ts`）。
- **按钮级权限**：`v-permission` 指令或 `usePermission()` 组合式函数。

### 请求层（`src/utils/request.ts`）

- 请求拦截自动携带 Token；响应拦截统一处理业务码。
- 401 过期弹窗重新登录；重复请求自动取消（AbortController）。
- `request<T>()` 泛型返回业务数据，类型安全。

### 状态管理

- `user`：Token / 用户信息 / 角色 / 登录登出。
- `permission`：动态路由与菜单生成（按 roles 过滤）。
- `app`：侧边栏折叠、主题（持久化）。
- `tabs`：多标签页 + keep-alive。

### 主题

亮/暗主题切换（Element Plus CSS 变量 + `html.dark` 类）。

### Mock

开发环境内置 mock 中间件（`vite.config.ts` 的 `mockApiPlugin`），拦截 `/api/auth/*`，无需后端即可登录体验。

## 环境与主题配置

所有环境配置与全局主题统一放在 `config/` 目录：

```
config/
├── env/                       # 环境变量（Vite envDir）
│   ├── .env                   # 公共基础（所有模式共享）
│   ├── .env.development       # 本地开发（/api + 代理 + Mock）
│   ├── .env.test              # 测试环境
│   ├── .env.pre               # 预发环境
│   └── .env.production        # 生产环境
└── theme/                     # 全局主题
    ├── tokens.ts              # 亮/暗主题 token 定义
    ├── index.ts               # applyTheme()：写 CSS 变量 + 派生 EP 主色
    └── element-plus.scss      # EP SCSS 变量覆盖（可选，深度定制用）
```

### 环境模式

| 模式        | env 文件           | 构建命令                         | 说明                |
| ----------- | ------------------ | -------------------------------- | ------------------- |
| development | `.env.development` | `pnpm dev`                       | 本地开发，内置 Mock |
| test        | `.env.test`        | `pnpm build:test`                | 测试环境            |
| pre         | `.env.pre`         | `pnpm build:pre`                 | 预发环境            |
| production  | `.env.production`  | `pnpm build` / `pnpm build:prod` | 生产环境            |

环境变量：

| 变量                | 说明                                                       |
| ------------------- | ---------------------------------------------------------- |
| `VITE_APP_TITLE`    | 应用标题（各环境可覆盖）                                   |
| `VITE_API_BASE_URL` | 接口基址（开发用 `/api` 走代理；test/pre/prod 用真实地址） |
| `VITE_PROXY_TARGET` | 开发代理目标（仅 dev/test 用）                             |

> 敏感信息放 `config/env/.env.*.local`（已被 `.gitignore` 的 `*.local` 忽略），不要提交。

### 全局主题

`config/theme/tokens.ts` 定义亮/暗两套 token（主色、成功/警告/危险、侧边栏、头部、内容区背景）。`config/theme/index.ts` 的 `applyTheme(mode)`：

- 在 `<html>` 写入 `--app-*` 业务 CSS 变量与 `--el-color-primary`；
- 用 `color-mix` 从主色派生 Element Plus 的 `light/dark` 变体，实现主色随主题切换；
- 切换 `.dark` 类联动 Element Plus 暗色样式。

应用启动时 `main.ts` 调用 `useAppStore().initTheme()` 应用持久化主题，导航栏太阳/月亮按钮切换。布局（侧边栏 / 头部 / 内容区）统一引用 `var(--app-*)`，改 token 即改全局外观。

## Docker 部署

```bash
docker build -t dia-template .
docker run -p 8080:80 dia-template
# 访问 http://localhost:8080
```

`nginx.conf` 已配置 SPA history 回退与 `/api/` 反向代理（按实际后端替换）。

## 新增页面

1. 在 `src/views/` 下新建组件。
2. 在 `src/router/routes/dynamic.ts` 添加路由（含 `meta.title` / `meta.icon` / `meta.roles`）。
3. 菜单自动从 `permission.menus` 渲染。

## 新增接口

在 `src/api/` 下按模块新建文件，调用 `request<T>({ url, method, data })`。
