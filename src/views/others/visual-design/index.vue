<template>
  <VadFullScreen :is-fullscreen="visualBoxStore.isFullscreen">
    <el-container class="visual-design-container" :class="{ 'is-full-screen': visualBoxStore.isFullscreen }">
      <el-header v-if="visualBoxStore.isFullscreen" class="vad-nav">
        <VisualLogo />
        <VadTools align="end" />
      </el-header>
      <el-container class="visual-design-wrap">
        <el-aside class="vad-bg-color" style="width: 260px">
          <VisualLeftPanel />
        </el-aside>
        <el-container>
          <el-header class="vad-bg-color visual-design__header">
            <VisualHeaderPanel />
          </el-header>
          <el-main class="!p-0">
            <VisualCenterPanel />
          </el-main>
        </el-container>
        <el-aside class="vad-bg-color visual-design__tools">
          <VisualTools />
        </el-aside>
        <el-aside class="vad-bg-color">
          <VisualRightPanel />
        </el-aside>
      </el-container>
    </el-container>
  </VadFullScreen>
</template>

<script lang="ts" setup>
import VadTools from '@/layout/components/VadTools/index.vue'
import VisualLogo from './components/VisualLogo.vue'
import VisualLeftPanel from './components/VisualLeftPanel.vue'
import VisualRightPanel from './components/VisualRightPanel.vue'
import VisualCenterPanel from './components/VisualCenterPanel.vue'
import VisualHeaderPanel from './components/VisualHeaderPanel.vue'
import VisualTools from './components/VisualTools.vue'
import { useVisualBoxStore } from '@/store/modules/visual-box'

const visualBoxStore = useVisualBoxStore()

visualBoxStore.setup()
</script>

<style lang="scss" scoped>
.visual-design-container {
  height: 100%;

  &.is-full-screen {
    --el-header-height: 60px;
    .visual-design-wrap {
      height: calc(100% - var(--el-header-height));
    }
  }

  .visual-design__header {
    --el-header-height: 38px;
    padding: 0;
  }

  .visual-design__tools {
    --el-aside-width: 40px;
    border-right: 1px dashed var(--el-border-color-light);
  }

  :deep(.el-tabs) {
    height: 100%;

    .el-tabs__header {
      margin-bottom: 0;
    }

    .el-tabs__content {
      height: calc(100% - var(--el-tabs-header-height));

      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>
