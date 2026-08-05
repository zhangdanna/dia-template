<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { usePermissionStore } from '@/stores/permission'
import { APP_TITLE } from '@/constants'
import SidebarItem from './SidebarItem.vue'

const route = useRoute()
const app = useAppStore()
const permission = usePermissionStore()
</script>

<template>
  <div class="h-full flex flex-col" :style="{ background: 'var(--app-sidebar-bg)' }">
    <div class="h-14 flex-center text-white text-lg font-bold">
      <span v-show="!app.sidebarCollapsed">{{ APP_TITLE }}</span>
      <span v-show="app.sidebarCollapsed">DI</span>
    </div>
    <el-scrollbar class="flex-1">
      <el-menu
        :default-active="route.path"
        :collapse="app.sidebarCollapsed"
        router
        background-color="var(--app-sidebar-bg)"
        text-color="var(--app-sidebar-text)"
        active-text-color="var(--app-sidebar-active-text)"
      >
        <SidebarItem v-for="item in permission.menus" :key="item.path" :item="item" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
