<template>
  <div class="VisualCenterPanel p-2 h-full">
    <el-scrollbar height="100%">
      <DraggableEditor class="VisualCenterPanel-wrap" :class="device" />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import DraggableEditor from '../DraggableEditor/index.vue'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'

const { device } = storeToRefs(useVisualBoxStore())
</script>

<style scoped lang="scss">
.VisualCenterPanel-wrap {
  position: relative;
  flex: 1;
  background-color: var(--el-bg-color);

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

:deep(.el-loading-mask) {
  background-color: transparent !important;
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
