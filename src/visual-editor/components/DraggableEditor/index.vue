<template>
  <DraggableGroup v-if="currentPage" v-model="currentPage.blocks" :end-handler="dragEnd" :start-handler="dragStart">
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
              :end-handler="dragEnd"
              :select-handler="setCurrentBlock"
              :start-handler="dragStart"
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
const { currentPage } = storeToRefs(useVisualBoxStore())

const { isActive, hasSlots, dragStart, dragEnd } = useVisualUtils()
</script>

<style scoped lang="scss"></style>
