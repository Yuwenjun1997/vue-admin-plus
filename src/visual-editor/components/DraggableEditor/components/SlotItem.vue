<template>
  <DraggableGroup v-model="slotChildren" class="draggable-group__inner">
    <template #item="{ element: innerElement }">
      <div class="draggable-group__item inner">
        <ComponentRender :element="innerElement">
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
}

const props = withDefaults(defineProps<Props>(), {
  children: () => [],
})
const emit = defineEmits(['update:children'])

const slotChildren = useVModel(props, 'children', emit)
</script>
