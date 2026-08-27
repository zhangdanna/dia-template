<template>
  <div class="home">
    <h3>Vue 子应用首页</h3>
    <p class="message">{{ message }}</p>

    <div class="info-card">
      <h4>应用信息</h4>
      <p><strong>运行环境：</strong>{{ isQiankun ? 'Qiankun 子应用' : '独立运行' }}</p>
      <p><strong>当前路由：</strong>{{ $route.path }}</p>
    </div>

    <div class="action-card">
      <h4>全局状态操作</h4>
      <p>当前用户：{{ user ? user.name : '未登录' }}</p>
      <button @click="updateUser" class="btn">更新用户信息</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      user: null
    };
  },
  computed: {
    message() {
      return this.$message || '暂无消息';
    },
    isQiankun() {
      return !!window.__POWERED_BY_QIANKUN__;
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
    updateUser() {
      if (this.$actions) {
        this.$actions.setGlobalState({
          user: { name: '李四（Vue 子应用更新）', id: 2 }
        });
      }
    }
  }
};
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

h3 {
  color: #42b883;
  margin-bottom: 1rem;
}

.message {
  background: #e8f5e9;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  color: #2e7d32;
}

.info-card,
.action-card {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.info-card h4,
.action-card h4 {
  color: #35495e;
  margin-bottom: 0.5rem;
}

.info-card p {
  margin: 0.5rem 0;
  color: #666;
}

.btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.btn:hover {
  background: #35495e;
}
</style>
