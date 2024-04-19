<template>
  <div class="VisualCenterPanel p-2 h-full">
    <el-scrollbar height="100%">
      <DraggableEditor
        v-if="currentPage"
        :key="currentPage.pageId"
        class="VisualCenterPanel-wrap"
        :class="[device, { 'is-drag': isDrag }]"
        :style="pageStyles"
      />
      <div v-else class="VisualCenterPanel-wrap" :class="[device, { 'is-drag': isDrag }]">
        <el-empty description="当前未选中页面" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import DraggableEditor from '../DraggableEditor/index.vue'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'
import { useVisualTheme } from '@/visual-editor/hooks/useVisualTheme'

const { device, isDrag, currentPage } = storeToRefs(useVisualBoxStore())

const { pageStyles } = useVisualTheme()
</script>

<style scoped lang="scss">
.VisualCenterPanel-wrap {
  position: relative;
  flex: 1;
  background-color: var(--el-bg-color);
  contain: layout;

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
