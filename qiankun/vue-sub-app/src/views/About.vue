<template>
  <div class="about">
    <h3>关于 Vue 子应用</h3>
    <p>这是一个基于 Vue 3 的 Qiankun 子应用示例。</p>

    <div class="features">
      <h4>核心特性</h4>
      <ul>
        <li>✅ 完整的生命周期管理（bootstrap、mount、unmount）</li>
        <li>✅ 动态 publicPath 配置</li>
        <li>✅ 支持独立运行和 Qiankun 加载两种模式</li>
        <li>✅ 与主应用的全局状态通信</li>
        <li>✅ 样式隔离（通过 Qiankun 的 experimentalStyleIsolation）</li>
      </ul>
    </div>

    <div class="tech-stack">
      <h4>技术栈</h4>
      <div class="tech-item">
        <strong>Vue 3</strong> - 渐进式 JavaScript 框架
      </div>
      <div class="tech-item">
        <strong>Vue Router 4</strong> - 官方路由管理器
      </div>
      <div class="tech-item">
        <strong>Vue CLI 5</strong> - 项目脚手架工具
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
};
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
}

h3 {
  color: #42b883;
  margin-bottom: 1rem;
}

.features,
.tech-stack {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

h4 {
  color: #35495e;
  margin-bottom: 0.5rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem 0;
  color: #666;
}

.tech-item {
  background: white;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  border-left: 3px solid #42b883;
}

.tech-item strong {
  color: #42b883;
}
</style>
