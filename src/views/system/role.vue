<script setup lang="ts">
import { ref } from 'vue'

interface RoleRow {
  id: number
  name: string
  key: string
  desc: string
}

const tableData = ref<RoleRow[]>([
  { id: 1, name: '超级管理员', key: 'admin', desc: '拥有全部权限' },
  { id: 2, name: '运营', key: 'operator', desc: '日常运营管理' },
  { id: 3, name: '财务', key: 'finance', desc: '财务相关权限' },
])
</script>

<template>
  <el-card>
    <template #header>
      <div class="flex-between">
        <span>角色管理</span>
        <el-button type="primary" size="small">新增角色</el-button>
      </div>
    </template>
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="key" label="角色标识" />
      <el-table-column prop="desc" label="描述" />
    </el-table>
  </el-card>
</template>
