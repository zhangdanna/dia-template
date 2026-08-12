<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { Expand, Fold, Moon, Sunny } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import { useAppStore } from '@/stores/app';
import { usePermissionStore } from '@/stores/permission';
import { useUserStore } from '@/stores/user';
import { resetRouter } from '@/router';

const app = useAppStore();
const user = useUserStore();
const permission = usePermissionStore();
const route = useRoute();
const router = useRouter();

function toggleTheme(): void {
  app.setTheme(app.theme === 'light' ? 'dark' : 'light');
}

// 纯分组父级（无自身页面）点击时跳首页；其余跳自身路径
function breadcrumbTo(m: (typeof route.matched)[number]): string {
  if (m.redirect) return m.path;
  if (m.meta?.menuGroup) return '/home';
  return m.path;
}

async function handleLogout(): Promise<void> {
  try {
    await ElMessageBox.confirm('确认退出登录？', '提示', { type: 'warning' });
  } catch {
    return;
  }
  await user.logout();
  resetRouter();
  permission.reset();
  router.push('/login');
}
</script>

<template>
  <div class="h-14 flex-between px-4" :style="{ background: 'var(--app-header-bg)' }">
    <div class="flex items-center gap-3">
      <el-icon class="cursor-pointer text-xl" @click="app.toggleSidebar()">
        <Fold v-if="!app.sidebarCollapsed" />
        <Expand v-else />
      </el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="m in route.matched.filter((x) => x.meta?.title)"
          :key="m.path"
          :to="breadcrumbTo(m)"
        >
          {{ m.meta?.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="flex items-center gap-4">
      <el-icon class="cursor-pointer text-xl" @click="toggleTheme">
        <Sunny v-if="app.theme === 'light'" />
        <Moon v-else />
      </el-icon>
      <el-dropdown>
        <span class="flex items-center gap-2 cursor-pointer">
          <el-avatar :size="28" :src="user.userInfo?.avatar" />
          {{ user.userInfo?.username ?? '用户' }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push('/dashboard')">首页</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
