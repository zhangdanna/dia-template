<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'SystemUser' });

interface UserRow {
  id: number;
  username: string;
  role: string;
  status: '启用' | '禁用';
  createdAt: string;
}

const tableData = ref<UserRow[]>([
  { id: 1, username: 'admin', role: '超级管理员', status: '启用', createdAt: '2025-01-01' },
  { id: 2, username: 'zhangsan', role: '运营', status: '启用', createdAt: '2025-02-12' },
  { id: 3, username: 'lisi', role: '财务', status: '禁用', createdAt: '2025-03-20' },
]);
</script>

<template>
  <el-card>
    <template #header>
      <div class="flex-between">
        <span>用户管理</span>
        <el-button type="primary" size="small">新增用户</el-button>
      </div>
    </template>
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="role" label="角色" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status === '启用' ? 'success' : 'danger'">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" />
    </el-table>
  </el-card>
</template>
