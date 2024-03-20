<template>
  <div class="VisualCenterPanel p-2 h-full">
    <el-scrollbar height="100%">
      <div class="VisualCenterPanel-wrap" :class="device">
        <VisualBoxRender v-for="template in visualBoxTemplates" :key="template.visualBoxKey" :template="template" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { storeToRefs } from 'pinia'

const visualBoxStore = useVisualBoxStore()
const { visualBoxTemplates, device } = storeToRefs(visualBoxStore)
</script>

<style scoped lang="scss">
.VisualCenterPanel-wrap {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--el-bg-color);
  padding: 2px;

  &.pc {
    width: 100%;
  }

  &.h5 {
    width: 390px;
  }

  &.pad {
    width: 768px;
  }
}

.el-scrollbar {
  :deep(.el-scrollbar__view) {
    min-height: calc(100% - 4px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
