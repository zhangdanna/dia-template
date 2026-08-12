<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { useTabsStore } from '@/stores/tabs';
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';
import Tabs from './Tabs.vue';

const app = useAppStore();
const tabsStore = useTabsStore();
</script>

<template>
  <el-container class="h-screen">
    <el-aside :width="app.sidebarCollapsed ? '64px' : '210px'" class="transition-all duration-200">
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header class="px-0!">
        <Navbar />
      </el-header>
      <Tabs />
      <el-main class="bg-[var(--app-content-bg)]">
        <router-view v-slot="{ Component }">
          <keep-alive :include="tabsStore.cachedViews">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
