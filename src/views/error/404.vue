<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex-center h-screen flex-col">
    <h1 class="text-6xl font-bold text-gray-300">404</h1>
    <p class="text-gray-500 mt-4">页面不存在</p>
    <el-button type="primary" class="mt-6" @click="router.push('/')">返回首页</el-button>
  </div>
</template>
