import React from 'react';

function About() {
  return (
    <div className="about">
      <h3>关于 React 子应用</h3>
      <p>这是一个基于 React 18 的 Qiankun 子应用示例。</p>

      <div className="features">
        <h4>核心特性</h4>
        <ul>
          <li>✅ 完整的生命周期管理（bootstrap、mount、unmount）</li>
          <li>✅ 使用 react-app-rewired 修改 Webpack 配置</li>
          <li>✅ 支持独立运行和 Qiankun 加载两种模式</li>
          <li>✅ 与主应用的全局状态通信</li>
          <li>✅ CORS 配置支持跨域加载</li>
        </ul>
      </div>

      <div className="tech-stack">
        <h4>技术栈</h4>
        <div className="tech-item">
          <strong>React 18</strong> - 用于构建用户界面的 JavaScript 库
        </div>
        <div className="tech-item">
          <strong>React Router 6</strong> - 声明式路由管理
        </div>
        <div className="tech-item">
          <strong>react-app-rewired</strong> - 自定义 CRA 配置
        </div>
      </div>
    </div>
  );
}

export default About;
