<template>
  <draggable v-model="moduleList" class="draggabel-group" v-bind="{ ...sortableOptions }">
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
  moduleValue: Array<VisualEditorBlockData>
}

const props = withDefaults(defineProps<Props>(), {
  moduleValue: () => [],
})

const emit = defineEmits<{
  (e: 'update:moduleValue', value: Array<any>): void
}>()

const moduleList = useVModel(props, 'moduleValue', emit)

const sortableOptions = computed<Options>(() => ({
  animation: 300,
}))
</script>
