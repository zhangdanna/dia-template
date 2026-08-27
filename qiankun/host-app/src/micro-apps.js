// ============================================
// 微前端子应用注册配置
// 新增子应用时，只需在 getMicroApps 返回的数组中追加一项
// ============================================

/**
 * 获取子应用注册列表
 * @param {Object} actions - initGlobalState 返回的全局状态 actions
 * @returns {Array} qiankun registerMicroApps 所需的子应用配置数组
 */
export function getMicroApps(actions) {
  const microApps = [
    {
      key: 'vueApp',
      href: '//localhost:8091',
      activeRule: '/vue',
      name: 'vue-sub-app',
    },
    {
      key: 'reactApp',
      href: '//localhost:8092',
      activeRule: '/react',
      name: 'react-sub-app',
    }
  ];
  return microApps.map(mp => {
    return {
      name: mp.name,
      entry: mp.href,
      container: '#subapp-container',
      activeRule: mp.activeRule,
      props: {
        title: mp.ke,
        actions,
        message: `${mp.name}, 来自主应用的消息`
      }
    }
  });
}

// 子应用全局生命周期钩子
export const lifeCycleHooks = {
  beforeLoad: [async (app) => {
    console.log('[qiankun] beforeLoad', app.name);
  }],
  beforeMount: [async (app) => {
    console.log('[qiankun] beforeMount', app.name);
  }],
  afterUnmount: [async (app) => {
    console.log('[qiankun] afterUnmount', app.name);
  }]
};
