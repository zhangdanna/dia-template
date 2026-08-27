<template>
  <div class="vue-widget">
    <h3>Vue Widget（remoteA 暴露的组件）</h3>
    <p>主应用传入的消息：{{ message }}</p>
    <button @click="handleClick">点击我（已点 {{ clicks }} 次）</button>
  </div>
</template>

<script>
export default {
  name: 'Widget',
  props: {
    message: { type: String, default: '' }
  },
  emits: ['event'],
  data() {
    return { clicks: 0 };
  },
  methods: {
    handleClick() {
      this.clicks += 1;
      // 向宿主应用派发事件，演示跨应用通信
      this.$emit('event', this.clicks);
    }
  }
};
</script>

<style scoped>
.vue-widget {
  border: 2px solid #42b883;
  border-radius: 6px;
  padding: 1rem;
  background: #f0fff7;
}

.vue-widget h3 {
  color: #42b883;
  margin-bottom: 0.5rem;
}

.vue-widget button {
  margin-top: 0.75rem;
  background: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.vue-widget button:hover {
  background: #35996e;
}
</style>
