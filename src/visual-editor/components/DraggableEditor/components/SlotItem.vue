<template>
  <DraggableGroup
    v-model="slotChildren"
    :class="{ 'visual-group__dropzone': !slotChildren?.length }"
    data-slot="拖拽组件到此处"
    :end-handler="props.endHandler"
    :start-handler="props.startHandler"
  >
    <template #item="{ element: innerElement }">
      <div
        class="visual-block"
        :class="{ 'is-active': isActive(innerElement), 'has-slots': hasSlots(innerElement) }"
        @click.stop="props.selectHandler(innerElement)"
      >
        <ComponentRender :element="innerElement" :style="{ pointerEvents: hasSlots(innerElement) ? 'auto' : 'none' }">
          <template v-for="(value, key) in innerElement.slots" :key="key" #[key]>
            <SlotItem
              v-model:children="value.children"
              :end-handler="props.endHandler"
              :select-handler="props.selectHandler"
              :start-handler="props.startHandler"
            />
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
import { useVisualUtils } from '@/visual-editor/hooks/useVisualUtils'

defineOptions({
  name: 'SlotItem',
})

interface Props {
  children: Array<VisualEditorBlockData>
  selectHandler: (block: VisualEditorBlockData) => void
  startHandler: () => void
  endHandler: () => void
}

const { isActive, hasSlots } = useVisualUtils()

const props = withDefaults(defineProps<Props>(), {
  children: () => [],
})
const emit = defineEmits<{
  (e: 'update:children', value: Array<VisualEditorBlockData>): void
}>()

const slotChildren = useVModel(props, 'children', emit)
</script>

<style lang="scss" scoped></style>
