<template>
  <DraggableGroup v-model="widgets" :group="group">
    <template #item="{ element: outElement }">
      <div class="visual-item" :data-label="outElement.label">
        <div class="visual-item__content">
          <ComponentRender :key="outElement._vid" :element="outElement" style="pointer-events: none" />
        </div>
      </div>
    </template>
  </DraggableGroup>
</template>

<script setup lang="ts">
import { VisualEditorComponent } from '@/visual-editor/types'
import DraggableGroup from './DraggableGroup.vue'
import ComponentRender from './ComponentRender'

interface Props {
  data: VisualEditorComponent[]
}

const props = defineProps<Props>()

const group = { name: 'component', pull: 'clone', put: false }

const widgets = ref<VisualEditorComponent[]>([])

const init = (data: VisualEditorComponent[]) => {
  widgets.value = data
}

onMounted(() => {
  init(props.data)
})
</script>

<style lang="scss" scoped>
.visual-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  padding: 4px 4px 24px;
  border: 2px solid var(--el-color-info-light-9);
  cursor: move;
  transition: var(--el-transition-all);
  background-color: var(--el-fill-color-lighter);
  overflow: hidden;

  .visual-item__content {
    width: 261px;
    position: absolute;
    transform: scale(0.42);
    transform-origin: center;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    border-color: var(--el-color-primary);
  }

  &::after {
    content: attr(data-label);
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    line-height: 20px;
    background-color: var(--el-border-color-light);
    color: var(--el-text-color-regular);
    font-size: 10px;
  }
}
</style>
