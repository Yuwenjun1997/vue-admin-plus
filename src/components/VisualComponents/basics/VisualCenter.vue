<template>
  <SortableBox
    :key="actionUid"
    v-loading="isLoading"
    :class="device"
    data-visual-box-key="root"
    :options="defualtSortableOpts"
    @on-end="onEnd"
  >
    <VisualBoxRender v-for="template in visualBoxTemplates" :key="template.key" :template="template" />
  </SortableBox>
</template>

<script setup lang="ts">
import { useVisualBoxStore } from '@/store/modules/visual-box'
import { storeToRefs } from 'pinia'
import Sortable from 'sortablejs'

const visualBoxStore = useVisualBoxStore()
const { visualBoxTemplates, device, isLoading, actionUid } = storeToRefs(visualBoxStore)

const defualtSortableOpts = {
  draggable: '.visual-box',
  chosenClass: 'visual-box-chosen',
  ghostClass: 'visual-box-ghost',
  dragClass: 'visual-box-drag',
  filter: '.visual-box-disabled',
}

const onEnd = (evt: Sortable.SortableEvent) => {
  visualBoxStore.start()
  const currentKey = evt.item.dataset.visualBoxKey || ''
  const fromKey = evt.from.dataset.visualBoxKey || ''
  const toKey = evt.to.dataset.visualBoxKey || ''
  const { oldIndex = 0, newIndex = 0 } = evt
  if (fromKey !== toKey) {
    nextTick(() => evt.item.remove())
  }
  visualBoxStore.moveVisualBox(currentKey, fromKey, toKey, oldIndex, newIndex)
  visualBoxStore.done()
}
</script>
