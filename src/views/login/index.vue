<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Lock, User } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { usePermissionStore } from '@/stores/permission'
import { useUserStore } from '@/stores/user'
import { addDynamicRoutes } from '@/router'
import { APP_TITLE } from '@/constants'

const router = useRouter()
const route = useRoute()
const user = useUserStore()
const permission = usePermissionStore()

const formRef = ref<FormInstance>()
const loading = ref(false)
const form = reactive({ username: 'admin', password: '123456' })

const rules: FormRules<typeof form> = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

async function handleLogin(): Promise<void> {
  if (!formRef.value) return
  await formRef.value.validate()
  loading.value = true
  try {
    await user.login(form)
    await user.fetchUserInfo()
    const routes = permission.generateRoutes(user.roles)
    addDynamicRoutes(routes)
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="login-wrapper flex-center h-screen"
    style="background: linear-gradient(135deg, #1677ff, #38b6ff)"
  >
    <el-card class="w-380px shadow-xl">
      <h2 class="text-center mb-6 text-xl font-bold">{{ APP_TITLE }}</h2>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="0"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名" :prefix-icon="User" size="large" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            :prefix-icon="Lock"
            show-password
            size="large"
          />
        </el-form-item>
        <el-button
          type="primary"
          class="w-full"
          size="large"
          :loading="loading"
          @click="handleLogin"
        >
          登 录
        </el-button>
      </el-form>
      <p class="text-center text-xs text-gray-400 mt-4">默认账号：admin / 123456</p>
    </el-card>
  </div>
</template>
