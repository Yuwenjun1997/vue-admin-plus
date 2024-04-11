<template>
  <draggable
    v-model="moduleList"
    class="draggable-group visual-draggable-group"
    :class="{ 'is-drag': isDrag }"
    v-bind="{ ...sortableOptions }"
    :group="props.group"
    :item-key="props.itemKey"
    @end="isDrag = false"
    @start="isDrag = true"
  >
    <template #item="item">
      <div class="draggable-group__drag">
        <slot name="item" v-bind="item" />
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import draggable from 'vuedraggable'
import { Options } from 'sortablejs'
import type { VisualEditorBlockData } from '@/visual-editor/types'

interface Props {
  modelValue: Array<VisualEditorBlockData>
  itemKey?: string
  group?: object
}

const props = withDefaults(defineProps<Props>(), {
  moduleValue: () => [],
  itemKey: '_vid',
  group: () => ({ name: 'component' }),
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Array<any>): void
}>()

const isDrag = ref<boolean>(false)

const moduleList = useVModel(props, 'modelValue', emit)

const sortableOptions = computed<Options>(() => ({
  draggable: '.draggable-group__drag',
  animation: 150,
}))
</script>

<style lang="scss" scoped>
.draggable-group {
  position: relative;
  height: 100%;
  min-height: 40px;
}

.draggable-group__drag {
  cursor: move;
  position: relative;
  z-index: 10;
}

.sortable-drag {
  opacity: 0;
}
</style>
