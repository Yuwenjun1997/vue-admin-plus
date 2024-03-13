<template>
  <el-tabs :key="activeVisualBox?.visualBoxKey" v-model="activeTab" stretch>
    <el-tab-pane label="组件属性" name="ComponentStyle">
      <template #label>
        <Icon icon="line-md:cog-filled-loop" />
        <span class="ml-1">组件属性</span>
      </template>
      <el-scrollbar height="100%">
        <div class="overflow-hidden p-2">
          <template v-if="!activeVisualBox">
            <el-empty description="当前未选中组件" />
          </template>
          <template v-else-if="!activeVisualBox.renderOptions || activeVisualBox.renderOptions.length === 0">
            <el-empty description="暂无配置信息" />
          </template>
          <template v-else>
            <div v-for="(item, index) in activeVisualBox.renderOptions" :key="index">
              <el-divider>{{ item.groupName }}</el-divider>
              <VisualControlsRender :options="item.options" @change="updateVisualBoxOption" />
            </div>
          </template>
        </div>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="组件内容" name="ComponentData">
      <template #label>
        <Icon icon="line-md:telegram" />
        <span class="ml-1">组件内容</span>
      </template>
      <el-scrollbar height="100%">
        <div class="overflow-hidden p-2">
          <template v-if="!activeVisualBox">
            <el-empty description="当前未选中组件" />
          </template>
          <template v-else-if="!activeVisualBox.renderPropsOptions || activeVisualBox.renderPropsOptions.length === 0">
            <el-empty description="暂无配置信息" />
          </template>
          <template v-else>
            <div v-for="(item, index) in activeVisualBox.renderPropsOptions" :key="index">
              <el-divider>{{ item.groupName }}</el-divider>
              <VisualControlsRender :options="item.options" @change="updateVisualBoxProps" />
            </div>
          </template>
        </div>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { storeToRefs } from 'pinia'

const activeTab = ref<string>('ComponentStyle')

const visualBoxStore = useVisualBoxStore()
const { updateVisualBoxProps, updateVisualBoxOption } = visualBoxStore
const { activeVisualBox } = storeToRefs(visualBoxStore)
</script>

<style scoped></style>
