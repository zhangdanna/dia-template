#!/bin/bash

# ============================================
# Qiankun 微前端脚手架启动脚本
# 启动顺序：先启动子应用，再启动主应用
# ============================================

echo "🚀 启动 Qiankun 微前端脚手架..."
echo ""

# 检查是否安装了依赖
check_deps() {
  if [ ! -d "$1/node_modules" ]; then
    echo "📦 安装 $1 依赖..."
    cd "$1" && npm install && cd ..
  fi
}

# 安装依赖
echo "📦 检查并安装依赖..."
check_deps "host-app"
check_deps "vue-sub-app"
check_deps "react-sub-app"
echo ""

# 启动子应用（后台运行，使用子 shell 避免 cd 污染主 shell）
echo "🔧 启动 Vue 子应用 (端口 8091)..."
(cd vue-sub-app && npm run dev) &
VUE_PID=$!

echo "🔧 启动 React 子应用 (端口 8092)..."
(cd react-sub-app && npm run dev) &
REACT_PID=$!

# 等待子应用启动
echo "⏳ 等待子应用启动..."
sleep 10

# 启动主应用
echo "🏠 启动主应用 (端口 8090)..."
(cd host-app && npm run dev) &
HOST_PID=$!

echo ""
echo "✅ 所有应用已启动！"
echo ""
echo "📍 访问地址："
echo "   - 主应用：http://localhost:8090"
echo "   - Vue 子应用：http://localhost:8091"
echo "   - React 子应用：http://localhost:8092"
echo ""
echo "🛑 按 Ctrl+C 停止所有应用"

# 捕获退出信号
trap "echo '正在停止所有应用...'; kill $VUE_PID $REACT_PID $HOST_PID 2>/dev/null; exit" INT TERM

# 等待所有进程
wait
