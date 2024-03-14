<template>
  <div class="VisualLeftPanel px-2">
    <el-tabs v-model="activeTab" stretch>
      <el-tab-pane name="Components">
        <template #label>
          <Icon icon="bi:boxes" />
          <span class="ml-1">组件</span>
        </template>
        <el-scrollbar height="100%">
          <div class="overflow-hidden">
            <VisualComponents />
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="模板" name="Templates">
        <template #label>
          <Icon icon="line-md:coffee-half-empty-twotone-loop" />
          <span class="ml-1">模板</span>
        </template>
        <el-scrollbar height="100%">
          <div class="overflow-hidden">模板</div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import VisualComponents from './VisualComponents.vue'
const activeTab = ref<string>('Components')
</script>

<style scoped></style>
