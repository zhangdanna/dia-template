module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 使用自定义格式化器
  formatter: '@commitlint/format',
  rules: {
    'header-max-length': [2, 'always', 72],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复bug
        'docs',     // 文档变更
        'style',    // 代码格式（不影响代码运行的变动）
        'refactor', // 重构
        'perf',     // 性能优化
        'test',     // 增加测试
        'build',    // 构建过程或依赖变更
        'ci',       // CI配置变更
        'chore',    // 其他杂项
        'revert'    // 回滚
      ]
    ]
  },
  // 可选：添加帮助信息
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  prompt: {
    messages: {
      skip: ':skip',
      max: '上限 %d 个字符',
      min: '至少 %d 个字符',
      emptyWarning: '不能为空哦',
      upperLimitWarning: '超过上限',
      lowerLimitWarning: '低于下限',
    },
  }
};