<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import welcomeImg from '@/assets/welcome.svg'

const user = useUserStore()

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 6) return '夜深了'
  if (h < 9) return '早上好'
  if (h < 12) return '上午好'
  if (h < 14) return '中午好'
  if (h < 18) return '下午好'
  return '晚上好'
})

const username = computed(() => user.userInfo?.username ?? '用户')
</script>

<template>
  <div class="flex-center flex-col py-12">
    <img :src="welcomeImg" alt="welcome" class="w-260px mb-6" />
    <h2 class="text-2xl font-bold mb-2">{{ greeting }}，{{ username }} 👋</h2>
    <p class="text-gray-500">欢迎使用企业管理后台，祝你今天工作顺利！</p>
  </div>
</template>
