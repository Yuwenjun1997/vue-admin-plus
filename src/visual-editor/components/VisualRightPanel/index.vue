<template>
  <div class="VisualRightPanel h-full">
    <el-tabs v-model="activeTab" stretch>
      <el-tab-pane label="基本属性" lazy name="BasicAttribute">
        <template #label>
          <Icon icon="line-md:cog-filled-loop" />
          <span class="ml-1">基本属性</span>
        </template>
        <el-scrollbar height="100%">
          <div class="overflow-hidden p-2">
            <el-empty description="当前未选中组件" />
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="组件属性" lazy name="ComponentAttribute">
        <template #label>
          <Icon icon="ep:set-up" />
          <span class="ml-1">组件属性</span>
        </template>
        <el-scrollbar height="100%">
          <div class="overflow-hidden p-2">
            <el-empty description="当前未选中组件" />
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="动作" lazy name="ComponentData">
        <template #label>
          <Icon icon="line-md:telegram" />
          <span class="ml-1">动作</span>
        </template>
        <el-scrollbar height="100%">
          <div class="overflow-hidden p-2">
            <el-empty description="当前未选中组件" />
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const activeTab = ref<string>('BasicAttribute')
</script>

<style scoped lang="scss">
.VisualRightPanel {
  :deep(.el-tabs__header) {
    padding: 0 0.5rem;
  }
}
</style>
