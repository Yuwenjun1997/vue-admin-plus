<template>
  <DraggableGroup v-model="blocks">
    <template #item="{ element: outElement }">
      <div
        class="visual-block"
        :class="{ 'is-active': outElement.isActive }"
        :data-label="outElement.label"
        @mousedown.stop="selectComponent(outElement)"
      >
        <ComponentRender :key="outElement._vid" :element="outElement">
          <template v-for="(value, key) in outElement.props?.decorates" :key="key" #[key]>
            <DecorationItem v-model:children="value.children" :select-handler="selectComponent" :slot-key="key" />
          </template>
        </ComponentRender>
      </div>
    </template>
  </DraggableGroup>
</template>

<script setup lang="ts">
import DraggableGroup from './components/DraggableGroup.vue'
import DecorationItem from './components/DecorationItem.vue'
import ComponentRender from './components/ComponentRender'
import { createNewBlock } from '@/visual-editor/visual-editor.utils'
import { VisualEditorBlockData } from '@/visual-editor/types'
import button from '@/visual-editor/packages/basic/button'
import layout from '@/visual-editor/packages/container/layout'
import { useVisualBoxStore } from '@/visual-editor/store/visual-box'

const { setCurrentBlock } = useVisualBoxStore()

const layoutCom = createNewBlock(layout)

const blocks = ref<VisualEditorBlockData[]>([createNewBlock(button), layoutCom])

const selectComponent = (component: VisualEditorBlockData) => {
  setCurrentBlock(component)
  blocks.value.forEach((block) => {
    block.isActive = block._vid === component._vid
    handleSlotsActive(block, component._vid)
  })
}

const handleSlotsActive = (block: VisualEditorBlockData, _vid: string) => {
  const decorates = block.props?.decorates
  if (!decorates) return
  if (Object.keys(decorates).length <= 0) return
  Object.keys(decorates).forEach((slotKey) => {
    decorates[slotKey]?.children?.forEach((item: VisualEditorBlockData) => {
      item.isActive = item._vid === _vid
      if (item.isActive) {
        console.log(item)
      }
      if (Object.keys(item.props?.decorates || {}).length) {
        handleSlotsActive(item, _vid)
      }
    })
  })
}

watchEffect(() => {
  console.log(blocks.value)
})
</script>

<style scoped lang="scss">
.visual-block {
  position: relative;
  padding: 2px;

  &.is-active {
    outline: 2px solid var(--el-color-primary);
    outline-offset: -2px;
  }
}
</style>
