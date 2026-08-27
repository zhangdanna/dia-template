import React, { Suspense, lazy, useState } from 'react';
import { formatTime } from './utils/format';
import './App.css';

// 通过 Module Federation 消费远程模块（编译时声明，运行时加载）
// remoteA 是 Vue 应用，暴露框架无关的 mount 函数，需用 React 包装组件接入
const VueWidget = lazy(() => import('./components/VueWidgetWrapper'));
const ReactCounter = lazy(() => import('remoteB/Counter'));
// 消费远程应用暴露的工具函数
const RemoteUtils = lazy(() =>
  import('remoteB/utils').then((m) => ({ default: () => <RemoteUtilsCard utils={m} /> }))
);

// 展示远程工具函数调用结果的小组件
function RemoteUtilsCard({ utils }) {
  return (
    <div className="card">
      <h3>remoteB/utils（远程工具函数）</h3>
      <p>add(1, 2) = {utils.add(1, 2)}</p>
      <p>greet('MF') = {utils.greet('MF')}</p>
    </div>
  );
}

function Loading() {
  return <div className="loading">远程模块加载中...</div>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="host-app">
      <header className="host-header">
        <h1>Module Federation 主应用</h1>
        <p className="host-time">当前时间：{formatTime(new Date())}</p>
      </header>

      <main className="host-main">
        <section>
          <h2>来自 Vue 远程应用（remoteA）的组件</h2>
          <Suspense fallback={<Loading />}>
            <VueWidget message="Hello from Host" onEvent={() => setCount((c) => c + 1)} />
          </Suspense>
        </section>

        <section>
          <h2>来自 React 远程应用（remoteB）的组件</h2>
          <Suspense fallback={<Loading />}>
            <ReactCounter />
          </Suspense>
        </section>

        <section>
          <h2>来自 React 远程应用（remoteB）的工具函数</h2>
          <Suspense fallback={<Loading />}>
            <RemoteUtils />
          </Suspense>
        </section>

        <section>
          <h2>跨应用通信演示</h2>
          <p>Vue 组件点击次数已同步到 Host：{count}</p>
        </section>
      </main>
    </div>
  );
}

export default App;
