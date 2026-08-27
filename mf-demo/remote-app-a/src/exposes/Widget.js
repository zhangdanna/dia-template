// ============================================
// 框架无关的挂载入口（供非 Vue 宿主消费）
// 用法：const unmount = mount(container, props)
// ============================================
import { createApp, h } from 'vue';
import Widget from '../components/Widget.vue';

/**
 * 将 Vue Widget 挂载到任意 DOM 容器
 * @param {HTMLElement} container - 宿主提供的容器元素
 * @param {Object} props - 宿主传入的 props（message、onEvent 等）
 * @returns {Function} 卸载函数，宿主在组件销毁时调用
 */
export function mount(container, props = {}) {
  const { onEvent, ...rest } = props;

  const app = createApp({
    // Vue 3 中组件事件以 onXxx 形式作为 prop 传入
    render: () => h(Widget, { ...rest, onEvent })
  });
  app.mount(container);

  return () => app.unmount();
}

export default Widget;
