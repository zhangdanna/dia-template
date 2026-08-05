<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const stats = [
  { label: '今日访问', value: '1,286', color: '#1677ff' },
  { label: '订单数', value: '328', color: '#52c41a' },
  { label: '待处理', value: '12', color: '#fa8c16' },
  { label: '异常', value: '3', color: '#f5222d' },
]
</script>

<template>
  <div>
    <el-card class="mb-4">
      <h2 class="text-xl mb-2">欢迎回来，{{ user.userInfo?.username ?? '用户' }} 👋</h2>
      <p class="text-gray-500">这是企业级 Vue 中后台脚手架的工作台首页。</p>
    </el-card>
    <el-row :gutter="16">
      <el-col v-for="stat in stats" :key="stat.label" :span="6">
        <el-card>
          <p class="text-gray-400 text-sm">{{ stat.label }}</p>
          <p class="text-2xl font-bold mt-2" :style="{ color: stat.color }">{{ stat.value }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
