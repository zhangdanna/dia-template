# Qiankun 微前端脚手架

基于 Qiankun 的微前端脚手架，包含一个主应用和两个不同框架的子应用（Vue 3 和 React 18）。

## 📁 目录结构

```
qiankun-demo/
├── host-app/          # 主应用（基座）- Vue 3
├── vue-sub-app/       # Vue 3 子应用
└── react-sub-app/     # React 18 子应用
```

## 🚀 快速开始

### 方式一：一键启动（推荐）

```bash
# 启动所有应用
./start-all.sh
```

### 方式二：手动启动

需要分别在三个终端中启动：

#### 1. 启动 Vue 子应用（端口 8091）

```bash
cd vue-sub-app
npm install
npm run dev
```

#### 2. 启动 React 子应用（端口 8092）

```bash
cd react-sub-app
npm install
npm run dev
```

#### 3. 启动主应用（端口 8090）

```bash
cd host-app
npm install
npm run dev
```

## 🌐 访问地址

- **主应用**：http://localhost:8090
- **Vue 子应用**：http://localhost:8091（独立运行）
- **React 子应用**：http://localhost:8092（独立运行）

在主应用中通过导航菜单切换子应用：
- 首页：http://localhost:8090/
- Vue 子应用：http://localhost:8090/vue
- React 子应用：http://localhost:8090/react

## 📚 核心特性

### 主应用（host-app）

- ✅ 注册和加载子应用
- ✅ 全局状态管理（`initGlobalState`）
- ✅ 样式隔离（`experimentalStyleIsolation`）
- ✅ 自定义 fetch 注入鉴权 header
- ✅ 路由切换子应用

### Vue 子应用（vue-sub-app）

- ✅ 完整的生命周期钩子（bootstrap、mount、unmount）
- ✅ 动态 publicPath 配置
- ✅ 支持独立运行和 Qiankun 加载两种模式
- ✅ 与主应用的全局状态通信

### React 子应用（react-sub-app）

- ✅ 完整的生命周期钩子
- ✅ 使用 react-app-rewired 修改 Webpack 配置
- ✅ CORS 跨域配置
- ✅ 支持独立运行和 Qiankun 加载两种模式

## 🔧 技术栈

| 应用 | 框架 | 路由 | 构建工具 |
|------|------|------|----------|
| 主应用 | Vue 3 | Vue Router 4 | Vue CLI 5 |
| Vue 子应用 | Vue 3 | Vue Router 4 | Vue CLI 5 |
| React 子应用 | React 18 | React Router 6 | CRA + react-app-rewired |

## 💡 关键配置说明

### 1. 主应用注册子应用

```javascript
registerMicroApps([
  {
    name: 'vue-sub-app',
    entry: '//localhost:8091',      // 子应用入口地址
    container: '#subapp-container', // 挂载容器
    activeRule: '/vue',             // 路由激活规则
    props: { actions, message }     // 传递给子应用的 props
  }
]);
```

### 2. 子应用导出生命周期

```javascript
// Vue 子应用
export async function bootstrap() { }
export async function mount(props) { }
export async function unmount() { }

// React 子应用
export async function bootstrap() { }
export async function mount(props) { }
export async function unmount() { }
```

### 3. 全局状态通信

```javascript
// 主应用设置状态
actions.setGlobalState({ user: { name: '张三' } });

// 子应用监听状态
props.actions.onGlobalStateChange((state) => {
  console.log('用户信息:', state.user);
});
```

## 📝 扩展指南

### 添加新的子应用

1. 创建新的子应用目录
2. 导出生命周期钩子（bootstrap、mount、unmount）
3. 配置 CORS 响应头
4. 在主应用的 `registerMicroApps` 中注册

### 常见问题

#### Q: 子应用样式冲突怎么办？

A: 主应用已启用 `experimentalStyleIsolation`，会自动为子应用样式添加前缀。也可以使用 `strictStyleIsolation: true` 启用 Shadow DOM。

#### Q: 子应用如何获取主应用的数据？

A: 通过 `props` 传递或使用全局状态管理（`initGlobalState`）。

#### Q: 子应用可以独立开发吗？

A: 可以。所有子应用都支持独立运行模式，通过 `window.__POWERED_BY_QIANKUN__` 判断运行环境。

## 📖 参考文档

- [Qiankun 官方文档](https://qiankun.umijs.org/zh)
- [single-spa 文档](https://single-spa.js.org/)
