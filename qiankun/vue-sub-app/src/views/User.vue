<template>
  <div class="user">
    <h3>用户信息</h3>

    <div v-if="user" class="user-card">
      <div class="avatar">
        {{ user.name.charAt(0) }}
      </div>
      <div class="user-info">
        <p><strong>姓名：</strong>{{ user.name }}</p>
        <p><strong>ID：</strong>{{ user.id }}</p>
      </div>
    </div>

    <div v-else class="no-user">
      <p>暂无用户信息</p>
      <p class="hint">请在主应用登录后查看</p>
    </div>

    <div class="global-state">
      <h4>全局状态调试</h4>
      <pre>{{ globalState }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      user: null,
      globalState: {}
    };
  },
  mounted() {
    if (this.$actions) {
      // 获取当前全局状态
      this.$actions.onGlobalStateChange((state) => {
        this.user = state.user;
        this.globalState = state;
      });
    }
  }
};
</script>

<style scoped>
.user {
  max-width: 800px;
  margin: 0 auto;
}

h3 {
  color: #42b883;
  margin-bottom: 1rem;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.user-info p {
  margin: 0.5rem 0;
  color: #666;
}

.no-user {
  text-align: center;
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.no-user p {
  color: #999;
  margin: 0.5rem 0;
}

.hint {
  font-size: 0.9rem;
  color: #bbb;
}

.global-state {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
}

.global-state h4 {
  color: #35495e;
  margin-bottom: 0.5rem;
}

.global-state pre {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}
</style>
