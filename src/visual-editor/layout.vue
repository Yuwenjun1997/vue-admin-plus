<template>
  <VadFullScreen :is-fullscreen="visualBoxStore.isFullscreen">
    <el-container class="visual-design-container" :class="{ 'is-full-screen': visualBoxStore.isFullscreen }">
      <el-header v-if="visualBoxStore.isFullscreen" class="vad-nav">
        <VisualLogo />
        <VadTools align="end" hide-refresh />
      </el-header>
      <el-container class="visual-design-wrap">
        <el-aside class="vad-bg-color" style="width: 340px">
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
import VisualLogo from './components/VisualLogo/index.vue'
import VisualLeftPanel from './components/VisualLeftPanel/index.vue'
import VisualRightPanel from './components/VisualRightPanel/index.vue'
import VisualCenterPanel from './components/VisualCenterPanel/index.vue'
import VisualHeaderPanel from './components/VisualHeaderPanel/index.vue'
import VisualTools from './components/VisualTools/index.vue'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'

const visualBoxStore = useVisualBoxStore()
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
}
</style>
