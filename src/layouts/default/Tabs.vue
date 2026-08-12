<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Close } from '@element-plus/icons-vue';
import { useTabsStore } from '@/stores/tabs';

const route = useRoute();
const router = useRouter();
const tabs = useTabsStore();

watch(
  () => route.fullPath,
  () => tabs.addTab(route),
  { immediate: true },
);

function clickTab(path: string): void {
  router.push(path);
}

function close(path: string): void {
  const wasActive = route.path === path;
  const name = router.resolve(path).name as string | undefined;
  tabs.removeTab(path);
  if (name) tabs.removeCachedView(name);
  if (wasActive && tabs.tabs.length) {
    router.push(tabs.tabs[tabs.tabs.length - 1]!.path);
  }
}
</script>

<template>
  <div
    class="h-9 flex items-center gap-1 px-2 border-b border-#e5e6eb"
    :style="{ background: 'var(--app-header-bg)' }"
  >
    <div
      v-for="t in tabs.tabs"
      :key="t.path"
      class="tab-item flex items-center gap-1 px-2 py-1 rounded cursor-pointer text-xs"
      :class="{ active: route.path === t.path }"
      @click="clickTab(t.path)"
    >
      {{ t.title }}
      <el-icon v-if="!t.affix" class="hover:text-red" @click.stop="close(t.path)">
        <Close />
      </el-icon>
    </div>
  </div>
</template>
