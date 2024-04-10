<template>
  <el-collapse v-model="activeNames" class="VisualComponents">
    <el-collapse-item
      v-for="item in visualComponentGroups"
      :key="item.group"
      :name="item.group"
      :title="item.groupName"
    >
      组件
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { visualComponentGroups } from '@/data/visual.data'

const activeNames = ref<string[]>(['1'])
</script>

<style scoped lang="scss">
:deep(.el-collapse-item__content) {
  padding-bottom: 8px;
}

.visual-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: var(--el-border-radius-base);
  border: 1px solid var(--el-border-color-light);
  cursor: pointer;
}
</style>
