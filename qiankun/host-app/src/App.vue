<template>
  <div id="app">
    <header class="header">
      <h1>Qiankun 微前端主应用</h1>
      <nav class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/vue">Vue 子应用</router-link>
        <router-link to="/react">React 子应用</router-link>
      </nav>
      <div class="user-info">
        <span v-if="user">欢迎, {{ user.name }}</span>
        <button v-else @click="login">登录</button>
      </div>
    </header>

    <main class="main-content">
      <router-view v-if="isHome" />
      <div v-else id="subapp-container" class="subapp-wrapper"></div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: null
    };
  },
  computed: {
    isHome() {
      return this.$route.path === '/';
    }
  },
  mounted() {
    // 监听全局状态变化
    if (this.$actions) {
      this.$actions.onGlobalStateChange((state) => {
        this.user = state.user;
      });
    }
  },
  methods: {
    login() {
      // 模拟登录
      const mockUser = { name: '张三', id: 1 };
      this.user = mockUser;
      localStorage.setItem('token', 'mock-token-123');

      // 更新全局状态
      if (this.$actions) {
        this.$actions.setGlobalState({
          user: mockUser,
          token: 'mock-token-123'
        });
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav a:hover,
.nav a.router-link-active {
  background: rgba(255, 255, 255, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info button {
  background: white;
  color: #667eea;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.user-info button:hover {
  background: #f0f0f0;
}

.main-content {
  flex: 1;
  padding: 2rem;
  background: #f5f5f5;
}

.subapp-wrapper {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  min-height: 400px;
}
</style>
