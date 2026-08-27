<template>
  <div class="home">
    <h2>欢迎使用 Qiankun 微前端脚手架</h2>
    <p class="description">
      这是一个基于 Qiankun 的微前端主应用示例，展示了如何集成不同框架的子应用。
    </p>

    <div class="features">
      <div class="feature-card">
        <h3>🚀 Vue 子应用</h3>
        <p>基于 Vue 3 的子应用，演示了完整的生命周期管理和动态 publicPath 配置。</p>
        <router-link to="/vue" class="btn">访问 Vue 子应用</router-link>
      </div>

      <div class="feature-card">
        <h3>⚛️ React 子应用</h3>
        <p>基于 React 18 的子应用，展示了跨框架集成的能力和 CORS 配置。</p>
        <router-link to="/react" class="btn">访问 React 子应用</router-link>
      </div>

      <div class="feature-card">
        <h3>🔄 全局状态</h3>
        <p>主应用与子应用之间通过全局状态管理实现数据共享和通信。</p>
        <div class="code-block">
          <code>// 主应用设置状态<br>
          actions.setGlobalState({ user: {...} })</code>
        </div>
      </div>
    </div>

    <div class="tech-stack">
      <h3>技术栈</h3>
      <ul>
        <li>主应用：Vue 3 + Vue Router 4 + Qiankun</li>
        <li>Vue 子应用：Vue 3 + Vue Router 4</li>
        <li>React 子应用：React 18 + React Router 6</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
}

.description {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.feature-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.feature-card h3 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.btn {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: opacity 0.3s;
}

.btn:hover {
  opacity: 0.9;
}

.code-block {
  background: #f5f5f5;
  padding: 0.75rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
}

.tech-stack {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tech-stack h3 {
  color: #333;
  margin-bottom: 1rem;
}

.tech-stack ul {
  list-style: none;
  padding: 0;
}

.tech-stack li {
  padding: 0.5rem 0;
  color: #666;
  border-bottom: 1px solid #eee;
}

.tech-stack li:last-child {
  border-bottom: none;
}

.tech-stack li::before {
  content: "✓ ";
  color: #667eea;
  font-weight: bold;
  margin-right: 0.5rem;
}
</style>
