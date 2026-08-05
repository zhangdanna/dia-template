<script setup lang="ts">
import { computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import SidebarItem from './SidebarItem.vue'

const props = defineProps<{ item: RouteRecordRaw; basePath?: string }>()

function resolvePath(path: string): string {
  if (path.startsWith('/')) return path
  const base = (props.basePath ?? '').replace(/\/$/, '')
  return `${base}/${path}`
}

// 单 index 子路由（path:''）折叠为直接菜单项，避免「只有一个子项的子菜单」
const isFlat = computed(() => {
  const children = props.item.children
  return !!children && children.length === 1 && children[0]?.path === ''
})
</script>

<template>
  <el-menu-item v-if="isFlat" :index="resolvePath(item.path)">
    <el-icon v-if="item.meta?.icon">
      <component :is="item.meta.icon" />
    </el-icon>
    <template #title>{{ item.meta?.title }}</template>
  </el-menu-item>

  <el-sub-menu v-else-if="item.children?.length" :index="resolvePath(item.path)">
    <template #title>
      <el-icon v-if="item.meta?.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta?.title }}</span>
    </template>
    <SidebarItem
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      :base-path="resolvePath(item.path)"
    />
  </el-sub-menu>

  <el-menu-item v-else :index="resolvePath(item.path)">
    <el-icon v-if="item.meta?.icon">
      <component :is="item.meta.icon" />
    </el-icon>
    <template #title>{{ item.meta?.title }}</template>
  </el-menu-item>
</template>
