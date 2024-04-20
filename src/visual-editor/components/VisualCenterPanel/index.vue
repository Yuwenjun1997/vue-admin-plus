<template>
  <div class="VisualCenterPanel p-2 h-full">
    <el-scrollbar height="100%">
      <div class="VisualCenterPanel-wrap" :class="[device, { 'is-drag': isDrag }]" :style="pageStyles">
        <template v-if="currentPage">
          <DraggableEditor :key="currentPage.pageId" class="flex-1" />
        </template>
        <el-empty v-else description="当前未选中页面" />
        <div v-if="isEmpty" class="empty-wrap">
          <VisualLogo class="logo" />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import VisualLogo from '../VisualLogo/index.vue'
import DraggableEditor from '../DraggableEditor/index.vue'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'
import { useVisualTheme } from '@/visual-editor/hooks/useVisualTheme'

const { device, isDrag, currentPage } = storeToRefs(useVisualBoxStore())

const { pageStyles } = useVisualTheme()

const isEmpty = computed(() => currentPage.value && currentPage.value.blocks.length === 0)
</script>

<style scoped lang="scss">
.VisualCenterPanel-wrap {
  position: relative;
  flex: 1;
  background-color: var(--el-bg-color);
  contain: layout;
  display: flex;
  flex-direction: column;

  &.pc {
    width: 100%;
  }

  &.h5 {
    width: 390px;
  }

  &.pad {
    width: 768px;
  }

  .empty-wrap {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    &::before,
    &::after {
      content: '';
      display: block;
      width: 240px;
      height: 240px;
      background-position: center;
    }

    &::after {
      background-image: url('@/assets/drag-right.svg');
    }

    &::before {
      background-image: url('@/assets/drag-left.svg');
    }

    .logo {
      position: absolute;
      transform: translateY(-120px);
      filter: grayscale(1);
    }
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
