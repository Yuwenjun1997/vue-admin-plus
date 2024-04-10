<template>
  <draggable
    v-model="moduleList"
    class="draggabel-group"
    v-bind="{ ...sortableOptions }"
    :group="props.group"
    :item-key="props.itemKey"
  >
    <template #item="item">
      <div class="draggabel-group__drag">
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

const moduleList = useVModel(props, 'modelValue', emit)

const sortableOptions = computed<Options>(() => ({}))
</script>

<style lang="scss" scoped>
@import '../func.scss';

.draggabel-group {
  height: 100%;
  min-height: 40px;

  &__drag {
    cursor: move;
  }

  &.isDrag:not(.no-child) :deep(.draggabel-group__item.has-slot) {
    @include showContainerBorder;
  }
}
</style>
