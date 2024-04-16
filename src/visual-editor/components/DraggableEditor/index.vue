<template>
  <DraggableGroup v-model="visualBlocks" :end-handler="handleDragEnd" :start-handler="handleDragStart">
    <template #item="{ element: outElement }">
      <div
        class="visual-block"
        :class="{ 'is-active': isActive(outElement), 'has-slots': hasSlots(outElement) }"
        :data-label="outElement.label"
        @click.stop="setCurrentBlock(outElement)"
      >
        <ComponentRender
          :key="outElement._vid"
          :element="outElement"
          :style="{ pointerEvents: hasSlots(outElement) ? 'auto' : 'none' }"
        >
          <template v-for="(value, key) in outElement.slots" :key="key" #[key]>
            <SlotItem
              v-model:children="value.children"
              :end-handler="handleDragEnd"
              :select-handler="setCurrentBlock"
              :start-handler="handleDragStart"
            />
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
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'
import { useVisualUtils } from '@/visual-editor/hooks/useVisualUtils'

const { setCurrentBlock } = useVisualBoxStore()
const { visualBlocks, isDrag } = storeToRefs(useVisualBoxStore())

const { isActive, hasSlots } = useVisualUtils()

const handleDragStart = () => {
  isDrag.value = true
}
const handleDragEnd = () => {
  isDrag.value = false
}
</script>

<style scoped lang="scss"></style>
