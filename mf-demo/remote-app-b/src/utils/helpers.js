// 暴露给 Host 消费的工具函数

export function add(a, b) {
  return a + b;
}

export function greet(name) {
  return `Hello, ${name}! 来自 remoteB 的问候`;
}
