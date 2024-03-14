<template>
  <div class="p-2 h-full">
    <el-scrollbar height="100%">
      <VisualBoxRender v-for="template in visualBoxTemplates" :key="template.visualBoxKey" :template="template" />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { storeToRefs } from 'pinia'

const visualBoxStore = useVisualBoxStore()
const { visualBoxTemplates } = storeToRefs(visualBoxStore)
</script>

<style scoped lang="scss">
.el-scrollbar {
  :deep(.el-scrollbar__view) {
    margin: 2px;
    min-height: calc(100% - 4px);
    background-color: var(--el-bg-color);
  }
}
</style>
