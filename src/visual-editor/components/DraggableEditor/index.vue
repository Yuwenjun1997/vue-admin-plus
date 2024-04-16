<template>
  <DraggableGroup v-model="visualBlocks" :end-handler="handleDragEnd" :start-handler="handleDragStart">
    <template #item="{ element: outElement }">
      <div
        class="visual-block"
        :class="{ 'is-active': outElement._vid === activeId, 'has-slots': Object.keys(outElement.slots).length }"
        :data-label="outElement.label"
        @click.stop="setCurrentBlock(outElement)"
      >
        <ComponentRender :key="outElement._vid" :element="outElement">
          <template v-for="(value, key) in outElement.slots" :key="key" #[key]>
            <SlotItem
              v-model:children="value.children"
              :active-id="activeId"
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

const { setCurrentBlock } = useVisualBoxStore()
const { visualBlocks, currentBlock, isDrag } = storeToRefs(useVisualBoxStore())

const activeId = computed(() => currentBlock.value?._vid)

const handleDragStart = () => {
  isDrag.value = true
}
const handleDragEnd = () => {
  isDrag.value = false
}

watchEffect(() => {
  console.log(visualBlocks.value)
})
</script>

<style scoped lang="scss"></style>
