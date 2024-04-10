<template>
  <DraggableGroup v-model="blocks">
    <template #item="{ element: outElement }">
      <div
        class="draggable-group__item"
        :class="{
          'is-active': outElement.isActive,
          'is-drag': isDrag,
          'has-slot': !!Object.keys(outElement.props.slots || {}).length,
        }"
        :data-label="outElement.label"
      >
        <ComponentRender
          :key="outElement._vid"
          :element="outElement"
          :style="{
            pointerEvents: pointerEvents(outElement),
          }"
        >
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
import { VisualEditorBlockData } from '@/visual-editor/types'
import button from '@/visual-editor/packages/basic/button'
import layout from '@/visual-editor/packages/container/layout'

const layoutCom = createNewBlock(layout)

layoutCom.isActive = true

const blocks = ref<VisualEditorBlockData[]>([createNewBlock(button), layoutCom])

const isDrag = ref<boolean>(false)

const pointerEvents = (element: VisualEditorBlockData) => {
  return Object.keys(element.props?.slots || {}).length ? 'auto' : 'none'
}

console.log(blocks)

watchEffect(() => {
  console.log(blocks.value)
})
</script>

<style scoped lang="scss">
@import './func.scss';

.draggable-group__item {
  position: relative;
  padding: 3px;
  cursor: move;

  > div {
    position: relative;
  }

  &.is-active {
    @include showComponentBorder;
  }

  &.is-drag::after {
    display: none;
  }

  &:not(.has-slot) {
    content: '';
  }
}
</style>
