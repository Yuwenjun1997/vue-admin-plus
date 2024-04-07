<template>
  <el-collapse v-model="activeNames" class="VisualComponents">
    <el-collapse-item
      v-for="item in visualComponentGroups"
      :key="item.group"
      :name="item.group"
      :title="item.groupName"
    >
      <SortableBox class="grid grid-cols-2 gap-2" :options="options" @on-end="onEnd">
        <div
          v-for="component in item.components"
          :key="component.key"
          class="visual-item"
          :data-visual-box-key="component.key"
        >
          <Icon v-if="component.icon" :icon="component.icon" />
          <span class="ml-2">{{ component.title }}</span>
        </div>
      </SortableBox>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Sortable from 'sortablejs'
import { visualComponentGroups } from '@/data/visual.data'
import { useVisualBoxStore } from '@/store/modules/visual-box'

const visualBoxStore = useVisualBoxStore()
const activeNames = ref<string[]>(['1'])

const options: Sortable.Options = {
  group: { name: 'visualGroup', pull: 'clone', put: false },
  sort: false,
}

const onEnd = (evt: Sortable.SortableEvent) => {
  visualBoxStore.start()
  const visualboxkey = evt.item.dataset.visualBoxKey || ''
  const toKey = evt.to.dataset.visualBoxKey || ''
  const toIndex = evt.newIndex || 0
  const fromKey = evt.from.dataset.visualBoxKey || ''
  if (fromKey !== toKey) {
    nextTick(() => evt.item.remove())
  }
  visualBoxStore.addVisualBox(visualboxkey, toKey, toIndex)
  visualBoxStore.done()
}
</script>

<style scoped lang="scss">
:deep(.el-collapse-item__content) {
  padding-bottom: 8px;
}

.visual-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: var(--el-border-radius-base);
  border: 1px solid var(--el-border-color-light);
  cursor: pointer;
}
</style>
