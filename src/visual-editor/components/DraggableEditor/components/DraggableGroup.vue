<template>
  <draggable
    v-model="moduleList"
    class="visual-group"
    v-bind="{ ...sortableOptions }"
    :group="props.group"
    :item-key="props.itemKey"
    @end="props.endHandler"
    @start="props.startHandler"
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
import { Options, SortableEvent } from 'sortablejs'
import type { VisualEditorBlockData } from '@/visual-editor/types'

interface Props {
  modelValue: Array<VisualEditorBlockData>
  itemKey?: string
  group?: object
  drag?: boolean
  startHandler?: (e: SortableEvent) => void
  endHandler?: (e: SortableEvent) => void
}

const props = withDefaults(defineProps<Props>(), {
  itemKey: '_vid',
  moduleValue: () => [],
  group: () => ({ name: 'component' }),
  startHandler: () => {},
  endHandler: () => {},
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Array<any>): void
}>()

const moduleList = useVModel(props, 'modelValue', emit)

const sortableOptions = computed<Options>(() => ({
  draggable: '.visual-group__drag',
  animation: 150,
}))
</script>

<style lang="scss" scoped>
.sortable-drag {
  opacity: 0;
}
</style>
