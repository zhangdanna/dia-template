# Module Federation 微前端脚手架

基于 webpack 5 Module Federation 的微前端脚手架，演示跨框架（React + Vue）模块共享与独立部署。

## 一、项目简介

Module Federation（模块联邦）是 webpack 5 内置的微前端方案，核心思想是：**编译期声明、运行期加载**。各应用独立构建部署，通过 `remoteEntry.js` 在运行时共享模块，共享依赖可去重。

本脚手架包含三个应用：


| 应用           | 目录              | 技术栈remoteA/Widget | 端口   | 角色                            |
| ------------ | --------------- | ------------------ | ---- | ----------------------------- |
| host-app     | `host-app/`     | React 18           | 9010 | 主应用（Host），消费远程模块              |
| remote-app-a | `remote-app-a/` | Vue 3              | 9011 | 远程应用，暴露 `./Widget`            |
| remote-app-b | `remote-app-b/` | React 18           | 9012 | 远程应用，暴露 `./Counter`、`./utils` |


## 二、目录结构

```
mf-demo/
├── host-app/                  # 主应用（React Host）
│   ├── public/index.html
│   ├── src/
│   │   ├── index.js           # 入口（仅一行异步加载 bootstrap）
│   │   ├── bootstrap.js       # 真实启动逻辑
│   │   ├── App.js             # 聚合消费远程模块
│   │   ├── App.css
│   │   ├── components/
│   │   │   └── VueWidgetWrapper.js  # Vue 远程组件的 React 包装层
│   │   └── utils/format.js
│   └── webpack.config.js      # Host 的 MF 配置（remotes + shared）
│
├── remote-app-a/              # 远程应用 A（Vue）
│   ├── public/index.html
│   ├── src/
│   │   ├── index.js
│   │   ├── bootstrap.js
│   │   ├── App.vue            # 独立运行入口
│   │   ├── components/Widget.vue
│   │   └── exposes/Widget.js  # 暴露的框架无关挂载函数
│   └── webpack.config.js      # Remote 的 MF 配置（exposes + filename）
│
├── remote-app-b/              # 远程应用 B（React）
│   ├── public/index.html
│   ├── src/
│   │   ├── index.js
│   │   ├── bootstrap.js
│   │   ├── App.js
│   │   ├── components/Counter.js + Counter.css
│   │   └── utils/helpers.js   # 暴露的工具函数
│   └── webpack.config.js
│
└── start-all.bat              # 一键启动脚本（Windows）
```



## 三、快速开始



### 1. 安装依赖

三个应用各需独立安装依赖：

```bash
cd host-app && npm install
cd ../remote-app-a && npm install
cd ../remote-app-b && npm install
```



### 2. 启动

**方式一：一键启动（Windows）**

```bash
start-all.bat
```

**方式二：手动启动（三个终端）**

```bash
# 终端 1：Remote A（Vue，端口 9011）
cd remote-app-a && npm run dev

# 终端 2：Remote B（React，端口 9012）
cd remote-app-b && npm run dev

# 终端 3：Host 主应用（端口 9010）
cd host-app && npm run dev
```



### 3. 访问


| 地址                                             | 说明            |
| ---------------------------------------------- | ------------- |
| [http://localhost:9010](http://localhost:9010) | 主应用（聚合两个远程模块） |
| [http://localhost:9011](http://localhost:9011) | Remote A 独立运行 |
| [http://localhost:9012](http://localhost:9012) | Remote B 独立运行 |




## 四、核心设计要点



### 1. 异步启动边界（必备）

每个应用的入口只有一行，先初始化共享作用域再启动：

```javascript
// src/index.js
import('./bootstrap');   // bootstrap.js 才是真实启动逻辑
```

这是 Module Federation 的**必备模式**，否则共享依赖初始化时序会出错，产生 `Shared module is not available for eager consumption` 告警。

### 2. Host 配置 — 声明消费的远程模块

[webpack.config.js](host-app/webpack.config.js) 通过 `remotes` 声明远程模块，`shared` 去重共享依赖：

```javascript
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    remoteA: 'remoteA@http://localhost:9011/remoteEntry.js',
    remoteB: 'remoteB@http://localhost:9012/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: false },
    'react-dom': { singleton: true, requiredVersion: false },
  },
})
```

`singleton: true` 保证全局只有一份 React 实例；`requiredVersion: false` 关闭版本校验避免报错。

### 3. Remote 配置 — 暴露模块

[remote-app-b/webpack.config.js](remote-app-b/webpack.config.js) 通过 `exposes` 暴露模块，`filename` 指定入口文件名：

```javascript
new ModuleFederationPlugin({
  name: 'remoteB',
  filename: 'remoteEntry.js',
  exposes: {
    './Counter': './src/components/Counter',
    './utils': './src/utils/helpers',
  },
  shared: { react: { singleton: true, requiredVersion: false } },
})
```



### 4. 跨框架集成（Vue 组件被 React 消费）

Host 是 React，无法直接渲染 Vue 组件。标准做法是：**Vue 应用暴露框架无关的挂载函数**，由 React 侧包装组件接入生命周期。

- [exposes/Widget.js](remote-app-a/src/exposes/Widget.js) 暴露 `mount(container, props)`，返回卸载函数：

```javascript
export function mount(container, props = {}) {
  const { onEvent, ...rest } = props;
  const app = createApp({ render: () => h(Widget, { ...rest, onEvent }) });
  app.mount(container);
  return () => app.unmount();
}
```

- [VueWidgetWrapper.js](host-app/src/components/VueWidgetWrapper.js) 在 React 的 `useEffect` 中调用 `mount`，并在卸载时清理：

```javascript
useEffect(() => {
  const unmount = mount(ref.current, { message, onEvent });
  return unmount;
}, [message]);
```



### 5. 三种远程模块消费方式（App.js 演示）

在 [App.js](host-app/src/App.js) 中演示了三种消费姿势：


| 类型       | 远程模块              | 消费方式                                                  |
| -------- | ----------------- | ----------------------------------------------------- |
| Vue 组件   | `remoteA/Widget`  | `lazy(() => import('./components/VueWidgetWrapper'))` |
| React 组件 | `remoteB/Counter` | `lazy(() => import('remoteB/Counter'))`               |
| 工具函数     | `remoteB/utils`   | `import('remoteB/utils')` 后调用                         |


配合 `Suspense` 处理远程模块加载中的 loading 状态。

## 五、组件样式注意点

被消费的组件其样式必须**随组件一起打包**（在组件文件内 `import './Xxx.css'`），不能只写在应用的全局入口样式里。因为 Host 消费的是单个模块，不会加载 Remote 的 `App.css`。

参见 [remote-app-b/src/components/Counter.js](remote-app-b/src/components/Counter.js) 中的 `import './Counter.css'`。

## 六、与 qiankun 的对比


| 维度   | Module Federation         | qiankun                |
| ---- | ------------------------- | ---------------------- |
| 集成方式 | 编译期声明、运行期共享模块             | 运行时加载整个子应用（single-spa） |
| 依赖管理 | 可共享依赖、去重                  | 各子应用独立、运行时隔离           |
| 技术栈  | 倾向统一技术栈（共享依赖需版本兼容）        | 完全解耦，任意框架              |
| 隔离性  | 无强隔离（共享同一 window）         | 有 JS 沙箱、样式隔离           |
| 部署   | 远程应用独立部署 + remoteEntry.js | 子应用独立部署 + 入口 HTML      |
| 适用场景 | 新项目、微前端进阶、跨应用组件复用         | 遗留系统改造、多框架混用、强隔离需求     |




## 七、如何扩展（新增远程应用）

1. 新建远程应用目录，复制 `remote-app-b` 的 webpack 配置作为模板。
2. 修改 `name`、`filename`、`exposes` 和 `devServer.port`。
3. 在 Host 的 `webpack.config.js` 中增加 `remotes` 条目：

```javascript
remotes: {
  remoteC: 'remoteC@http://localhost:9004/remoteEntry.js',
}
```

1. 在 Host 中通过 `import('remoteC/xxx')` 消费。

