<template>
  <div class="VisualLeftPanel">
    <el-tabs v-model="activeTab" tab-position="left">
      <el-tab-pane name="pages">
        <template #label>
          <div class="flex flex-col items-center gap-1">
            <Icon class="text-xl" icon="ep:document-copy" />
            <span class="text-xs">页面</span>
          </div>
        </template>
        <div class="VisualLeftPanel-header">页面节点</div>
        <el-scrollbar height="calc(100% - 30px)">
          <VisualPagesTree />
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane name="nodes">
        <template #label>
          <div class="flex flex-col items-center gap-1">
            <Icon class="text-xl" icon="bi:bounding-box" />
            <span class="text-xs">节点</span>
          </div>
        </template>
        <div class="VisualLeftPanel-header">组件节点</div>
        <el-scrollbar height="calc(100% - 30px)">
          <VisualNodesTree />
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane name="basicWidgets">
        <template #label>
          <div class="flex flex-col items-center gap-1">
            <Icon class="text-xl" icon="ion:color-palette-outline" />
            <span class="text-xs">基础</span>
          </div>
        </template>
        <div class="VisualLeftPanel-header">基础组件</div>
        <el-scrollbar height="calc(100% - 30px)">
          <VisualComponents :data="basicWidgets" />
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane name="containerWidgets">
        <template #label>
          <div class="flex flex-col items-center gap-1">
            <Icon class="text-xl" icon="bi:inboxes" />
            <span class="text-xs">容器</span>
          </div>
        </template>
        <div class="VisualLeftPanel-header">容器组件</div>
        <el-scrollbar height="calc(100% - 30px)">
          <VisualComponents :data="containerWidgets" />
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane name="components">
        <template #label>
          <div class="flex flex-col items-center gap-1">
            <Icon class="text-xl" icon="bi:box" />
            <span class="text-xs">组件</span>
          </div>
        </template>
        <div class="VisualLeftPanel-header">功能组件</div>
        <el-scrollbar height="calc(100% - 30px)"> ... </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { visualConfig } from '@/visual-editor/visual.config'
import VisualComponents from './components/VisualComponents.vue'
import VisualPagesTree from './components/VisualPagesTree/index.vue'
import VisualNodesTree from './components/VisualNodesTree/index.vue'

const activeTab = ref<string>('nodes')

const basicWidgets = visualConfig.componentModules.basicWidgets
const containerWidgets = visualConfig.componentModules.containerWidgets
</script>

<style scoped lang="scss">
.VisualLeftPanel {
  height: 100%;

  .VisualLeftPanel-header {
    height: 30px;
    color: var(--el-text-color-regular);
  }

  :deep(.el-tabs) {
    height: 100%;

    .el-tabs__item {
      height: auto;
      padding: 12px 16px;
      color: var(--el-text-color-regular);
    }

    .el-tabs__header.is-left {
      margin-right: 0;
    }

    .el-tabs__content {
      padding: 12px;
      height: 100%;

      .el-tab-pane {
        height: 100%;
      }
    }

    .el-tabs__nav-wrap.is-left::after {
      width: 1px;
    }
  }
}
</style>
