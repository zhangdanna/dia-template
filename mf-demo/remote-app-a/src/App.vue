<template>
  <div class="standalone">
    <h1>Remote A（Vue）独立运行</h1>
    <p>该应用也可被 Host 通过 Module Federation 消费 ./Widget 模块。</p>
    <Widget message="独立运行模式" @event="onEvent" />
  </div>
</template>

<script>
import Widget from './components/Widget.vue';

export default {
  name: 'App',
  components: { Widget },
  methods: {
    onEvent(count) {
      console.log('[Remote A] Widget 事件:', count);
    }
  }
};
</script>

<style>
.standalone {
  max-width: 720px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>
