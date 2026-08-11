module.exports = {
    root: true,
    env: { browser: true, es2021: true },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended', // Vue3 推荐规则
      'plugin:@typescript-eslint/recommended',
      'prettier', // 关闭与 Prettier 冲突的规则
    ],
    parser: 'vue-eslint-parser', // 解析 .vue 文件
    parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'vue/multi-word-component-names': 'off', // 可选：关闭组件名多词限制
    },
  }