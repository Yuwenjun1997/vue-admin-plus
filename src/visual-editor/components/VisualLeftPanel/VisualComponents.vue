<template>
  <el-collapse v-model="activeNames" class="VisualComponents">
    <el-collapse-item name="basicWidgets" title="基础组件">
      <DraggableGroup v-model="basicWidgets" :group="group">
        <template #item="{ element: outElement }">
          <div class="visual-item" :data-label="outElement.label">
            <ComponentRender :key="outElement._vid" :element="outElement" />
          </div>
        </template>
      </DraggableGroup>
    </el-collapse-item>
    <el-collapse-item name="containerWidgets" title="容器组件">
      <DraggableGroup v-model="containerWidgets" :group="group">
        <template #item="{ element: outElement }">
          <div class="visual-item" :data-label="outElement.label">
            <ComponentRender :key="outElement._vid" :element="outElement" />
          </div>
        </template>
      </DraggableGroup>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { visualConfig } from '@/visual-editor/visual.config'
import DraggableGroup from '../DraggableEditor/components/DraggableGroup.vue'
import ComponentRender from './ComponentRender'
import { createNewBlock } from '@/visual-editor/visual-editor.utils'

const activeNames = ref<string[]>(['basicWidgets'])

const basicWidgets = visualConfig.componentModules.basicWidgets.map((item) => createNewBlock(item))
const containerWidgets = visualConfig.componentModules.containerWidgets.map((item) => createNewBlock(item))

const group = { name: 'component', pull: 'clone', put: false }
</script>

<style scoped lang="scss">
:deep(.el-collapse-item__content) {
  padding-bottom: 8px;
}

.visual-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  padding: 6px;
  border: 1px solid var(--el-border-color-light);
  cursor: move;
  pointer-events: none;

  &:hover {
    border-color: var(--el-color-primary);
  }

  &::after {
    content: attr(data-label);
    position: absolute;
    left: 0;
    top: 0;
    padding: 2px 4px;
    background-color: var(--el-color-primary);
    color: #fff;
    font-size: 12px;
  }
}
</style>
