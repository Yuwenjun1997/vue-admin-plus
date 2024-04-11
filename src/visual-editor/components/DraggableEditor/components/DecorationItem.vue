<template>
  <DraggableGroup
    v-model="slotChildren"
    :class="{ 'draggable-group__dropzone': !slotChildren?.length }"
    data-slot="拖拽组件到此处"
  >
    <template #item="{ element: innerElement }">
      <div
        class="draggable-group__item inner"
        :class="{ 'is-active': innerElement.isActive }"
        @mousedown.stop="props.selectHandler(innerElement)"
      >
        <ComponentRender :element="innerElement">
          <template v-for="(value, key) in innerElement.props?.decorates" :key="key" #[key]>
            <DecorationItem v-model:children="value.children" :select-handler="props.selectHandler" :slot-key="key" />
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
  name: 'DecorationItem',
})

interface Props {
  children: Array<VisualEditorBlockData>
  slotKey?: number | string
  drag?: boolean
  selectHandler: (block: VisualEditorBlockData) => void
}

const props = withDefaults(defineProps<Props>(), {
  children: () => [],
  slotKey: '',
})
const emit = defineEmits<{
  (e: 'update:children', value: Array<VisualEditorBlockData>): void
}>()

const slotChildren = useVModel(props, 'children', emit)
</script>

<style lang="scss" scoped>
.draggable-group__item {
  position: relative;
  padding: 2px;

  &.is-active {
    outline: 2px solid var(--el-color-primary);
    outline-offset: -2px;
  }
}

.draggable-group__dropzone {
  &::after {
    position: absolute;
    inset: 0;
    display: flex;
    height: auto;
    min-height: 36px;
    font-size: 12px;
    text-align: center;
    content: attr(data-slot);
    outline: 1px dashed var(--el-color-info-light-7);
    outline-offset: -1px;
    flex-direction: column;
    justify-content: center;
    color: var(--el-text-color-placeholder);
    background: var(--el-color-info-light-9);
  }
}
</style>
