<template>
  <DraggableGroup
    v-model="slotChildren"
    class="draggable-group__inner"
    :class="{ slot: !slotChildren?.length }"
    :data-slot="`插槽（${slotKey}）\n 拖拽组件到此处`"
  >
    <template #item="{ element: innerElement }">
      <div class="draggable-group__item inner">
        <ComponentRender
          :class="{
            'is-active': innerElement.isActive,
          }"
          :element="innerElement"
          :style="{
            pointerEvents: pointerEvents(innerElement),
          }"
        >
          <template v-for="(value, key) in innerElement.props?.slots" :key="key" #[key]>
            <SlotItem v-model:children="value.children" />
          </template>
        </ComponentRender>
      </div>
    </template>
  </DraggableGroup>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import DraggableGroup from './DraggableGroup.vue'
import ComponentRender from './ComponentRender'
import type { VisualEditorBlockData } from '@/visual-editor/types'

defineOptions({
  name: 'SlotItem',
})

interface Props {
  children: Array<VisualEditorBlockData>
  slotKey?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  children: () => [],
  slotKey: '',
})
const emit = defineEmits(['update:children'])

const slotChildren = useVModel(props, 'children', emit)

const pointerEvents = (element: VisualEditorBlockData) => {
  return Object.keys(element.props?.slots || {}).length ? 'auto' : 'none'
}
</script>

<style lang="scss" scoped>
.draggable-group__inner {
  position: relative;

  &.slot::after {
    position: absolute;
    inset: 0;
    display: flex;
    height: auto;
    min-height: 40px;
    font-size: 12px;
    color: #8591a2;
    text-align: center;
    background: rgba(246, 247, 249, 0.5);
    content: attr(data-slot);
    outline: 1px dashed #dedede;
    outline-offset: -1px;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
