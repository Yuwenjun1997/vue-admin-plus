<template>
  <el-container class="visual-design-container">
    <el-aside class="vad-bg-color" style="width: 260px">
      <VisualLeftPanel />
    </el-aside>
    <el-container>
      <el-header class="vad-bg-color">
        <VisualHeaderPanel />
      </el-header>
      <el-main class="!p-0">
        <VisualCenterPanel />
      </el-main>
    </el-container>
    <el-aside class="vad-bg-color">
      <VisualRightPanel />
    </el-aside>
  </el-container>
</template>

<script lang="ts" setup>
import VisualLeftPanel from './components/VisualLeftPanel.vue'
import VisualRightPanel from './components/VisualRightPanel.vue'
import VisualCenterPanel from './components/VisualCenterPanel.vue'
import VisualHeaderPanel from './components/VisualHeaderPanel.vue'
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { visualComponentGroups, templates } from '@/data/visual.data'

const visualBoxStore = useVisualBoxStore()
visualBoxStore.initVisualBox(templates)
visualBoxStore.initVisualComponents(visualComponentGroups)
</script>

<style lang="scss" scoped>
.visual-design-container {
  height: 100%;

  .el-header {
    --el-header-height: 38px;
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
