<template>
  <draggable
    v-model="moduleList"
    class="visual-group grid grid-cols-2 gap-2"
    v-bind="{ ...sortableOptions }"
    :clone="cloneHandler"
    :group="props.group"
    :item-key="props.itemKey"
    @end="handleDragEnd"
    @start="isDrag = true"
  >
    <template #item="item">
      <div class="visual-group__drag">
        <slot name="item" v-bind="item" />
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import draggable from 'vuedraggable'
import { Options } from 'sortablejs'
import type { VisualEditorComponent, VisualEditorBlockData } from '@/visual-editor/types'
import { createNewBlock } from '@/visual-editor/visual-editor.utils'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'

interface Props {
  modelValue: Array<VisualEditorComponent>
  itemKey?: string
  group?: object
}

const { isDrag } = storeToRefs(useVisualBoxStore())
const { setCurrentBlock } = useVisualBoxStore()

const props = withDefaults(defineProps<Props>(), {
  moduleValue: () => [],
  itemKey: '_vid',
  group: () => ({ name: 'component' }),
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Array<any>): void
}>()

let cloneBlock: VisualEditorBlockData | null = null

const cloneHandler = (original: VisualEditorComponent) => {
  cloneBlock = createNewBlock(original)
  return cloneBlock
}

const handleDragEnd = () => {
  isDrag.value = false
  if (cloneBlock) setCurrentBlock(cloneBlock)
  cloneBlock = null
}

const moduleList = useVModel(props, 'modelValue', emit)

const sortableOptions = computed<Options>(() => ({
  draggable: '.visual-group__drag',
  animation: 150,
}))
</script>

<style lang="scss" scoped>
.visual-group {
  position: relative;
  height: 100%;
  min-height: 40px;

  &__drag {
    cursor: move;
    position: relative;
    z-index: 10;
  }
}

.sortable-drag {
  opacity: 0;
}
</style>
