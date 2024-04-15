<template>
  <draggable
    v-model="moduleList"
    class="visual-group grid grid-cols-2 gap-2"
    v-bind="{ ...sortableOptions }"
    :clone="props.clone"
    :group="props.group"
    :item-key="props.itemKey"
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

interface Props {
  modelValue: Array<VisualEditorComponent>
  itemKey?: string
  group?: object
  clone?: (original: VisualEditorComponent) => VisualEditorBlockData
}

const props = withDefaults(defineProps<Props>(), {
  moduleValue: () => [],
  itemKey: '_vid',
  group: () => ({ name: 'component' }),
  clone: (original: VisualEditorComponent) => createNewBlock(original),
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Array<any>): void
  (e: 'drag-end', value: VisualEditorBlockData): void
  (e: 'drag-start', value: Array<any>): void
}>()

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
