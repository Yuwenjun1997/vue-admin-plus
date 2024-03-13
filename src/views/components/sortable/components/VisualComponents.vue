<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item v-for="item in visualBoxComponents" :key="item.type" :name="item.type">
      <template #title>
        <span class="p-2">{{ item.title }}</span>
      </template>
      <div ref="visualGridItem" class="visualGridItem grid grid-cols-2 gap-2 p-2">
        <div
          v-for="component in item.components"
          :key="component.visualBoxKey"
          class="visual-item"
          :data-visual-box-key="component.visualBoxKey"
        >
          <Icon v-if="component.visualBoxIcon" :icon="component.visualBoxIcon" />
          <span class="ml-2">{{ component.visualBoxName }}</span>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Sortable from 'sortablejs'
import { visualBoxComponents } from '@/data/visual.data'
import { useVisualBoxStore } from '@/store/modules/visual-box'

const visualBoxStore = useVisualBoxStore()

const activeNames = ref<string[]>(['1'])

const visualGridItem = ref<HTMLElement[]>([])

onMounted(() => {
  if (!visualGridItem.value) return
  visualGridItem.value.forEach((item) => {
    new Sortable(item, {
      group: {
        name: 'shared',
        pull: 'clone',
        put: false,
      },
      animation: 100,
      fallbackOnBody: true,
      onEnd: (evt: Sortable.SortableEvent) => {
        const visualboxkey = evt.item.dataset.visualBoxKey || ''
        const toKey = evt.to.dataset.visualBoxKey || ''
        const toIndex = evt.newIndex || 0
        const fromKey = evt.from.dataset.visualBoxKey || ''
        if (fromKey !== toKey) {
          nextTick(() => evt.item.remove())
        }
        visualBoxStore.addVisualBox(visualboxkey, toKey, toIndex)
      },
    })
  })
})
</script>

<style scoped>
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
