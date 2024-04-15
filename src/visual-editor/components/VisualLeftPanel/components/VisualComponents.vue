<template>
  <DraggableGroup v-model="widgets" :group="group">
    <template #item="{ element: outElement }">
      <div class="visual-item" :data-label="outElement.label">
        <ComponentRender :key="outElement._vid" :element="outElement" style="pointer-events: none" />
      </div>
    </template>
  </DraggableGroup>
</template>

<script setup lang="ts">
import { VisualEditorComponent } from '@/visual-editor/types'
import DraggableGroup from './DraggableGroup.vue'
import ComponentRender from './ComponentRender'
import { cloneDeep } from 'lodash'

interface Props {
  data: VisualEditorComponent[]
}

const props = defineProps<Props>()

const group = { name: 'component', pull: 'clone', put: false }

const widgets = ref<VisualEditorComponent[]>([])

const init = (data: VisualEditorComponent[]) => {
  widgets.value = cloneDeep(data)
}

watchEffect(() => {
  init(props.data)
})

defineExpose({
  init,
})
</script>

<style lang="scss" scoped>
.visual-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  padding: 6px 6px 26px;
  border: 2px solid var(--el-border-color-light);
  cursor: move;
  transition: var(--el-transition-all);

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
