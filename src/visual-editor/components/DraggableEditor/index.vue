<template>
  <DraggableGroup v-model:module-value="blocks" class="h-full bg-white">
    <template #item="{ element: outElement }">
      <div class="draggable-group__item" :data-label="outElement.label">
        <ComponentRender :key="outElement._vid" :element="outElement">
          <template v-for="(value, slotKey) in outElement.props?.slots" :key="slotKey" #[slotKey]>
            <SlotItem v-model:children="value.children" :slot-key="slotKey" />
          </template>
        </ComponentRender>
      </div>
    </template>
  </DraggableGroup>
</template>

<script setup lang="ts">
import DraggableGroup from './components/DraggableGroup.vue'
import SlotItem from './components/SlotItem.vue'
import ComponentRender from './components/ComponentRender'
import { createNewBlock } from '@/visual-editor/visual-editor.utils'
import button from '@/visual-editor/packages/base-widgets/button'
import { VisualEditorBlockData } from '@/visual-editor/types'

const blocks = ref<VisualEditorBlockData[]>([createNewBlock(button)])

watchEffect(() => {
  console.log(blocks.value)
})
</script>

<style scoped></style>
