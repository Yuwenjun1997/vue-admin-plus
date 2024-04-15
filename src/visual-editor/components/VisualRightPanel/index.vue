<template>
  <div class="VisualRightPanel h-full">
    <el-tabs v-model="activeTab" stretch>
      <el-tab-pane label="属性" name="BasicAttribute">
        <template #label>
          <Icon icon="line-md:cog-filled-loop" />
          <span class="ml-1">属性</span>
        </template>
        <el-scrollbar height="100%">
          <div v-if="!visualEditor" class="overflow-hidden p-2">
            <el-empty description="当前未选中组件" />
          </div>
          <div v-else :key="currentBlock?._vid" class="p-4">
            <AttrEditor :options="visualEditor.props" :trigger-handler="handleAttrChange" />
            <template v-if="visualEditor.slots && visualEditor.slots.length">
              <el-divider>插槽配置</el-divider>
              <SlotEditor
                :options="visualEditor.slots"
                :trigger-handler="handleAttrChange"
                @add-slot="handleAddSlot"
                @delete-slot="handleDeleteSlot"
              />
            </template>
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="样式" name="ComponentAttribute">
        <template #label>
          <Icon icon="ep:set-up" />
          <span class="ml-1">样式</span>
        </template>
        <el-scrollbar height="100%">
          <div v-if="!visualEditor" class="overflow-hidden p-2">
            <el-empty description="当前未选中组件" />
          </div>
          <div v-else class="p-4">
            <StyleEditor :options="cssEditorOptions" :trigger-handler="handleAttrChange" :vid="currentBlock?._vid" />
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="事件" name="ComponentData">
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
import SlotEditor from './SlotEditor/index.vue'
import StyleEditor from './StyleEditor/index.vue'

const activeTab = ref<string>('BasicAttribute')

const visualBoxStore = useVisualBoxStore()
const { visualEditor, cssEditorOptions, currentBlock } = storeToRefs(visualBoxStore)

const handleAttrChange = () => {
  visualBoxStore.applyVisualEditor()
}

const handleAddSlot = () => {
  visualEditor.value?.addSlot && visualEditor.value?.addSlot()
  visualBoxStore.applyVisualEditor()
}
const handleDeleteSlot = (index: number) => {
  visualEditor.value?.deleteSlot && visualEditor.value?.deleteSlot(index)
  visualBoxStore.applyVisualEditor()
}
</script>

<style scoped lang="scss">
.VisualRightPanel {
  :deep(.el-tabs__header) {
    padding: 0 0.5rem;
  }
}
</style>
