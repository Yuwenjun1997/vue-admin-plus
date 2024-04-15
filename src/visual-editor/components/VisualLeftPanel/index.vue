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
        <el-scrollbar height="100%"> 页面信息 </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane name="basicWidgets">
        <template #label>
          <div class="flex flex-col items-center gap-1">
            <Icon class="text-xl" icon="ion:color-palette-outline" />
            <span class="text-xs">基础</span>
          </div>
        </template>
        <el-scrollbar height="100%">
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
        <el-scrollbar height="100%">
          <VisualComponents :data="containerWidgets" />
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { visualConfig } from '@/visual-editor/visual.config'
import VisualComponents from './components/VisualComponents.vue'

const activeTab = ref<string>('basicWidgets')

const basicWidgets = visualConfig.componentModules.basicWidgets
const containerWidgets = visualConfig.componentModules.containerWidgets
</script>

<style scoped lang="scss">
.VisualLeftPanel {
  height: 100%;

  :deep(.el-tabs) {
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
    }

    .el-tabs__nav-wrap.is-left::after {
      width: 1px;
    }
  }
}
</style>
