<template>
  <div id="app" class="vue-sub-app">
    <header class="sub-header">
      <h2>Vue 子应用</h2>
      <nav class="sub-nav">
        <router-link to="/vue/">首页</router-link>
        <router-link to="/vue/about">关于</router-link>
        <router-link to="/vue/user">用户信息</router-link>
      </nav>
    </header>

    <main class="sub-main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 监听全局状态变化
    if (this.$actions) {
      this.$actions.onGlobalStateChange((state) => {
        console.log('[Vue 子应用] 全局状态变化:', state);
      });
    }
  }
};
</script>

<style scoped>
.vue-sub-app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.sub-header {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.sub-header h2 {
  margin-bottom: 0.5rem;
}

.sub-nav {
  display: flex;
  gap: 1rem;
}

.sub-nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.sub-nav a:hover,
.sub-nav a.router-link-active {
  background: rgba(255, 255, 255, 0.2);
}

.sub-main {
  padding: 1rem;
}
</style>
