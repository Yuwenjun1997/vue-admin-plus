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
          <div v-else :key="currentBlock?._vid" class="px-4 pb-4">
            <el-divider>基础属性</el-divider>
            <AttrEditor :options="visualEditor.props" show-bind :trigger-handler="handleAttrChange" />
            <template v-if="visualEditor.slots">
              <el-divider>插槽配置</el-divider>
              <SlotEditor :options="visualEditor.slots" :trigger-handler="handleAttrChange" />
            </template>
            <template v-if="visualEditor.sourceData">
              <SourceEditor :options="visualEditor.sourceData" :trigger-handler="handleAttrChange" />
            </template>
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="样式" lazy name="ComponentAttribute">
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
      <el-tab-pane label="事件" lazy name="ComponentData">
        <template #label>
          <Icon icon="line-md:telegram" />
          <span class="ml-1">事件</span>
        </template>
        <el-scrollbar height="100%">
          <div v-if="!visualEditor" class="overflow-hidden p-2">
            <el-empty description="当前未选中组件" />
          </div>
          <div v-else class="p-4">
            <EventEditor :vid="currentBlock?._vid" />
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
import EventEditor from './EventEditor/index.vue'
import SourceEditor from './SourceEditor/index.vue'

const activeTab = ref<string>('BasicAttribute')

const visualBoxStore = useVisualBoxStore()
const { visualEditor, cssEditorOptions, currentBlock } = storeToRefs(visualBoxStore)

const handleAttrChange = () => {
  visualBoxStore.applyVisualEditor()
}
</script>

<style scoped lang="scss">
.VisualRightPanel {
  :deep(.el-tabs) {
    height: 100%;
    .el-tabs__header {
      padding: 0 0.5rem;
      margin-bottom: 0;
    }

    .el-tabs__content {
      height: calc(100% - 40px);

      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>
