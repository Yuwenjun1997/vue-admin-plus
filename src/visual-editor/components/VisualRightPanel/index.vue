<template>
  <div class="VisualRightPanel h-full">
    <el-tabs v-model="activeTab" stretch>
      <el-tab-pane label="属性" lazy name="BasicAttribute">
        <template #label>
          <Icon icon="line-md:cog-filled-loop" />
          <span class="ml-1">属性</span>
        </template>
        <el-scrollbar height="100%">
          <div v-if="!visualEditor" class="overflow-hidden p-2">
            <el-empty description="当前未选中组件" />
          </div>
          <AttrEditor v-else :options="visualEditor.props" @on-change="handleAttrChange" />
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="动画" lazy name="ComponentAttribute">
        <template #label>
          <Icon icon="ep:set-up" />
          <span class="ml-1">动画</span>
        </template>
        <el-scrollbar height="100%">
          <div class="overflow-hidden p-2">
            <el-empty description="当前未选中组件" />
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="事件" lazy name="ComponentData">
        <template #label>
          <Icon icon="line-md:telegram" />
          <span class="ml-1">事件</span>
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
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'
import AttrEditor from './AttrEditor/index.vue'

const activeTab = ref<string>('BasicAttribute')

const visualBoxStore = useVisualBoxStore()
const { visualEditor } = storeToRefs(visualBoxStore)

const handleAttrChange = () => {
  console.log(123)
  visualBoxStore.applyVisualEditor()
}

watchEffect(() => {
  // console.log(visualEditor.value)
})
</script>

<style scoped lang="scss">
.VisualRightPanel {
  :deep(.el-tabs__header) {
    padding: 0 0.5rem;
  }
}
</style>
