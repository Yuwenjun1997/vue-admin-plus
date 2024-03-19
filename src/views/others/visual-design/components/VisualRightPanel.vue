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
            <template v-if="!activeVisualBox || !isActive">
              <el-empty description="当前未选中组件" />
            </template>
            <template v-else-if="activeVisualBox.renderBasicOptions.length === 0">
              <el-empty description="暂无配置信息" />
            </template>
            <template v-else>
              <div v-for="(item, index) in activeVisualBox.renderBasicOptions" :key="index">
                <el-divider>{{ item.groupName }}</el-divider>
                <VisualControlsRender :key="getKey(index)" :options="item.options" @change="updateVisualBoxOption" />
              </div>
            </template>
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
            <template v-if="!activeVisualBox || !isActive">
              <el-empty description="当前未选中组件" />
            </template>
            <template v-else-if="activeVisualBox.renderCustomOptions.length === 0">
              <el-empty description="暂无配置信息" />
            </template>
            <template v-else>
              <div v-for="(item, index) in activeVisualBox.renderCustomOptions" :key="index">
                <el-divider>{{ item.groupName }}</el-divider>
                <VisualControlsRender :key="getKey(index)" :options="item.options" @change="updateVisualBoxOption" />
              </div>
            </template>
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="组件内容" lazy name="ComponentData">
        <template #label>
          <Icon icon="line-md:telegram" />
          <span class="ml-1">组件内容</span>
        </template>
        <el-scrollbar height="100%">
          <div class="overflow-hidden p-2">
            <template v-if="!activeVisualBox || !isActive">
              <el-empty description="当前未选中组件" />
            </template>
            <template v-else-if="activeVisualBox.renderPropsOptions.length === 0">
              <el-empty description="暂无配置信息" />
            </template>
            <template v-else>
              <div v-for="(item, index) in activeVisualBox.renderPropsOptions" :key="item.groupId">
                <el-divider>{{ item.groupName }}</el-divider>
                <VisualControlsRender :key="getKey(index)" :options="item.options" @change="updateVisualBoxProps" />
              </div>
            </template>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { storeToRefs } from 'pinia'

const activeTab = ref<string>('BasicAttribute')

const visualBoxStore = useVisualBoxStore()
const { updateVisualBoxProps, updateVisualBoxOption, getVisualBoxByKey } = visualBoxStore
const { activeVisualBox } = storeToRefs(visualBoxStore)

const isActive = computed<boolean>(() => {
  if (!activeVisualBox.value) return false
  return !!getVisualBoxByKey(activeVisualBox.value.visualBoxKey)
})

const getKey = (index: number) => {
  return `${activeVisualBox.value?.target.visualBoxKey}_${index}`
}
</script>

<style scoped lang="scss">
.VisualRightPanel {
  :deep(.el-tabs__header) {
    padding: 0 0.5rem;
  }
}
</style>
